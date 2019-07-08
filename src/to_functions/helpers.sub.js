/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* init *//* global internal_locale, internal_zone */
/* timezones/generateTimeZoneFormatObject *//* global generateTimeZoneFormatObject */
/* to_functions *//* global toDate */
/* utility *//* global getOrdinalSuffix */
function toStringFromObject(format, { locale= internal_locale, declension= true, timeZone= internal_zone }= {}){
    if(!format) return date_array=> date_array.join("");
    return date_array=> format.map(evaluateFormatObject(toDate(date_array), locale, timeZone, declension)).join("");
}
function evaluateFormatObject(date, locale, timeZone, declension){
    const localeObj= generateTimeZoneFormatObject.bind(null, timeZone);
    return function([type, value, ordinal]){
        let out= type==="text" ? value : type==="month"&&value==="long"&&declension ? date.toLocaleString(locale,localeObj({ [type]: value, day: "numeric" })).replace(/[\d \.\/\\]/g, "") : date.toLocaleString(locale,localeObj({ [type]: value }));
        if(value==="2-digit"&&out.length===1) out= "0"+out; //fix
        return ordinal!=="ordinal_number"||locale.indexOf("en")===-1 ? out : getOrdinalSuffix(out);
    };
}
function getFormatObject(format_string= ""){
    let out= [];
    while(format_string.length){
        switch(format_string[0]){
            case "M": handleM();                             break;
            case "d": handled();                             break;
            case "Y": handleY();                             break;
            case "D": handleD();                             break;
            case "H": handle("hour", "H");         break;
            case "m": handle("minute", "m");     break;
            case "S": handle("second", "S");     break;
            case "[": handleText();                        break;
            default:
                let letter= format_string[0];if(out[out.length-1][0]==="text") out[out.length-1][1]+= letter;
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
        } else {
            format_string= format_string.substring(1);
        }
        out.push(["month", type]);
    }
    function handled(){
        let type= "narrow";
        if(!format_string.search(/dddd/)){
            type= "long";
            format_string= format_string.substring(4);
        } else if(!format_string.search(/ddd/)){
            type= "short";
            format_string= format_string.substring(3);
        } else {
            format_string= format_string.substring(format_string.search(/dd/)?1:2);
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
    function handleD(){
        let type= "numeric";
        if(!format_string.search(/Do/)){
            format_string= format_string.substring(2);
            return out.push(["day", type, "ordinal_number"]);
        } else if(!format_string.search(/DD/)){
            type= "2-digit";
            format_string= format_string.substring(2);
        } else {
            format_string= format_string.substring(1);
        }
        out.push(["day", type]);
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