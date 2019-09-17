/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* init *//* global internal_locale, internal_zone, format_arrays */
/* timezones/generateTimeZoneFormatObject *//* global generateTimeZoneFormatObject */
/* to_functions *//* global toDate */
/* modify/Date *//* global getWeekNumber, getWeekDay */
/* utility *//* global getOrdinalSuffix, double */
/**
 * It is in fact argument for `options` in [`Date.prototype.toLocaleString` Parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString#Parameters).
 * @typedef {Object} toLocaleStringOptions
 * @memberof $time.types
 * @property {String} [locale=internal_locale] In which language/national format generate final string
 * @property {String} [timeZone=internal_zone] Time zone name from [`ary_ianna_time_zones`](#props_ary_ianna_time_zones).
 * @property {Boolean} [declension=true] Needed for some languages — for example in Czech: "10. července" (`declension=true`), or "10. červenec" (`declension=false`)
 */
/**
 * Function generates text based on `format`, `locale` and `timeZone` from `DateArray`.
 * @method toStringFromObject
 * @memberof $time
 * @private
 * @param {$time.types.ArrayOfOperation[]} format
 * @param {$time.types.toLocaleStringOptions} params_obj
 * @returns {$time.types.function_DateArray2String}
 * @example
 * $time.toStringFromObject([ ["day", "2-digit"], [ "text", "/" ], ["month", "2-digit"], [ "text", "/" ], ["year", "numeric"] ],{ locale: "en-GB" })($time.fromNow());//= "05/06/2019"
 */
function toStringFromObject(format= format_arrays.SQL, { locale= internal_locale, declension= true, timeZone= internal_zone }= {}){
    return date_array=> format.map(evaluateFormatObject(toDate(date_array), locale, timeZone, declension)).join("");
}
function evaluateFormatObject(date, locale, timeZone, declension){
    const localeObj= generateTimeZoneFormatObject.bind(null, timeZone);
    return function([type, value, modify]){
        let out= evaluateNthFromObject(date, type, value, modify, declension, locale, timeZone, localeObj);
        if(value==="2-digit"&&String(out).length===1) out= "0"+out; //fix
        if(modify==="two_letters") out= out.substr(0,2);
        else if(modify==="ordinal_number"&&locale.indexOf("en")!==-1) out= getOrdinalSuffix(out);
        return out;
    };
}
function evaluateNthFromObject(date, type, value, modify, declension, locale, timeZone, localeObj){
    switch (true){
        case type==="text":                                     return value;
        case type==="week":                                     return getWeekNumber(!timeZone ? date: new Date(( (l, timeZone, two)=> l({ timeZone, year: "numeric" })+"-"+double(l({ timeZone, month: two }))+"-"+double(l({ timeZone, day: two }))+"T"+double(l({ timeZone, hour: two }))+":"+double(l({ timeZone, minute: two }))+":"+double(l({ timeZone, second: two })) )( Date.prototype.toLocaleString.bind(date, "en-GB"), timeZone, "2-digit" )));
        case type==="weekday"&&value==="numeric":               return getWeekDay()(date);
        case type==="month"&&value==="long"&&declension:        return date.toLocaleString(locale,localeObj({ [type]: value, day: "numeric" })).replace(/[\d \.\/\\]/g, "");
        case type==="hour"&&modify.toLowerCase()==="a":         return date.toLocaleString(modify==="A" ? "en-US" : "en-GB",localeObj({ [type]: value, hourCycle: "h12" })).replace(/[\d \.\/\\]/g, "");
        case type==="hour":                                     return date.toLocaleString(locale,localeObj({ [type]: value, hourCycle: modify })).replace(/[ \.\/\\pam]/ig, "");
        default:                                                return date.toLocaleString(locale,localeObj({ [type]: value }));
    }
}
/**
 * This holds information about how show one piece of String output typically for {@link $time.toString}.
 * 
 * Predefined values can be found at {@link $time.format_arrays}.
 * @typedef {Array} ArrayOfOperation
 * @memberof $time.types
 * @property {String} operation In fact names of keys in [`Date.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) (i. e. "weekday", "month") or "text".
 * @property {String} argument In fact value of given key in [`Date.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) (i. e. "2-digit", "numeric").
 * @property {String} params Some additional information/modifications like "two_letters", "ordinal_number", ….
 */

/**
 * Generates multidimensional array for formatting (eg. "YYYY"=> `[ [ "year", "numeric" ] ]`).
 * @method getFormatObject
 * @memberof $time
 * @private
 * @param {String} format_string supports:
 * <br/>- "YYYY", "YY",
 * <br/>- "MM", "MMM", "MMMM",
 * <br/>- "dddd" (weekday - Monday), "ddd" (shorter weekday - Mon), "dd" (Mo), "d" (0===Sun <> 6===Sat),
 * <br/>- "DD", "D", "Do",
 * <br/>- "HH", "H",
 * <br/>- "mm", "m",
 * <br/>- "SS", "S",
 * <br/>- "W", "Wo"
 * @returns {$time.types.ArrayOfOperation[]}
 */
function getFormatObject(format_string= ""){
    let out= [], out_last_index, letter;
    while(format_string.length){
        switch(format_string[0]){
            case "M": handleM();                            break;
            case "d": handled();                            break;
            case "W": handleWD("week", "W");                break;
            case "Y": handleY();                            break;
            case "D": handleWD("day", "D");                 break;
            case "H": handleHh("hour", "H", "h23");         break;
            case "k": handleHh("hour", "k", "h24");         break;
            case "h": handleHh("hour", "h", "h12");         break;
            case "A": handleAa("A");                        break;
            case "a": handleAa("a");                        break;
            case "m": handle("minute", "m");                break;
            case "s": handle("second", "s");                break;
            case "[": handleText();                         break;
            default:
                letter= format_string[0];
                out_last_index= out.length-1;
                if(out_last_index>-1&&out[out_last_index][0]==="text") out[out_last_index][1]+= letter;
                else out.push(["text", letter]);
                format_string= format_string.substring(1);
        }
    }
    function handleM(){
        let type= "numeric";
        if(!format_string.search(/MMMM/)){
            type= "long";
            format_string= format_string.substring(4);
        } else if(!format_string.search(/MMM/)){
            type= "short";
            format_string= format_string.substring(3);
        } else if(!format_string.search(/MM/)){
            type= "2-digit";
            format_string= format_string.substring(2);
        } else if(!format_string.search(/Mo/)){
            format_string= format_string.substring(2);
            return out.push(["month", type, "ordinal_number"]);
        } else {
            format_string= format_string.substring(1);
        }
        out.push(["month", type]);
    }
    function handled(){
        let type= "numeric";
        if(!format_string.search(/dddd/)){
            type= "long";
            format_string= format_string.substring(4);
        } else if(!format_string.search(/ddd/)){
            type= "short";
            format_string= format_string.substring(3);
        } else if(!format_string.search(/dd/)){
            type= "short";
            format_string= format_string.substring(2);
            return out.push(["weekday", type, "two_letters"]);
        } else {
            format_string= format_string.substring(1);
        }
        out.push(["weekday", type]);
    }
    function handleY(){
        let type= "2-digit";
        if(!format_string.search(/YYYY/)){
            type= "numeric";
            format_string= format_string.substring(4);
        } else {
            format_string= format_string.substring(2);
        }
        out.push(["year", type]);
    }
    function handleWD(out_key, letter){
        let type= "numeric";
        if(!format_string.search(new RegExp(letter+"o"))){
            format_string= format_string.substring(2);
            return out.push([out_key, type, "ordinal_number"]);
        } else if(!format_string.search(new RegExp(letter+letter))){
            type= "2-digit";
            format_string= format_string.substring(2);
        } else {
            format_string= format_string.substring(1);
        }
        out.push([out_key, type]);
    }
    function handleHh(out_key, letter, hourCycle){
        let type= "numeric";
        if(!format_string.search(new RegExp(letter+letter))){
            type= "2-digit";
            format_string= format_string.substring(2);
        } else {
            format_string= format_string.substring(1);
        }
        out.push([out_key, type, hourCycle]);
    }
    function handleAa(modify){
        format_string= format_string.substring(1);
        out.push(["hour", "numeric", modify]);
    }
    function handle(out_key, letter){
        let type= "numeric";
        if(!format_string.search(new RegExp(letter+letter))){
            type= "2-digit";
            format_string= format_string.substring(2);
        } else {
            format_string= format_string.substring(1);
        }
        out.push([out_key, type]);
    }
    function handleText(){
        const text_end= format_string.indexOf("]");
        if(text_end===-1){
            format_string= format_string.substring(1);
            return false;
        }
        out.push(["text", format_string.substr(1,text_end-1)]);
        format_string= format_string.substr(text_end+1);
    }
    return out;
}