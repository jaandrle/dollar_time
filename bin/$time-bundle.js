/* jshint esversion: 6,-W097, -W040, browser: true, node: true, expr: true, undef: true, maxparams: 8, maxdepth: 3, maxcomplexity: 17, maxparams: 8 */

/* global self */
(function (root, factory) {
    /* jshint ignore:start */
    var depends= [];
    var getDep;
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(depends, factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        getDep= function(name){ return require(name); };
        module.exports = factory.apply(root, depends.map(getDep));
    } else {
        // Browser globals (root is window)
        getDep= function(name){ return root[name]; };
        root.$time = factory.apply(root, depends.map(getDep));
    }
    /* jshint ignore:end */
}(typeof self !== 'undefined' ? self : this, function (/* ..._dependencies */) {
    "use strict";
    var _dependencies= Array.prototype.slice.call(arguments);
    const /* internal store */
        format_objects= (({ time, date, seconds })=>({
            time, date,
            time_seconds: Object.assign(seconds, time),
            date_time: Object.assign({}, time, date),
            date_time_seconds: Object.assign({}, Object.assign(seconds, time), date)
        }))({
            time: { hour: "2-digit", minute: "2-digit" },
            date: { year: "numeric", day: "2-digit", month: "2-digit" },
            seconds: { second: "2-digit" }
        }),
        format_arrays= (({ dash, colon, space, two_dig })=>({
            SQL_DATE: [ ["year", "numeric"], dash, ["month", two_dig], dash, ["day", two_dig] ],
            SQL_TIME: [ ["hour", two_dig, "h23"], colon, ["minute", two_dig], colon, ["second", two_dig] ],
            SQL: [ ["year", "numeric"], dash, ["month", two_dig], dash, ["day", two_dig], space, ["hour", two_dig, "h23"], colon, ["minute", two_dig], colon, ["second", two_dig] ]
        }))({
            dash: [ "text", "-" ],
            colon: [ "text", ":" ],
            space: [ "text", " " ],
            two_dig: "2-digit"
        }),
        ordinal_numbers= [ "th", "st", "nd", "rd" ];
    const /* validation functions */
        isDateString= date_string=> date_string.indexOf("-")!==-1,
        isTimeString= date_string=> date_string.indexOf("T")!==-1;
    let /* internal variables*/
        internal_locale= "en-GB",
        internal_zone= "";
    const ary_ianna_time_zones= Object.freeze([
        'Africa/Abidjan',
        'Africa/Accra',
        'Africa/Algiers',
        'Africa/Bissau',
        'Africa/Cairo',
        'Africa/Casablanca',
        'Africa/Ceuta',
        'Africa/El_Aaiun',
        'Africa/Johannesburg',
        'Africa/Juba',
        'Africa/Khartoum',
        'Africa/Lagos',
        'Africa/Maputo',
        'Africa/Monrovia',
        'Africa/Nairobi',
        'Africa/Ndjamena',
        'Africa/Sao_Tome',
        'Africa/Tripoli',
        'Africa/Tunis',
        'Africa/Windhoek',
        'America/Adak',
        'America/Anchorage',
        'America/Araguaina',
        'America/Argentina/Buenos_Aires',
        'America/Argentina/Catamarca',
        'America/Argentina/Cordoba',
        'America/Argentina/Jujuy',
        'America/Argentina/La_Rioja',
        'America/Argentina/Mendoza',
        'America/Argentina/Rio_Gallegos',
        'America/Argentina/Salta',
        'America/Argentina/San_Juan',
        'America/Argentina/San_Luis',
        'America/Argentina/Tucuman',
        'America/Argentina/Ushuaia',
        'America/Asuncion',
        'America/Atikokan',
        'America/Bahia_Banderas',
        'America/Bahia',
        'America/Barbados',
        'America/Belem',
        'America/Belize',
        'America/Blanc-Sablon',
        'America/Boa_Vista',
        'America/Bogota',
        'America/Boise',
        'America/Cambridge_Bay',
        'America/Campo_Grande',
        'America/Cancun',
        'America/Caracas',
        'America/Cayenne',
        'America/Costa_Rica',
        'America/Creston',
        'America/Cuiaba',
        'America/Curacao',
        'America/Danmarkshavn',
        'America/Dawson_Creek',
        'America/Dawson',
        'America/Denver',
        'America/Detroit',
        'America/Edmonton',
        'America/Eirunepe',
        'America/El_Salvador',
        'America/Fort_Nelson',
        'America/Fortaleza',
        'America/Glace_Bay',
        'America/Godthab',
        'America/Goose_Bay',
        'America/Grand_Turk',
        'America/Guatemala',
        'America/Guayaquil',
        'America/Guyana',
        'America/Halifax',
        'America/Havana',
        'America/Hermosillo',
        'America/Chicago',
        'America/Chihuahua',
        'America/Indiana/Indianapolis',
        'America/Indiana/Knox',
        'America/Indiana/Marengo',
        'America/Indiana/Petersburg',
        'America/Indiana/Tell_City',
        'America/Indiana/Vevay',
        'America/Indiana/Vincennes',
        'America/Indiana/Winamac',
        'America/Inuvik',
        'America/Iqaluit',
        'America/Jamaica',
        'America/Juneau',
        'America/Kentucky/Louisville',
        'America/Kentucky/Monticello',
        'America/La_Paz',
        'America/Lima',
        'America/Los_Angeles',
        'America/Maceio',
        'America/Managua',
        'America/Manaus',
        'America/Martinique',
        'America/Matamoros',
        'America/Mazatlan',
        'America/Menominee',
        'America/Merida',
        'America/Metlakatla',
        'America/Mexico_City',
        'America/Miquelon',
        'America/Moncton',
        'America/Monterrey',
        'America/Montevideo',
        'America/Nassau',
        'America/New_York',
        'America/Nipigon',
        'America/Nome',
        'America/Noronha',
        'America/North_Dakota/Beulah',
        'America/North_Dakota/Center',
        'America/North_Dakota/New_Salem',
        'America/Ojinaga',
        'America/Panama',
        'America/Pangnirtung',
        'America/Paramaribo',
        'America/Phoenix',
        'America/Port_of_Spain',
        'America/Port-au-Prince',
        'America/Porto_Velho',
        'America/Puerto_Rico',
        'America/Punta_Arenas',
        'America/Rainy_River',
        'America/Rankin_Inlet',
        'America/Recife',
        'America/Regina',
        'America/Resolute',
        'America/Rio_Branco',
        'America/Santarem',
        'America/Santiago',
        'America/Santo_Domingo',
        'America/Sao_Paulo',
        'America/Scoresbysund',
        'America/Sitka',
        'America/St_Johns',
        'America/Swift_Current',
        'America/Tegucigalpa',
        'America/Thule',
        'America/Thunder_Bay',
        'America/Tijuana',
        'America/Toronto',
        'America/Vancouver',
        'America/Whitehorse',
        'America/Winnipeg',
        'America/Yakutat',
        'America/Yellowknife',
        'Antarctica/Casey',
        'Antarctica/Davis', //'Antarctica/DumontDUrville', // https://bugs.chromium.org/p/chromium/issues/detail?id=928068
        'Antarctica/Macquarie',
        'Antarctica/Mawson',
        'Antarctica/Palmer',
        'Antarctica/Rothera',
        'Antarctica/Syowa',
        'Antarctica/Troll',
        'Antarctica/Vostok',
        'Asia/Almaty',
        'Asia/Amman',
        'Asia/Anadyr',
        'Asia/Aqtau',
        'Asia/Aqtobe',
        'Asia/Ashgabat',
        'Asia/Atyrau',
        'Asia/Baghdad',
        'Asia/Baku',
        'Asia/Bangkok',
        'Asia/Barnaul',
        'Asia/Beirut',
        'Asia/Bishkek',
        'Asia/Brunei',
        'Asia/Colombo',
        'Asia/Damascus',
        'Asia/Dhaka',
        'Asia/Dili',
        'Asia/Dubai',
        'Asia/Dushanbe',
        'Asia/Famagusta',
        'Asia/Gaza',
        'Asia/Hebron',
        'Asia/Ho_Chi_Minh',
        'Asia/Hong_Kong',
        'Asia/Hovd',
        'Asia/Chita',
        'Asia/Choibalsan',
        'Asia/Irkutsk',
        'Asia/Jakarta',
        'Asia/Jayapura',
        'Asia/Jerusalem',
        'Asia/Kabul',
        'Asia/Kamchatka',
        'Asia/Karachi',
        'Asia/Kathmandu',
        'Asia/Khandyga',
        'Asia/Kolkata',
        'Asia/Krasnoyarsk',
        'Asia/Kuala_Lumpur',
        'Asia/Kuching',
        'Asia/Macau',
        'Asia/Magadan',
        'Asia/Makassar',
        'Asia/Manila',
        'Asia/Nicosia',
        'Asia/Novokuznetsk',
        'Asia/Novosibirsk',
        'Asia/Omsk',
        'Asia/Oral',
        'Asia/Pontianak',
        'Asia/Pyongyang',
        'Asia/Qatar',
        'Asia/Qyzylorda', //'Asia/Qostanay', // https://bugs.chromium.org/p/chromium/issues/detail?id=928068
        'Asia/Riyadh',
        'Asia/Sakhalin',
        'Asia/Samarkand',
        'Asia/Seoul',
        'Asia/Shanghai',
        'Asia/Singapore',
        'Asia/Srednekolymsk',
        'Asia/Taipei',
        'Asia/Tashkent',
        'Asia/Tbilisi',
        'Asia/Tehran',
        'Asia/Thimphu',
        'Asia/Tokyo',
        'Asia/Tomsk',
        'Asia/Ulaanbaatar',
        'Asia/Urumqi',
        'Asia/Ust-Nera',
        'Asia/Vladivostok',
        'Asia/Yakutsk',
        'Asia/Yangon',
        'Asia/Yekaterinburg',
        'Asia/Yerevan',
        'Atlantic/Azores',
        'Atlantic/Bermuda',
        'Atlantic/Canary',
        'Atlantic/Cape_Verde',
        'Atlantic/Faroe',
        'Atlantic/Madeira',
        'Atlantic/Reykjavik',
        'Atlantic/South_Georgia',
        'Atlantic/Stanley',
        'Australia/Adelaide',
        'Australia/Brisbane',
        'Australia/Broken_Hill',
        'Australia/Currie',
        'Australia/Darwin',
        'Australia/Eucla',
        'Australia/Hobart',
        'Australia/Lindeman',
        'Australia/Lord_Howe',
        'Australia/Melbourne',
        'Australia/Perth',
        'Australia/Sydney',
        'Europe/Amsterdam',
        'Europe/Andorra',
        'Europe/Astrakhan',
        'Europe/Athens',
        'Europe/Belgrade',
        'Europe/Berlin',
        'Europe/Brussels',
        'Europe/Budapest',
        'Europe/Bucharest',
        'Europe/Copenhagen',
        'Europe/Dublin',
        'Europe/Gibraltar',
        'Europe/Helsinki',
        'Europe/Chisinau',
        'Europe/Istanbul',
        'Europe/Kaliningrad',
        'Europe/Kiev',
        'Europe/Kirov',
        'Europe/Lisbon',
        'Europe/London',
        'Europe/Luxembourg',
        'Europe/Madrid',
        'Europe/Malta',
        'Europe/Minsk',
        'Europe/Monaco',
        'Europe/Moscow',
        'Europe/Oslo',
        'Europe/Paris',
        'Europe/Prague',
        'Europe/Riga',
        'Europe/Rome',
        'Europe/Samara',
        'Europe/Saratov',
        'Europe/Simferopol',
        'Europe/Sofia',
        'Europe/Stockholm',
        'Europe/Tallinn',
        'Europe/Tirane',
        'Europe/Ulyanovsk',
        'Europe/Uzhgorod',
        'Europe/Vienna',
        'Europe/Vilnius',
        'Europe/Volgograd',
        'Europe/Warsaw',
        'Europe/Zaporozhye',
        'Europe/Zurich',
        'Indian/Cocos',
        'Indian/Chagos',
        'Indian/Christmas',
        'Indian/Kerguelen',
        'Indian/Mahe',
        'Indian/Maldives',
        'Indian/Mauritius',
        'Indian/Reunion',
        'Pacific/Apia',
        'Pacific/Auckland',
        'Pacific/Bougainville',
        'Pacific/Easter',
        'Pacific/Efate',
        'Pacific/Enderbury',
        'Pacific/Fakaofo',
        'Pacific/Fiji',
        'Pacific/Funafuti',
        'Pacific/Galapagos',
        'Pacific/Gambier',
        'Pacific/Guadalcanal',
        'Pacific/Guam',
        'Pacific/Honolulu',
        'Pacific/Chatham',
        'Pacific/Chuuk',
        'Pacific/Kiritimati',
        'Pacific/Kosrae',
        'Pacific/Kwajalein',
        'Pacific/Majuro',
        'Pacific/Marquesas',
        'Pacific/Nauru',
        'Pacific/Niue',
        'Pacific/Norfolk',
        'Pacific/Noumea',
        'Pacific/Pago_Pago',
        'Pacific/Palau',
        'Pacific/Pitcairn',
        'Pacific/Pohnpei',
        'Pacific/Port_Moresby',
        'Pacific/Rarotonga',
        'Pacific/Tahiti',
        'Pacific/Tarawa',
        'Pacific/Tongatapu',
        'Pacific/Wake',
        'Pacific/Wallis'
    ]);
    /**
     * This object stores offsets in `ary_ianna_time_zones` (keys) and one corresponding index.
     * 
     * So for exmple, `ary_ianna_time_offsets["CET"]` is equal to **284** which is index of `ary_ianna_time_zones[284]==='Europe/Prague'` (in winter "+01:00" and in summer "+02:00").
     * 
     * Next example is `ary_ianna_time_offsets["-01:00"]` is equal to **238** which is index of `ary_ianna_time_zones[238]==='Atlantic/Cape_Verde'` (always "-01:00").
     * 
     * **IMPORTANT NOTE:** BST, EET, WET hasn't been validated! … idea is to behave the same way like CET
     * @property {Object} ary_ianna_time_offsets
     * @private
     * @memberof module:jaaJSU~$time
     */
    const ary_ianna_time_offsets= Object.freeze({
        '-01:00': 238,
        '-02:00': 242,
        '-03:00': 107,
        '-04:00': 49,
        '-05:00': 92,
        '-06:00': 62,
        '-07:00': 120,
        '-08:00': 337,
        '-09:00': 320,
        '-09:30': 330,
        '-10:00': 323,
        '-11:00': 332,
        '+01:00': 15,
        '+02:00': 8,
        '+03:00': 270,
        '+04:00': 306,
        '+04:30': 191,
        '+05:00': 221,
        '+05:30': 173,
        '+05:45': 194,
        '+06:00': 207,
        '+06:30': 232,
        '+07:00': 182,
        '+08:00': 220,
        '+08:30': 210,
        '+08:45': 249,
        '+09:00': 176,
        '+09:30': 248,
        '+10:00': 229,
        '+11:00': 314,
        '+12:00': 345,
        '+13:00': 316,
        '+14:00': 326,
        BST: 275,
        CET: 284,
        CEST: 284,
        EET: 264,
        EEST: 264,
        WET: 274,
        WEST: 274
    });
    
    function fromDate(date_instance){
        return toDateArray(date_instance.toISOString());
    }
    function fromDateArguments(...args){
        return toDateArray((args.filter(d=> typeof d!=="undefined").length ? new Date(...args) : new Date()).toISOString());
    }
    function fromNow(){
        return toDateArray((new Date()).toISOString());
    }
    function fromString(timestamp_string, timezone= internal_zone){
        if(!timestamp_string) return fromNow();
        let date_array= toDateArray(timestamp_string);
        if(date_array.length!==3){
            if(!isDateString(date_array[0])) date_array.unshift("");
            else if(!isTimeString(date_array[1])){
                date_array[2]= date_array[1] || timezone;
                date_array[1]= "";
            } else {
                date_array[2]= timezone;
            }
        } else if(!date_array[2]&&timezone){ date_array[2]= timezone; }
        return date_array;
    }
    function toDateArray(timestamp_string){
        let /* these hold outputs */
            date= "", time= "", zone= "";
        let /* iteration vars: curr letter instring +helpers for timezones */
            letter, acc= "", substr_index;
        while(timestamp_string.length){
            letter= timestamp_string[0];
            if(/\d/.test(letter)){
                if(!timestamp_string.search(/\d\d\d\d-\d\d-\d\d/)){
                    date= timestamp_string.substr(0, 10);
                    timestamp_string= timestamp_string.substr(10);
                } else if(!timestamp_string.search(/\d\d\/\d\d\/\d\d\d\d/)){
                    date= timestamp_string.substr(0, 10).split("/").sort(()=> -1).join("-");
                    timestamp_string= timestamp_string.substr(10);
                } else if(!timestamp_string.search(/\d\d:\d\d:\d\d/)){
                    time= "T"+timestamp_string.substr(0, 8);
                    timestamp_string= timestamp_string.substr(8);
                } else if(!timestamp_string.search(/\d\d:\d\d/)){
                    time= "T"+timestamp_string.substr(0, 5)+":00";
                    timestamp_string= timestamp_string.substr(5);
                } else {
                    timestamp_string= timestamp_string.substr(1);
                }
            } else if(/[ ,\._]/.test(letter)||!timestamp_string.substring(0, 2).search(/T\d/)){
                timestamp_string= timestamp_string.substr(1);
            } else if(!timestamp_string.search(/[\+\-]\d\d:\d\d/)){
                acc= timestamp_string.substr(0, 6);
                timestamp_string= timestamp_string.substr(6);
                if(Reflect.has(ary_ianna_time_offsets, acc)){
                    zone= acc;
                    acc= "";
                } else if(acc.substr(1,5)==="00:00"){
                    zone= "Z";
                    acc= "";
                }
            } else if(!timestamp_string.search(/[A-Z]{2,}/)){
                substr_index= timestamp_string.search(/[^A-Z]/);
                acc= substr_index===-1 ? timestamp_string : timestamp_string.substr(0, substr_index);
                timestamp_string= timestamp_string.substr(acc.length);
                if(acc==="CET"){//Reflect.has(ary_ianna_time_offsets, acc)
                    zone= acc;
                    acc= "";
                }
            } else if(letter==="Z"){
                zone= "Z";
                timestamp_string= timestamp_string.substr(1);
            } else {
                timestamp_string= timestamp_string.substr(1);
            }
            if(date&&time&&zone){ timestamp_string= ""; }
        }
        return [ date, time, zone ];
    }
    function toStringFromObject(format= format_arrays.SQL, { locale= internal_locale, declension= true, timeZone= internal_zone, sunday_shift }= {}){
        return date_array=> format.map(evaluateFormatObject(toDate(date_array), locale, timeZone, declension, sunday_shift)).join("");
    }
    function evaluateFormatObject(date, locale, timeZone, declension, sunday_shift){
        const localeObj= generateTimeZoneFormatObject.bind(null, timeZone);
        return function([type, value, modify]){
            let out= evaluateNthFromObject(date, [ type, value, modify ], declension, sunday_shift, locale, timeZone, localeObj);
            if(value==="2-digit"&&String(out).length===1) out= "0"+out; //fix
            if(modify==="two_letters") out= out.substr(0,2);
            else if(modify==="ordinal_number"&&locale.indexOf("en")!==-1) out= getOrdinalSuffix(out);
            return out;
        };
    }
    function evaluateNthFromObject(date, [ type, value, modify ], declension, sunday_shift, locale, timeZone, localeObj){
        switch (true){
            case type==="text":                                     return value;
            case type==="week":                                     return getWeekNumber(!timeZone ? date: new Date(( (l, timeZone, two)=> l({ timeZone, year: "numeric" })+"-"+double(l({ timeZone, month: two }))+"-"+double(l({ timeZone, day: two }))+"T"+double(l({ timeZone, hour: two }))+":"+double(l({ timeZone, minute: two }))+":"+double(l({ timeZone, second: two })) )( Date.prototype.toLocaleString.bind(date, "en-GB"), timeZone, "2-digit" )));
            case type==="weekday"&&value==="numeric":               return getWeekDay("numeric", { sunday_shift })(date);
            case type==="month"&&value==="long"&&declension:        return date.toLocaleString(locale,localeObj({ [type]: value, day: "numeric" })).replace(/[\d \.\/\\]/g, "");
            case type==="hour"&&modify.toLowerCase()==="a":         return date.toLocaleString(modify==="A" ? "en-US" : "en-GB",localeObj({ [type]: value, hourCycle: "h12" })).replace(/[\d \.\/\\]/g, "");
            case type==="hour":                                     return date.toLocaleString(locale,localeObj({ [type]: value, hourCycle: modify })).replace(/[ \.\/\\pam]/ig, "");
            default:                                                return date.toLocaleString(locale,localeObj({ [type]: value }));
        }
    }
    
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
                    format_string= format_string.slice(1);
            }
        }
        function handleM(){
            let type= "numeric";
            if(!format_string.search(/MMMM/)){
                type= "long";
                format_string= format_string.slice(4);
            } else if(!format_string.search(/MMM/)){
                type= "short";
                format_string= format_string.slice(3);
            } else if(!format_string.search(/MM/)){
                type= "2-digit";
                format_string= format_string.slice(2);
            } else if(!format_string.search(/Mo/)){
                format_string= format_string.slice(2);
                return out.push(["month", type, "ordinal_number"]);
            } else {
                format_string= format_string.slice(1);
            }
            out.push(["month", type]);
        }
        function handled(){
            let type= "numeric";
            if(!format_string.search(/dddd/)){
                type= "long";
                format_string= format_string.slice(4);
            } else if(!format_string.search(/ddd/)){
                type= "short";
                format_string= format_string.slice(3);
            } else if(!format_string.search(/dd/)){
                type= "short";
                format_string= format_string.slice(2);
                return out.push(["weekday", type, "two_letters"]);
            } else {
                format_string= format_string.slice(1);
            }
            out.push(["weekday", type]);
        }
        function handleY(){
            let type= "2-digit";
            if(!format_string.search(/YYYY/)){
                type= "numeric";
                format_string= format_string.slice(4);
            } else {
                format_string= format_string.slice(2);
            }
            out.push(["year", type]);
        }
        function handleWD(out_key, letter){
            let type= "numeric";
            if(!format_string.search(new RegExp(letter+"o"))){
                format_string= format_string.slice(2);
                return out.push([out_key, type, "ordinal_number"]);
            } else if(!format_string.search(new RegExp(letter+letter))){
                type= "2-digit";
                format_string= format_string.slice(2);
            } else {
                format_string= format_string.slice(1);
            }
            out.push([out_key, type]);
        }
        function handleHh(out_key, letter, hourCycle){
            let type= "numeric";
            if(!format_string.search(new RegExp(letter+letter))){
                type= "2-digit";
                format_string= format_string.slice(2);
            } else {
                format_string= format_string.slice(1);
            }
            out.push([out_key, type, hourCycle]);
        }
        function handleAa(modify){
            format_string= format_string.slice(1);
            out.push(["hour", "numeric", modify]);
        }
        function handle(out_key, letter){
            let type= "numeric";
            if(!format_string.search(new RegExp(letter+letter))){
                type= "2-digit";
                format_string= format_string.slice(2);
            } else {
                format_string= format_string.slice(1);
            }
            out.push([out_key, type]);
        }
        function handleText(){
            let text_end= format_string.indexOf("]");
            if(text_end===-1) text_end= format_string.length;
    
            out.push(["text", format_string.slice(1, text_end)]);
            format_string= format_string.slice(text_end+1);
        }
        return out;
    }
    
    function toDate(date_array){
        if(!date_array||!Array.isArray(date_array)) return new Date();
        
        let [ date, time, zone ]= date_array;
        if(!date) date= fromNow()[0];
        if(!time) time= "T00:00:00";
        if(!zone) zone= getTimeZoneOffsetString(date);
        if(zone==="CET"||zone==="CEST") zone= getCETOffset([ date, time ]);
        return new Date(date+time+zone);
    }
    function toLocaleString(format_object_name= "date_time", { locale= internal_locale, timeZone= internal_zone }= {}){
        return date_array=> toDate(date_array).toLocaleString(locale, generateTimeZoneFormatObject(timeZone, format_objects[format_object_name]));
    }
    function toRelative(reference_date_array, options){
        return date_array=> getRelative(getDiffMs(reference_date_array)(date_array), options);
    }
    function getDiff(reference_time, output_measure_string= "seconds", full_precision= false){
        const c_measure= { seconds: 1000, minutes: 60000 /* 60*sec */, hours: 3600000 /* 60*mins */, days: 86400000 /* 24*days */, weeks: 604800000 /* 7*days */, months: 2419200000 /* 4*weeks */, years: 29030400000 /* 12*months */ };
        const diffFun= getDiffMs(reference_time, -c_measure[output_measure_string]);
        return function diff(target_time){
            const diff_val= diffFun(target_time);
            return full_precision ? diff_val : Math.floor(diff_val);
        };
    }
    function getDiffMs(reference_time, output_measure= 1){
        const reference_time_ms= reference_time ? toDate(reference_time).getTime() : false;
        return function diff(target_time){ return (toDate(target_time).getTime()-(reference_time_ms ? reference_time_ms : toDate(fromNow()).getTime()))/output_measure; };
    }
    function getRelativeIntl(is_positive, diff, measurement, { locales= internal_locale, localeMatcher, numeric= "auto", style }= {}){
        const i= new Intl.RelativeTimeFormat(locales, { localeMatcher, numeric, style });
        if(!is_positive) diff= -diff;
        return i.format(diff, measurement);
    }
    function getRelativeBackup(is_positive, diff, measurement){
        const out_text= !is_positive ? "%s ago" : "in %s";
        return out_text.replace("%s", diff+" "+measurement);
    }
    function getRelative(diff, options){
        const { abs, floor, round }= Math;
        const out= typeof Intl.RelativeTimeFormat !== "function" ? getRelativeBackup : getRelativeIntl;
        const is_positive= diff < 0 ? false : true;
        
        diff= floor(abs(diff)/1000);
        if(diff<60) return out(is_positive, diff, "seconds", options);
        diff= floor(diff/60);
        if(diff<60) return out(is_positive, diff, "minutes", options);
        diff= round(diff/60);
        if(diff<24) return out(is_positive, diff, "hours", options);
        diff= diff/24;
        if(diff<29.5) return out(is_positive, round(diff), "days", options);
        diff= diff/30.41666; //avg per month
        if(diff<12) return out(is_positive, round(diff), "months", options);
        diff= round(diff/12);
        return out(is_positive, diff, "years", options);
    }
    
    function toString(format, params_obj){
        return toStringFromObject(Array.isArray(format) ? format : format ? getFormatObject(format) : undefined, params_obj);
    }
    
    function getCETOffset([ date, time ]= []){
        if(!date||!time){
            let curr= fromNow();
            if(!date) date= curr[0];
            if(!time) time= curr[1].replace(/\.\d+/, "");
        }
        const /* repeting things for getting nexts consts group (line 1), for comparing in return (line 2) */
            timeZone= "Europe/Prague", locale= "en-GB", date_and_time= date+time,
            en_date_version= date.split("-").reverse().join("/")+", "+time.replace("T", "");
        const /* for comparing in return */
            [ date_one_hour, date_two_hours ]= [ "+01:00", "+02:00" ].map(offset=> new Date(date_and_time+offset).toLocaleString(locale, { timeZone }));
        return en_date_version===date_one_hour ? "+01:00" : en_date_version===date_two_hours ? "+02:00" : "Z";
    }
    function getTimeZone(date, { locale= internal_locale, description= "long", offset= false }= {}){
        description= description.toLocaleLowerCase();
        const [ date_part, time_part, offset_part ]= getDateArrayFromMixed(date), date_instance= new Date([ date_part, time_part, offset_part ].join(""));
        const locale_param= Object.keys(ary_ianna_time_offsets).indexOf(offset_part)!==-1 ? { timeZone: ary_ianna_time_zones[ary_ianna_time_offsets[offset_part]] } : {};
        let out_description= description==="none" ? "" : date_instance.toLocaleString(locale, Object.assign({ timeZoneName: description }, locale_param)).replace(date_instance.toLocaleString(locale, locale_param), "").trim();
        const out_offset= !offset ? "" : "UTC"+(offset_part==="Z" ? getTimeZoneOffsetStringFromOffset(date_instance.getTimezoneOffset()) : date_instance.toLocaleString(locale, Object.assign({ timeZoneName: "short" }, locale_param)).replace(date_instance.toLocaleString(locale, locale_param), "").replace(/[^\d\+\-\:]/g, "").trim());
        if(out_description&&out_offset) out_description= " ("+out_description+")";
        return out_offset+out_description;
    }
    function getCurrentTimeZone({ locale= internal_locale, description= "long", offset= false }= {}){
        description= description.toLocaleLowerCase();
        if(description!=="ianna") return getTimeZone(undefined, { locale, description, offset });
        let out_description= "", dtf, dtf_ro;
        if(typeof Intl!=='undefined'&&typeof Intl.DateTimeFormat==='function'){
            dtf= Intl.DateTimeFormat() || {};
            if(typeof dtf.resolvedOptions!=="function") return undefined;
            dtf_ro= dtf.resolvedOptions().timeZone;
            out_description= Object.keys(ary_ianna_time_offsets).indexOf(dtf_ro)!==-1 ? ary_ianna_time_zones[ary_ianna_time_offsets[dtf_ro]] : dtf_ro;
        }
        const out_offset= !offset ? "" : getTimeZone(undefined, { locale, description: "none", offset: true });
        if(out_description&&out_offset) out_description= " ("+out_description+")";
        return out_offset+out_description;
    }
    function getTimeZoneOffset(date, timeZone= internal_zone){
        const date_instance= new Date(getDateArrayFromMixed(date).join(""));
        if(timeZone) return getTimeZoneDiffOffset(date_instance, timeZone);
        return date_instance.getTimezoneOffset();
    }
    function getTimeZoneDiffOffset(date_instance, timeZone= internal_zone){
        const [ sign= "+", hours= 0, minutes= 0 ]= date_instance.toLocaleString('en-GB', { timeZone, weekday: "short", timeZoneName: "short" }).replace(/(\+|\-)/g, (_, m)=> m+":").replace(/[^\d:\+\-]/g, "").split(":");
        const target_offset= ( sign==="-" ? -1 : 1 )*(Number(hours)*60+Number(minutes));
        return target_offset+date_instance.getTimezoneOffset();
    }
    function getTimeZoneOffsetString(date){
         return getTimeZoneOffsetStringFromOffset(getTimeZoneOffset(date));
    }
    function generateTimeZoneFormatObject(timeZone, format_object){
        if(!timeZone) return format_object;
        if(ary_ianna_time_zones.indexOf(timeZone)!==-1) return Object.assign({ timeZone }, format_object);
        if(typeof ary_ianna_time_offsets[timeZone]!=="undefined") return Object.assign({ timeZone: ary_ianna_time_zones[ary_ianna_time_offsets[timeZone]] }, format_object);
        return format_object;
    }
    function getDateArrayFromMixed(date_string){
        if(!date_string) return fromNow();
        if(!Array.isArray(date_string)) return toDateArray(date_string);
        return date_string;
    }
    function getTimeZoneOffsetStringFromOffset(offset){
        const { floor, abs }= Math;
        let out= offset > 0 ? "-" : "+";
        offset= abs(offset);
        out+= double(floor(offset/60))+":"+double(offset%60);
        return out;
    }
    function addDays(days_num){
        return date_instance=> (date_instance.setDate(date_instance.getDate()+days_num), date_instance);
    }
    function addMonths(months_num){
        return date_instance=> (date_instance.setMonth(date_instance.getMonth()+months_num), date_instance);
    }
    function getWeekDay(type= "numeric", { locale= internal_locale, timeZone= internal_zone, sunday_shift= 0 }= {}){
        return type==="numeric" ?
            date_instance=> { const d=date_instance.getDay()+sunday_shift; return d<0 ? d+7 : d; } :
            date_instance=> date_instance.toLocaleString(locale, timeZone ? { timeZone, weekday: type } : { timeZone, weekday: type });
    }
    function getWeekNumber(date_instance){
        const tdt= new Date(date_instance.valueOf());
        tdt.setDate(tdt.getDate() + 3 - (date_instance.getDay() + 6) % 7);
        var firstThursday = tdt.valueOf();
        tdt.setMonth(0, 1);
        if(tdt.getDay() !== 4){
            tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
        }
        return 1 + Math.ceil((firstThursday - tdt) / 604800000);
    }
    
    function modify(mod_obj){
        const operations= Object.keys(mod_obj);
        return function(date_array){
            const dateObject= toDate(date_array);
            for(let i=0, operation; ( operation= operations[i] ); i++){
                if(operation==="addDays") addDays(mod_obj[operation])(dateObject);
                else if(operation.substr(0,3)==="add") modifyAdditions(operation, mod_obj[operation], dateObject);
                else if(operation==="setMonth") dateObject.setMonth(mod_obj[operation]-1);
                else if(Reflect.has(dateObject, operation)) dateObject[operation](mod_obj[operation]);
                else if(operation==="setDay") dateObject.setDate(mod_obj[operation]);
            }
            return fromDate(dateObject);
        };
    }
    function modifyAdditions(operation, value, dateObject){
        const cmd= operation.substr(3); /* addMonth=> ...Month => (set/get)Month */
        dateObject["set"+cmd](dateObject["get"+cmd]()+value);
        return dateObject;
    }
    function redefineTimeZone(zone= internal_zone){
        return ([ date= "", time= "" ]= [])=> [ date, time, zone ];
    }
    const Date_utils= { getWeekDay, getWeekNumber, addDays, addMonths };
    
    /**
    * *Backward compatibility* 
    * Function adds leading zero to the `time`. [It can be replaced in future: see `padStart`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart).
    * @method double
    * @memberof module:jaaJSU~$time
    * @public
    * @param {Number|String} time
    * @return {String}
    *  * 00, 01, 02, ..., 09, 10, ..., 100, ...
    */
    function double(n){
        n= String(n);
        return n.length===1 ? "0"+n : n;
    }
    /**
     * Returns number of days in given month (and year)
     * @method daysInMonth
     * @memberof module:jaaJSU~$time
     * @public
     * @param {String|Number} month ISO number of month (eg 01 or 1 for January)
     * @param {String|Number} [year=">>current year<<"]  ISO nimber of year (eg. 2019)
     * @returns {Number} total of days
     */
    function daysInMonth(month, year= (new Date()).getFullYear()){/* months indexing from 0 */
        return new Date(+year, +month, 0 /* last in prev month */).getDate();
    }
    /**
     * Returns number of days in given month
     * @method getDaysInMonth
     * @memberof module:jaaJSU~$time
     * @public
     * @param {module:jaaJSU~$time.types~DateArray} [date_array=">>current year<<"]
     * @returns {Number} total of days
     */
    function getDaysInMonth([ date= fromNow()[0] ]= []){
        const [ _, month, year ]= date.split("-").map(Number);
        return daysInMonth(month, year);
    }
    /**
    * *Backward compatibility* 
    * @method getMonthName
    * @memberof module:jaaJSU~$time
    * @public
    * @param {Number} n Month number (typically [1-12]); Works cyclically `13===1, ...`
    * @param {Number|Boolean} [l=undefined] Length of output Month name
    * @return {String} English month name
    * @example
    * console.log($time.getMonthName(5));//"May"
    * console.log($time.getMonthName(24, 4));//"Dece"
    */
    function getMonthName(n,l) {
        if(typeof n!=="number") n= parseInt(n);
        if(isNaN(n)) return false;
        let s= ["December","January","February","March","April","May","June", "July","August","September","October","November"];
        let v= s[n%12];
        if(l){
            if(l===-1){l=3; if(v.length===4) l=4;}
            v= v.substring(0,l);
        }
        return v;
    }
    /**
     * *Backward compatibility* 
     * See {@link module:jaaJSU~$time.ordinal_numbers}.
     * @method getOrdinalSuffix
     * @memberof module:jaaJSU~$time
     * @public
     * @param {Number} n
     * @return {String} `n`+English suffix
     * @example
     * console.log($time.getOrdinalSuffix(1));//"1st"
     */
    function getOrdinalSuffix(n_orig) {
        const n= typeof n_orig==="number" ? n_orig : parseInt(n_orig);
        if(isNaN(n)) return n_orig;
        let v= n%100;
        return n_orig+(ordinal_numbers[(v-20)%10]||ordinal_numbers[v]||ordinal_numbers[0]);
    }
    
    const _= void(0);
    const formats= format_arrays;
    
    const getTimeZones= ()=> ary_ianna_time_zones;
    const isTimeZone= candidate=> ary_ianna_time_zones.indexOf(candidate)!==-1;
    const setInternalZone= zone=> internal_zone= zone;
    const setInternalLocale= locale=> internal_locale= locale;
    return { fromDate, fromDateArguments, fromNow, fromString, toDate, toLocaleString, toRelative, getDiff, getRelative, toString, getCETOffset, getTimeZone, getCurrentTimeZone, getTimeZoneOffset, getTimeZoneOffsetString, modify, redefineTimeZone, Date_utils, double, daysInMonth, getDaysInMonth, getMonthName, getOrdinalSuffix, _, formats, getTimeZones, isTimeZone, setInternalZone, setInternalLocale };
}));