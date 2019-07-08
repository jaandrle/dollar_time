/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* global gulp_place */
/**
 * This NAMESPACE provides features for time.
 * @class $time.{namespace}
 * @static
 */
const time= (function init(){
    const /* internal constants */
        format_objects= (({ HHmm, YYYYMMDD, SS })=>({
            HHmm, YYYYMMDD,
            HHmmSS: Object.assign(SS, HHmm),
            YYYYMMDDHHmmSS: Object.assign({}, Object.assign(SS, HHmm), YYYYMMDD)
        }))({
            HHmm: { hour: "2-digit", minute: "2-digit" },
            YYYYMMDD: { year: "numeric", day: "2-digit", month: "2-digit" },
            SS: { second: "2-digit" }
        }),
        format_arrays= (({ dash, colon, space, two_dig })=>({
            YYYYMMDDHHmmSS: [ ["year", "numeric"], dash, ["month", two_dig], dash, ["day", two_dig], space, ["hour", two_dig], colon, ["minute", two_dig], colon, ["second", two_dig] ],
            YYYYMMDD: [ ["year", "numeric"], dash, ["month", two_dig], dash, ["day", two_dig] ]
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
        'Europe/Andorra',
        'Asia/Dubai',
        'Asia/Kabul',
        'Europe/Tirane',
        'Asia/Yerevan',
        'Antarctica/Casey',
        'Antarctica/Davis', //'Antarctica/DumontDUrville', // https://bugs.chromium.org/p/chromium/issues/detail?id=928068
        'Antarctica/Mawson',
        'Antarctica/Palmer',
        'Antarctica/Rothera',
        'Antarctica/Syowa',
        'Antarctica/Troll',
        'Antarctica/Vostok',
        'America/Argentina/Buenos_Aires',
        'America/Argentina/Cordoba',
        'America/Argentina/Salta',
        'America/Argentina/Jujuy',
        'America/Argentina/Tucuman',
        'America/Argentina/Catamarca',
        'America/Argentina/La_Rioja',
        'America/Argentina/San_Juan',
        'America/Argentina/Mendoza',
        'America/Argentina/San_Luis',
        'America/Argentina/Rio_Gallegos',
        'America/Argentina/Ushuaia',
        'Pacific/Pago_Pago',
        'Europe/Vienna',
        'Australia/Lord_Howe',
        'Antarctica/Macquarie',
        'Australia/Hobart',
        'Australia/Currie',
        'Australia/Melbourne',
        'Australia/Sydney',
        'Australia/Broken_Hill',
        'Australia/Brisbane',
        'Australia/Lindeman',
        'Australia/Adelaide',
        'Australia/Darwin',
        'Australia/Perth',
        'Australia/Eucla',
        'Asia/Baku',
        'America/Barbados',
        'Asia/Dhaka',
        'Europe/Brussels',
        'Europe/Sofia',
        'Atlantic/Bermuda',
        'Asia/Brunei',
        'America/La_Paz',
        'America/Noronha',
        'America/Belem',
        'America/Fortaleza',
        'America/Recife',
        'America/Araguaina',
        'America/Maceio',
        'America/Bahia',
        'America/Sao_Paulo',
        'America/Campo_Grande',
        'America/Cuiaba',
        'America/Santarem',
        'America/Porto_Velho',
        'America/Boa_Vista',
        'America/Manaus',
        'America/Eirunepe',
        'America/Rio_Branco',
        'America/Nassau',
        'Asia/Thimphu',
        'Europe/Minsk',
        'America/Belize',
        'America/St_Johns',
        'America/Halifax',
        'America/Glace_Bay',
        'America/Moncton',
        'America/Goose_Bay',
        'America/Blanc-Sablon',
        'America/Toronto',
        'America/Nipigon',
        'America/Thunder_Bay',
        'America/Iqaluit',
        'America/Pangnirtung',
        'America/Atikokan',
        'America/Winnipeg',
        'America/Rainy_River',
        'America/Resolute',
        'America/Rankin_Inlet',
        'America/Regina',
        'America/Swift_Current',
        'America/Edmonton',
        'America/Cambridge_Bay',
        'America/Yellowknife',
        'America/Inuvik',
        'America/Creston',
        'America/Dawson_Creek',
        'America/Fort_Nelson',
        'America/Vancouver',
        'America/Whitehorse',
        'America/Dawson',
        'Indian/Cocos',
        'Europe/Zurich',
        'Africa/Abidjan',
        'Pacific/Rarotonga',
        'America/Santiago',
        'America/Punta_Arenas',
        'Pacific/Easter',
        'Asia/Shanghai',
        'Asia/Urumqi',
        'America/Bogota',
        'America/Costa_Rica',
        'America/Havana',
        'Atlantic/Cape_Verde',
        'America/Curacao',
        'Indian/Christmas',
        'Asia/Nicosia',
        'Asia/Famagusta',
        'Europe/Prague',
        'Europe/Berlin',
        'Europe/Copenhagen',
        'America/Santo_Domingo',
        'Africa/Algiers',
        'America/Guayaquil',
        'Pacific/Galapagos',
        'Europe/Tallinn',
        'Africa/Cairo',
        'Africa/El_Aaiun',
        'Europe/Madrid',
        'Africa/Ceuta',
        'Atlantic/Canary',
        'Europe/Helsinki',
        'Pacific/Fiji',
        'Atlantic/Stanley',
        'Pacific/Chuuk',
        'Pacific/Pohnpei',
        'Pacific/Kosrae',
        'Atlantic/Faroe',
        'Europe/Paris',
        'Europe/London',
        'Asia/Tbilisi',
        'America/Cayenne',
        'Africa/Accra',
        'Europe/Gibraltar',
        'America/Godthab',
        'America/Danmarkshavn',
        'America/Scoresbysund',
        'America/Thule',
        'Europe/Athens',
        'Atlantic/South_Georgia',
        'America/Guatemala',
        'Pacific/Guam',
        'Africa/Bissau',
        'America/Guyana',
        'Asia/Hong_Kong',
        'America/Tegucigalpa',
        'America/Port-au-Prince',
        'Europe/Budapest',
        'Asia/Jakarta',
        'Asia/Pontianak',
        'Asia/Makassar',
        'Asia/Jayapura',
        'Europe/Dublin',
        'Asia/Jerusalem',
        'Asia/Kolkata',
        'Indian/Chagos',
        'Asia/Baghdad',
        'Asia/Tehran',
        'Atlantic/Reykjavik',
        'Europe/Rome',
        'America/Jamaica',
        'Asia/Amman',
        'Asia/Tokyo',
        'Africa/Nairobi',
        'Asia/Bishkek',
        'Pacific/Tarawa',
        'Pacific/Enderbury',
        'Pacific/Kiritimati',
        'Asia/Pyongyang',
        'Asia/Seoul',
        'Asia/Almaty',
        'Asia/Qyzylorda', //'Asia/Qostanay', // https://bugs.chromium.org/p/chromium/issues/detail?id=928068
        'Asia/Aqtobe',
        'Asia/Aqtau',
        'Asia/Atyrau',
        'Asia/Oral',
        'Asia/Beirut',
        'Asia/Colombo',
        'Africa/Monrovia',
        'Europe/Vilnius',
        'Europe/Luxembourg',
        'Europe/Riga',
        'Africa/Tripoli',
        'Africa/Casablanca',
        'Europe/Monaco',
        'Europe/Chisinau',
        'Pacific/Majuro',
        'Pacific/Kwajalein',
        'Asia/Yangon',
        'Asia/Ulaanbaatar',
        'Asia/Hovd',
        'Asia/Choibalsan',
        'Asia/Macau',
        'America/Martinique',
        'Europe/Malta',
        'Indian/Mauritius',
        'Indian/Maldives',
        'America/Mexico_City',
        'America/Cancun',
        'America/Merida',
        'America/Monterrey',
        'America/Matamoros',
        'America/Mazatlan',
        'America/Chihuahua',
        'America/Ojinaga',
        'America/Hermosillo',
        'America/Tijuana',
        'America/Bahia_Banderas',
        'Asia/Kuala_Lumpur',
        'Asia/Kuching',
        'Africa/Maputo',
        'Africa/Windhoek',
        'Pacific/Noumea',
        'Pacific/Norfolk',
        'Africa/Lagos',
        'America/Managua',
        'Europe/Amsterdam',
        'Europe/Oslo',
        'Asia/Kathmandu',
        'Pacific/Nauru',
        'Pacific/Niue',
        'Pacific/Auckland',
        'Pacific/Chatham',
        'America/Panama',
        'America/Lima',
        'Pacific/Tahiti',
        'Pacific/Marquesas',
        'Pacific/Gambier',
        'Pacific/Port_Moresby',
        'Pacific/Bougainville',
        'Asia/Manila',
        'Asia/Karachi',
        'Europe/Warsaw',
        'America/Miquelon',
        'Pacific/Pitcairn',
        'America/Puerto_Rico',
        'Asia/Gaza',
        'Asia/Hebron',
        'Europe/Lisbon',
        'Atlantic/Madeira',
        'Atlantic/Azores',
        'Pacific/Palau',
        'America/Asuncion',
        'Asia/Qatar',
        'Indian/Reunion',
        'Europe/Bucharest',
        'Europe/Belgrade',
        'Europe/Kaliningrad',
        'Europe/Moscow',
        'Europe/Simferopol',
        'Europe/Kirov',
        'Europe/Astrakhan',
        'Europe/Volgograd',
        'Europe/Saratov',
        'Europe/Ulyanovsk',
        'Europe/Samara',
        'Asia/Yekaterinburg',
        'Asia/Omsk',
        'Asia/Novosibirsk',
        'Asia/Barnaul',
        'Asia/Tomsk',
        'Asia/Novokuznetsk',
        'Asia/Krasnoyarsk',
        'Asia/Irkutsk',
        'Asia/Chita',
        'Asia/Yakutsk',
        'Asia/Khandyga',
        'Asia/Vladivostok',
        'Asia/Ust-Nera',
        'Asia/Magadan',
        'Asia/Sakhalin',
        'Asia/Srednekolymsk',
        'Asia/Kamchatka',
        'Asia/Anadyr',
        'Asia/Riyadh',
        'Pacific/Guadalcanal',
        'Indian/Mahe',
        'Africa/Khartoum',
        'Europe/Stockholm',
        'Asia/Singapore',
        'America/Paramaribo',
        'Africa/Juba',
        'Africa/Sao_Tome',
        'America/El_Salvador',
        'Asia/Damascus',
        'America/Grand_Turk',
        'Africa/Ndjamena',
        'Indian/Kerguelen',
        'Asia/Bangkok',
        'Asia/Dushanbe',
        'Pacific/Fakaofo',
        'Asia/Dili',
        'Asia/Ashgabat',
        'Africa/Tunis',
        'Pacific/Tongatapu',
        'Europe/Istanbul',
        'America/Port_of_Spain',
        'Pacific/Funafuti',
        'Asia/Taipei',
        'Europe/Kiev',
        'Europe/Uzhgorod',
        'Europe/Zaporozhye',
        'Pacific/Wake',
        'America/New_York',
        'America/Detroit',
        'America/Kentucky/Louisville',
        'America/Kentucky/Monticello',
        'America/Indiana/Indianapolis',
        'America/Indiana/Vincennes',
        'America/Indiana/Winamac',
        'America/Indiana/Marengo',
        'America/Indiana/Petersburg',
        'America/Indiana/Vevay',
        'America/Chicago',
        'America/Indiana/Tell_City',
        'America/Indiana/Knox',
        'America/Menominee',
        'America/North_Dakota/Center',
        'America/North_Dakota/New_Salem',
        'America/North_Dakota/Beulah',
        'America/Denver',
        'America/Boise',
        'America/Phoenix',
        'America/Los_Angeles',
        'America/Anchorage',
        'America/Juneau',
        'America/Sitka',
        'America/Metlakatla',
        'America/Yakutat',
        'America/Nome',
        'America/Adak',
        'Pacific/Honolulu',
        'America/Montevideo',
        'Asia/Samarkand',
        'Asia/Tashkent',
        'America/Caracas',
        'Asia/Ho_Chi_Minh',
        'Pacific/Efate',
        'Pacific/Wallis',
        'Pacific/Apia',
        'Africa/Johannesburg'
    ]);
    const ary_ianna_time_offsets= Object.freeze({
        '-01:00': 108,
        '-02:00': 144,
        '-03:00': 337,
        '-04:00': 340,
        '-05:00': 229,
        '-06:00': 288,
        '-07:00': 327,
        '-08:00': 239,
        '-09:00': 232,
        '-09:30': 231,
        '-10:00': 336,
        '-11:00': 225,
        '+01:00': 291,
        '+02:00': 345,
        '+03:00': 300,
        '+04:00': 281,
        '+04:30': 2,
        '+05:00': 339,
        '+05:30': 182,
        '+05:45': 223,
        '+06:00': 262,
        '+06:30': 193,
        '+07:00': 341,
        '+08:00': 303,
        '+08:30': 173,
        '+08:45': 39,
        '+09:00': 296,
        '+09:30': 37,
        '+10:00': 273,
        '+11:00': 342,
        '+12:00': 343,
        '+13:00': 295,
        '+14:00': 172,
        BST: 134,
        CET: 113,
        EET: 250,
        WET: 243
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
                date_array[2]= timezone ? timezone : date_array[1];
                date_array[1]= "";
            } else {
                date_array[2]= timezone ? timezone : "";
            }
        } else if(timezone){ date_array[2]= timezone; }
        return date_array;
    }
    function toDateArray(timestamp_string){
        let letter, counter= 0, acc= "", substr_index, date= "", time= "", zone= "";
        while(timestamp_string.length){
            letter= timestamp_string[0];
            if(/\d/.test(letter)){
                if(!timestamp_string.search(/\d\d\d\d-\d\d-\d\d/)){
                    date= timestamp_string.substr(0, 10);
                    timestamp_string= timestamp_string.substr(10);
                } else if(!timestamp_string.search(/\d\d\/\d\d\/\d\d\d\d/)){
                    date= timestamp_string.substr(0, 10).split("/").sort((_,k)=> k).join("-");
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
            } else if(/[ ,\._]/.test(letter)||/T\d/.test(letter)){
                timestamp_string= timestamp_string.substr(1);
            } else if(!timestamp_string.search(/[\+\-]\d\d:\d\d/)){
                acc= timestamp_string.substr(0, 6);
                timestamp_string= timestamp_string.substr(6);
                if(Reflect.has(ary_ianna_time_offsets, acc)){
                    zone= acc;
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
            counter+= 1; if(counter>5 && date&&time&&zone){ timestamp_string= ""; }
        }
        return [ date, time, zone ];
    }
    
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
    function toDate([ date, time, zone ]= []){
        if(!date) date= fromNow()[0];
        if(!time) time= "T00:00:00";
        if(!zone) zone= getTimeZoneOffsetString(date);
        if(zone==="CET") zone= getCETOffset([ date, time ]);
        return new Date(date+time+zone);
    }
    function toDateString(params_obj){
        return toStringFromObject(format_arrays.YYYYMMDD, params_obj);
    }
    function toDateTimeString(params_obj){
        return toStringFromObject(format_arrays.YYYYMMDDHHmmSS, params_obj);
    }
    function toLocaleDateString(format_object= "YYYYMMDD", { locale= internal_locale, timeZone= internal_zone }= {}){
        return date_array=> toDate(date_array).toLocaleString(locale, generateTimeZoneFormatObject(timeZone, format_objects[format_object]));
    }
    function toLocaleTimeString(format_object= "HHmmSS", { locale= internal_locale, timeZone= internal_zone }= {}){
        return date_array=> toDate(date_array).toLocaleString(locale, generateTimeZoneFormatObject(timeZone, format_objects[format_object]));
    }
    function toRelative(date_array){
        return getRelative(getDiff()(date_array));
    }
    
    function getDiffFull(reference_time, output_measure_string= "seconds", full_precision= false){
        const c_measure= { seconds: 1000, minutes: 60000 /* 60*sec */, hours: 3600000 /* 60*mins */, days: 86400000 /* 24*days */, weeks: 604800000 /* 7*days */, months: 2419200000 /* 4*weeks */, years: 29030400000 /* 12*months */ };
        const reference_time_ms= reference_time ? toDate(reference_time).getTime() : false;
        return function diff(target_time){
            const diff_val= getDiff(reference_time_ms, -c_measure[output_measure_string])(target_time);
            return full_precision ? diff_val : Math.floor(diff_val);
        };
    }
    function getDiff(reference_time, output_measure= 1){
        const reference_time_ms= reference_time ? toDate(reference_time).getTime() : false;
        return function diff(target_time){ return (toDate(target_time).getTime()-(reference_time_ms ? reference_time_ms : toDate(fromNow()).getTime()))/output_measure; };
    }
    function getRelative(ms_diff){
        const { abs, floor, round }= Math;
        const out_text= ms_diff < 0 ? "%s ago" : "in %s";
        ms_diff= abs(ms_diff);
        if(ms_diff<1500) return "now";
        ms_diff= floor(ms_diff/1000);
        if(ms_diff<10) return out_text.replace("%s", "a few seconds");
        if(ms_diff<60) return out_text.replace("%s", ms_diff+" seconds");
        ms_diff= floor(ms_diff/60);
        if(ms_diff===1) return out_text.replace("%s", "a minute");
        if(ms_diff<60) return out_text.replace("%s", ms_diff+" minutes");
        ms_diff= round(ms_diff/60);
        if(ms_diff===1) return out_text.replace("%s", "an hour");
        if(ms_diff<24) return out_text.replace("%s", ms_diff+" hours");
        ms_diff= ms_diff/24;
        if(round(ms_diff)===1) return out_text.replace("%s", "a day");
        if(ms_diff<29.5) return out_text.replace("%s", round(ms_diff)+" days");
        ms_diff= ms_diff/30.41666; //avg per month
        if(round(ms_diff)===1) return out_text.replace("%s", "a month");
        if(ms_diff<12) return out_text.replace("%s", round(ms_diff)+" months");
        ms_diff= round(ms_diff/12);
        if(ms_diff===1) return out_text.replace("%s", "a year");
        return out_text.replace("%s", ms_diff+" years");
    }
    function toString(format_string, params_obj){
        return toStringFromObject(format_string ? getFormatObject(format_string) : false, params_obj);
    }
    /* to_functions/toRelative *//* global getDiffFull, getRelative *///gulp.remove.line
    
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
        const date_instance= getDateInstaneFromDateArrayOrString(date);
        let out_description= description==="none" ? "" : date_instance.toLocaleString(locale, { timeZoneName: description }).replace(date_instance.toLocaleString(locale), "").trim();
        const out_offset= !offset ? "" : "UTC"+getTimeZoneOffsetStringFromOffset(date_instance.getTimezoneOffset());
        if(out_description&&out_offset) out_description= " ("+out_description+")";
        return out_offset+out_description;
    }
    function getTimeZoneOffset(date){
        return getDateInstaneFromDateArrayOrString(date).getTimezoneOffset();
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
    function getDateInstaneFromDateArrayOrString(date_string){
        if(!date_string) return new Date();
        if(!Array.isArray(date_string)) date_string= toDateArray(date_string);
        return new Date(...date_string[0].split("-").map((v,k)=> k===1 ? +v-1 : +v));
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
    function addMonths(monthss_num){
        return date_instance=> (date_instance.setMonth(date_instance.getMonth()+monthss_num), date_instance);
    }
    function getWeekDay(type= "numeric", { locale= internal_locale, timeZone= internal_zone }= {}){
        return type==="numeric" ? date_instance=> date_instance.getDay() : date_instance=> date_instance.toLocaleString(locale, { weekday: type });
    }
    function modify(mod_obj){
        const operations= Object.keys(mod_obj);
        return function(date_array){
            const dateObject= toDate(date_array);
            for(let i=0, operation; ( operation= operations[i] ); i++){
                if(operation==="addDays") addDays(mod_obj[operation])(dateObject);
                else if(operation==="addMonths") addMonths(mod_obj[operation])(dateObject);
                else if(operation==="setMonth") dateObject.setMonth(mod_obj[operation]-1);
                else if(Reflect.has(dateObject, operation)) dateObject[operation](mod_obj[operation]);
                else if(operation==="setDay") dateObject.setDate(mod_obj[operation]);
            }
            return fromDate(dateObject);
        };
    }
    function setTimeZone(zone= internal_zone){
        return ([ date= "", time= "" ]= [])=> [ date, time, zone ];
    }
    
    /**
    * Function adds leading zero to the `time`. [It can be replaced in future: see `padStart`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)
    * @method double
    * @param {Number|String} time
    * @return {String}
    *  * 00, 01, 02, ..., 09, 10, ..., 100, ...
    */
    function double(n){
        n= String(n);
        return n.length===1 ? "0"+n : n;
    }
    /**
    * @method getMonthName
    * @param {Number} n
    *  * Month number (typically [1-12])
    *  * Works cyclically `13===1, ...`
    * @param {Number|Boolean} [l=undefined]
    *  * Length of output Month name
    * @return {String}
    *  * English month name
    * @example
    *     console.log($time.getMonthName(5));//"May"
    *     console.log($time.getMonthName(24, 4));//"Dece"
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
    * @method getOrdinalSuffix
    * @param {Number} n
    * @return {String}
    *  * `n`+English suffix
    * @example
    *     console.log($time.getOrdinalSuffix(1));//"1st"
    */
    function getOrdinalSuffix(n_orig) {
        const n= typeof n_orig==="number" ? n_orig : parseInt(n_orig);
        if(isNaN(n)) return n_orig;
        let v= n%100;
        return n_orig+(ordinal_numbers[(v-20)%10]||ordinal_numbers[v]||ordinal_numbers[0]);
    }
    
    return {
        _: undefined,
    
        fromNow, fromString, fromDate, fromDateArguments,
    
        toDate, toString, toDateTimeString, toDateString, toLocaleTimeString, toLocaleDateString, toRelative,
    
        getDiff: getDiffFull, getRelative,
        getCETOffset, getTimeZoneOffset, getTimeZoneOffsetString, getTimeZone,
    
        Date: { getWeekDay, addDays, addMonths },
        setTimeZone, modify,
    
        /* backward compatibility */ double, getOrdinalSuffix, getMonthName,
        /* backward compatibility */ getTimeStamp: t=> toDateTimeString()(fromDateArguments(t)), getDateStamp: t=> toDateString()(fromDateArguments(t)),
    
        getTimeZones: ()=> ary_ianna_time_zones, isTimeZone: candidate=> ary_ianna_time_zones.indexOf(candidate)!==-1,
        setInternalZone: zone=> internal_zone= zone, setInternalLocale: locale=> internal_locale= locale
    };
})();