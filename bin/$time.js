/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* global gulp_place */
/**
 * This NAMESPACE provides features for date/time. Mainly, there are utilities using **Date** class and feature [`Date.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString).
 * @class $time.{namespace}
 * @static
 */
const $time= (function init(){/* version: "0.1.2" */
    const /* internal store */
    /**
     * Internal object holding predefined formating arguments for `$time.toLocaleString`. For example `format_objects.time==={ hour: "2-digit", minute: "2-digit" }`.
     * 
     * Keys:
     *  - `time`: shows combination of 2-digits hour and minutes
     *  - `time_seconds`: shows combination of `time` and seconds
     *  - `date`: shows combination of 2-digits day, month and full year
     *  - `date_time`: shows combination of `time` and `date`
     *  - `date_time_seconds`: shows combination of `date_time` and `seconds`
     * @property {Object} format_objects
     * @private
     * @for $time.{namespace}
     */
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
    /**
     * Internal object holding predefined formating arguments for `getFormatObject`. For example `format_arrays.YYYYMMDD=== [ ["year", "numeric"], dash, ["month", two_dig], dash, ["day", two_dig] ]`.
     * 
     * Keys:
     *  - `YMD_2d`: shows **"YYYY-MM-DD"**
     *  - `YMDHmS_2d`: shows **"YYYY-MM-DD HH:mm:ss"**
     *  - `Hms_2d`: shows **"HH:mm:ss"**
     * @property {Object} format_arrays
     * @private
     * @for $time.{namespace}
     */
        format_arrays= (({ dash, colon, space, two_dig })=>({
            YMDHmS_2d: [ ["year", "numeric"], dash, ["month", two_dig], dash, ["day", two_dig], space, ["hour", two_dig, "h23"], colon, ["minute", two_dig], colon, ["second", two_dig] ],
            YMD_2d: [ ["year", "numeric"], dash, ["month", two_dig], dash, ["day", two_dig] ],
            Hms_2d: [ ["hour", two_dig, "h23"], colon, ["minute", two_dig], colon, ["second", two_dig] ]
        }))({
            dash: [ "text", "-" ],
            colon: [ "text", ":" ],
            space: [ "text", " " ],
            two_dig: "2-digit"
        }),
    /**
     * Internal helper array for `getOrdinalSuffix`.
     * @property {Array} ordinal_numbers
     * @private
     * @for $time.{namespace}
     */
        ordinal_numbers= [ "th", "st", "nd", "rd" ];
    const /* validation functions */
    /**
     * Very simple test for 'YYYY-MM-DD' pattern. Returns `true` if `date_string` includes **`-`**.
     * @method isDateString
     * @for $time.{namespace}
     * @private
     * @param {String|...String} date_string
     * @returns {Boolean}
     * @example
     *      isDateString("2019-05-06");//= true
     *      isDateString("06/05/2019");//= false !!!!
     */
        isDateString= date_string=> date_string.indexOf("-")!==-1,
    /**
     * Very simple test for 'T...' pattern. Returns `true` if `date_string` includes **`T`**.
     * @method isTimeString
     * @for $time.{namespace}
     * @private
     * @param {String|...String} date_string
     * @returns {Boolean}
     * @example
     *      isDateString("T12:00:00");//= true
     *      isDateString("12:00:00");//= false !!!
     *      isDateString("Twrong");//= true !!!!
     */
        isTimeString= date_string=> date_string.indexOf("T")!==-1;
    let /* internal variables*/
        internal_locale= "en-GB",
        internal_zone= "";
    /**
     * This array stores all time zones names (eg. 'Europe/Andorra') supported by `{ timeZone: ... }` in second argument of `Date.prototype.toLocaleString`.
     * @property {Array} ary_ianna_time_zones
     * @private
     * @for $time.{namespace}
     */
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
    /**
     * This object stores indeces for all timezones. (eg. `ary_ianna_time_offsets["CET"]===113` and `ary_ianna_time_zones[113]==='Europe/Prague'` )
     * @property {Object} ary_ianna_time_offsets
     * @private
     * @for $time.{namespace}
     */
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

    
    /**
     * Function generates `DateArray` from instance of `Date`.
     * @method fromDate
     * @for $time.{namespace}
     * @public
     * @param {Date} date_instance 
     *  - instance of `Date` class
     * @returns {DateArray}
     *  - See [toDateArray](#methods_toDateArray).
     */
    function fromDate(date_instance){
        return toDateArray(date_instance.toISOString());
    }
    /**
     * Function generates `DateArray` from arguments to initialize `Date`.
     * @method fromDateArguments
     * @for $time.{namespace}
     * @public
     * @param {...Mixed} args 
     *  - parameters for initialize `Date` class
     * @returns {DateArray}
     *  - See [toDateArray](#methods_toDateArray).
     */
    function fromDateArguments(...args){
        return toDateArray((args.filter(d=> typeof d!=="undefined").length ? new Date(...args) : new Date()).toISOString());
    }
    /**
     * Function generates `DateArray` from current date and time.
     * @method fromNow
     * @for $time.{namespace}
     * @public
     * @returns {DateArray}
     *  - See [toDateArray](#methods_toDateArray).
     */
    function fromNow(){
        return toDateArray((new Date()).toISOString());
    }
    /**
     * Function generates `DateArray` from passed string.
     * @method fromString
     * @for $time.{namespace}
     * @public
     * @param {String} timestamp_string 
     *  - Supported forms are combinations of date ("YYYY-MM-DD", "DD/MM/YYYY"), time ("HH:mm:ss", "HH:mm") and timezone ("CET", "+01:00", "-02:00", ...)
     *  - Typically: "2019-06-02 12:35:45 +01:00", "2019-06-02T12:35:45+01:00", "12:35:45+01:00 2019-06-02", ...
     * @param {String} [timezone= internal_zone]
     *  - Override timezone in `timestamp_string`
     * @returns {DateArray}
     *  - See [toDateArray](#methods_toDateArray).
     */
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
    /**
     * Function generates array in a form `[ date, time, time_zone ]` from 'ISO' like string.
     * @method toDateArray
     * @for $time.{namespace}
     * @private
     * @param {String} timestamp_string
     *  - Supported forms are combinations of date ("YYYY-MM-DD", "DD/MM/YYYY"), time ("HH:mm:ss", "HH:mm") and timezone ("CET", "+01:00", "-02:00", ...)
     *  - Typically: "2019-06-02 12:35:45 +01:00", "2019-06-02T12:35:45+01:00", "12:35:45+01:00 2019-06-02", ...
     * @returns {DateArray}
     *  - `[ date, time, time_zone ]`
     *  - where:
     *      - `date` is always "YYYY-MM-DD" or ""
     *      - `time` is always "HH:mm:SS" or "HH:mm:00" or ""
     *      - `time_zone` is always "[+-]\d\d:\d\d" or "CET" or ""
     */
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
    
    /**
     * Function generates text based on `format`, `locale` and `timeZone` from `DateArray`.
     * @method toStringFromObject
     * @for $time.{namespace}
     * @private
     * @param {Array} format
     *  - Placeholder for replace/generate final string (eg. [[ "month", "2-digits" ]]===two digits month)
     *  - see [`getFormatObject`](#methods_getFormatObject) an [`format_arrays`](#props_format_arrays).
     * @param {DateArray} params_obj
     *  - It is in fact argument for [`Date.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString)
     * @param {String} params_obj.locale
     *  - In which language/national format generate final string
     * @param {String} params_obj.timeZone
     *  - Time zone name from [`ary_ianna_time_zones`](#props_ary_ianna_time_zones).
     * @param {String} params_obj.declension
     *  - **default: true**
     *  - Needed for some languages — for example in Czech: "10. července" (`declension=true`), or "10. červenec" (`declension=false`)
     * @returns {Function}
     *  - `DateArray`=> **&lt;String&gt;**
     * @example
     *      $time.toStringFromObject("DD/MM/YYYY HH:mm:SS",{ locale: "en-GB" })($time.fromNow());//= "05/06/2019 09:32:20"
     */
    function toStringFromObject(format, { locale= internal_locale, declension= true, timeZone= internal_zone }= {}){
        if(!format) return date_array=> date_array.join("");
        return date_array=> format.map(evaluateFormatObject(toDate(date_array), locale, timeZone, declension)).join("");
    }
    function evaluateFormatObject(date, locale, timeZone, declension){
        const localeObj= generateTimeZoneFormatObject.bind(null, timeZone);
        return function([type, value, modify]){
            let out= evaluateNthFromObject(date, type, value, modify, declension, locale, localeObj);
            if(value==="2-digit"&&out.length===1) out= "0"+out; //fix
            if(modify==="two_letters") out= out.substr(0,2);
            else if(modify==="ordinal_number"&&locale.indexOf("en")!==-1) out= getOrdinalSuffix(out);
            return out;
        };
    }
    function evaluateNthFromObject(date, type, value, modify, declension, locale, localeObj){
        switch (true){
            case type==="text":                                     return value;
            case type==="week":                                     return getWeekNumber(date);
            case type==="weekday"&&value==="numeric":               return getWeekDay()(date);
            case type==="month"&&value==="long"&&declension:        return date.toLocaleString(locale,localeObj({ [type]: value, day: "numeric" })).replace(/[\d \.\/\\]/g, "");
            case type==="hour"&&modify.toLowerCase()==="a":         return date.toLocaleString(modify==="A" ? "en-US" : "en-GB",localeObj({ [type]: value, hourCycle: "h12" })).replace(/[\d \.\/\\]/g, "");
            case type==="hour":                                     return date.toLocaleString(locale,localeObj({ [type]: value, hourCycle: modify })).replace(/[ \.\/\\pam]/ig, "");
            default:                                                return date.toLocaleString(locale,localeObj({ [type]: value }));
        }
    }
    /**
     * Generates multidimensional array for formatting (eg. "YYYY"=> `[ [ "year", "numeric" ] ]`).
     * @method getFormatObject
     * @for $time.{namespace}
     * @private
     * @param {String} format_string
     *  - supports "YYYY", "YY", "MM", "MMM", "MMMM", "dddd" (weekday - Monday), "ddd" (shorter weekday - Mon), "dd" (Mo), "d" (0===Sun <> 6===Sat), "DD", "D", "Do", "HH", "H", "mm", "m", "SS", "S", "W", "Wo"
     * @returns {...Array}
     *  - `[ [ operation, argument, params ] ]`
     *  - `Opertions` are in fact arguments for [`Date.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) and `arguments` are their values.
     */
    function getFormatObject(format_string= ""){
        let out= [];
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
                    let letter= format_string[0];
                    if(out[out.length-1][0]==="text") out[out.length-1][1]+= letter;
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
    /**
     * Function initializes `Date` from `DateArray`.
     * @method toDate
     * @for $time.{namespace}
     * @public
     * @param {DateArray} date_array
     *  - See [toDateArray](#methods_toDateArray).
     * @returns {Date}
     */
    function toDate([ date, time, zone ]= []){
        if(!date) date= fromNow()[0];
        if(!time) time= "T00:00:00";
        if(!zone) zone= getTimeZoneOffsetString(date);
        if(zone==="CET") zone= getCETOffset([ date, time ]);
        return new Date(date+time+zone);
    }
    /**
     * It is wrapper arround [`Date.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString).
     * @method toLocaleString
     * @for $time.{namespace}
     * @public
     * @param {String} format_object_name
     *  - **Default: `"date_time"`**
     *  - name of predefined time/date combinations see [`format_objects`](#props_format_objects).
     * @param {Object} params
     *  - modificators for `Date.prototype.toLocaleString`
     * @param {String} params.locale
     *  - **Default: `internal_locale`**
     *  - see [`Date.prototype.toLocaleString` Parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString#Parameters).
     * @param {String} params.timeZone
     *  - **Default: `internal_zone`**
     *  - sets `timeZone` key in `options` see [`Date.prototype.toLocaleString` Parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString#Parameters).
     * @returns {Function}
     *  - **`date_array`&lt;DateArray&gt;`=>` &lt;String&gt;**
     *  - returns result of [`Date.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString);
     */
    function toLocaleString(format_object_name= "date_time", { locale= internal_locale, timeZone= internal_zone }= {}){
        return date_array=> toDate(date_array).toLocaleString(locale, generateTimeZoneFormatObject(timeZone, format_objects[format_object_name]));
    }
    function toRelative(reference_date_array){
        return date_array=> getRelative(getDiffMs(reference_date_array)(date_array));
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
    /**
     * Function generates text based on `format_string`, `locale` and `timeZone` from `DateArray`.
     * @method toString
     * @for $time.{namespace}
     * @public
     * @param {String} format_string
     *  - Placeholder for replace/generate final string (eg. "MM"===two digits month)
     *  - see [`getFormatObject`](#methods_getFormatObject)
     * @param {DateArray} params_obj
     *  - It is in fact argument for [`Date.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString)
     * @param {String} params_obj.locale
     *  - In which language/national format generate final string
     * @param {String} params_obj.timeZone
     *  - Time zone name from [`ary_ianna_time_zones`](#props_ary_ianna_time_zones).
     * @param {String} params_obj.declension
     *  - **default: true**
     *  - Needed for some languages — for example in Czech: "10. července" (`declension=true`), or "10. červenec" (`declension=false`)
     * @returns {Function}
     *  - `DateArray`=> **&lt;String&gt;**
     * @example
     *      $time.toStringFromObject("DD/MM/YYYY HH:mm:SS",{ locale: "en-GB" })($time.fromNow());//= "05/06/2019 09:32:20"
     */
    function toString(format_string, params_obj){
        return toStringFromObject(format_string ? getFormatObject(format_string) : false, params_obj);
    }
    /**
     * Similar to [`toString`](#methods_toString) generates string based on given format. But now based on existing predefined/cached formats see [`format_arrays`](#props_format_arrays).
     * @method toStringPreDefined
     * @for $time.{namespace}
     * @public
     * @param {String} format_name
     *  - **Default: `"YMDHms_2d"`**
     *  - See [`format_arrays`](#props_format_arrays).
     * @param {DateArray} params_obj
     *  - See [`toStringFromObject`](#methods_toStringFromObject).
     * @returns {Function}
     *  - **`date_array`&lt;DateArray&gt;=> &lt;String&gt;**
     * @example
     *      $time.toStringPreDefined("YMDHms_2d", { locale: "en-GB" })($time.fromNow());//= "2019-06-05 09:32:20"
     */
    function toStringPreDefined(format_name= "YMDHms_2d", params_obj= {}){
        return toStringFromObject(format_arrays[format_name], params_obj);
    }
    /* to_functions/toRelative *//* global getDiff, getRelative *///gulp.remove.line
    
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
    function getWeekNumber(date_instance){ /* calculates no. of thursdays from this week to the first one (January 4 is always in week 1.) */
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
    * @for $time.{namespace}
    * @public
    * @param {Number|String} time
    * @return {String}
    *  * 00, 01, 02, ..., 09, 10, ..., 100, ...
    */
    function double(n){
        n= String(n);
        return n.length===1 ? "0"+n : n;
    }
    function getDaysInMonth(month_number, year= (new Date()).getFullYear()){/* months indexing from 0 */
        return new Date(year, +month_number, 0 /* last in prev month */).getDate();
    }
    /**
    * @method getMonthName
    * @for $time.{namespace}
    * @public
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
     * See [`ordinal_numbers`](#props_ordinal_numbers).
     * @method getOrdinalSuffix
     * @for $time.{namespace}
     * @public
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
        /**
         * Alias for `undefined` which can be used to trigger default value of argument. (eg. `test($time._)==="A"; function test(a= "A"){ return a; }`)
         * @property {undefined} _
         * @public
         */
        _: undefined,
    
        fromNow, fromString, fromDate, fromDateArguments,
    
        toDate, toString, toStringPreDefined, toLocaleString, toRelative,
    
        getDiff, getRelative,
        getCETOffset, getTimeZoneOffset, getTimeZoneOffsetString, getTimeZone,
    
        Date: { getWeekDay, getWeekNumber, addDays, addMonths },
        setTimeZone, modify,
    
        /* backward compatibility */ double, getOrdinalSuffix, getMonthName,
        getDaysInMonth,
    
        getTimeZones: ()=> ary_ianna_time_zones, isTimeZone: candidate=> ary_ianna_time_zones.indexOf(candidate)!==-1,
        setInternalZone: zone=> internal_zone= zone, setInternalLocale: locale=> internal_locale= locale
    };
})();