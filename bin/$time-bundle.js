/* jshint esversion: 6,-W097, -W040, browser: true, node: true, expr: true, undef: true, maxparams: 8, maxdepth: 3, maxcomplexity: 17, maxparams: 8 */

/**
 * @module jaaJSU
 */
/* global define, self */
(function (root, factory) {
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
}(typeof self !== 'undefined' ? self : this, function (/* ..._dependencies */) {
    "use strict";
    var _dependencies= Array.prototype.slice.call(arguments);
    /**
     * This NAMESPACE provides features for date/time. Mainly, there are utilities using **Date** class and feature [`Date.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString).
     * @namespace $time
     * @version 1.0.0
     * @see {@link https://github.com/jaandrle/dollar_time}
     * @category namespaces
     */
    const /* internal store */
        format_objects= (({ time, date, seconds })=>({
        /**
         * Internal object holding predefined formating arguments for {@link module:jaaJSU~$time.toLocaleString}.
         * @namespace format_objects
         * @private
         * @readonly
         * @property {Object} time shows combination of 2-digits hour and minutes
         * @property {Object} time_seconds shows combination of `time` and seconds
         * @property {Object} date shows combination of 2-digits day, month and full year
         * @property {Object} date_time shows combination of `time` and `date`
         * @property {Object} date_time_seconds shows combination of `date_time` and `seconds`
         * @memberof module:jaaJSU~$time
         * @example
         * format_objects.time==={ hour: "2-digit", minute: "2-digit" }
         */
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
        /**
         * Internal object holding predefined formating arguments for {@link module:jaaJSU~$time.getFormatObject}.
         * @namespace format_arrays
         * @private
         * @readonly
         * @property {module:jaaJSU~$time~ArrayOfOperation[]} SQL_DATE Generate format of **"YYYY-MM-DD"**
         * @property {module:jaaJSU~$time~ArrayOfOperation[]} SQL Generate format of **"YYYY-MM-DD HH:mm:ss"**
         * @property {module:jaaJSU~$time~ArrayOfOperation[]} SQL_TIME Generate format of **"HH:mm:ss"**
         * @memberof module:jaaJSU~$time
         * @example
         * format_arrays.YYYYMMDD=== [ ["year", "numeric"], [ "text", "-" ], ["month", "2-digit"], [ "text", "-" ], ["day", "2-digit"] ]
         */
            SQL_DATE: [ ["year", "numeric"], dash, ["month", two_dig], dash, ["day", two_dig] ],
            SQL_TIME: [ ["hour", two_dig, "h23"], colon, ["minute", two_dig], colon, ["second", two_dig] ],
            SQL: [ ["year", "numeric"], dash, ["month", two_dig], dash, ["day", two_dig], space, ["hour", two_dig, "h23"], colon, ["minute", two_dig], colon, ["second", two_dig] ]
        }))({
            dash: [ "text", "-" ],
            colon: [ "text", ":" ],
            space: [ "text", " " ],
            two_dig: "2-digit"
        }),
        /**
         * Internal helper array for {@link module:jaaJSU~$time.getOrdinalSuffix}.
         * @property {Array} ordinal_numbers
         * @private
         * @readonly
         * @memberof module:jaaJSU~$time
         */
        ordinal_numbers= [ "th", "st", "nd", "rd" ];
    const /* validation functions */
    /**
     * Very simple test for 'YYYY-MM-DD' pattern. Returns `true` if `date_string` includes **`-`**.
     * @method isDateString
     * @memberof module:jaaJSU~$time
     * @private
     * @param {String|...String} date_string
     * @returns {Boolean}
     * @example
     * isDateString("2019-05-06");//= true
     * isDateString("06/05/2019");//= false !!!!
     */
        isDateString= date_string=> date_string.indexOf("-")!==-1,
    /**
     * Very simple test for 'T...' pattern. Returns `true` if `date_string` includes **`T`**.
     * @method isTimeString
     * @memberof module:jaaJSU~$time
     * @private
     * @param {String|...String} date_string
     * @returns {Boolean}
     * @example
     * isTimeString("T12:00:00");//= true
     * isTimeString("12:00:00");//= false !!!
     * isTimeString("Twrong");//= true !!!!
     */
        isTimeString= date_string=> date_string.indexOf("T")!==-1;
    let /* internal variables*/
        internal_locale= "en-GB",
        internal_zone= "";
    /**
     * This array stores all time zones names (eg. 'Europe/Andorra') supported by `{ timeZone: ... }` in second argument of `Date.prototype.toLocaleString`.
     * 
     * Original from [stackoverflow.com/a/54500197](https://stackoverflow.com/a/54500197).
     * @property {Array} ary_ianna_time_zones
     * @private
     * @readonly
     * @memberof module:jaaJSU~$time
     */
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
    
    /**
     * Function generates `DateArray` from instance of `Date`.
     * @method fromDate
     * @memberof module:jaaJSU~$time
     * @public
     * @param {Date} date_instance instance of `Date` class
     * @returns {module:jaaJSU~$time~DateArray}
     */
    function fromDate(date_instance){
        return toDateArray(date_instance.toISOString());
    }
    /**
     * Function generates `DateArray` from arguments to initialize `Date`.
     * @method fromDateArguments
     * @memberof module:jaaJSU~$time
     * @public
     * @param {...Mixed} args parameters for initialize `Date` class
     * @returns {module:jaaJSU~$time~DateArray}
     */
    function fromDateArguments(...args){
        return toDateArray((args.filter(d=> typeof d!=="undefined").length ? new Date(...args) : new Date()).toISOString());
    }
    /**
     * Function generates `DateArray` from current date and time.
     * 
     * **Warning:** Internally uses `toISOString` method so result is always converted to "+00:00": `p($time.fromNow, $time.setTimeZone("+02:00"), $time.toString())()` (`p` is some pipe function) — this returns "2019-07-10T16:48:43+02:00" instead of "2019-07-10T18:48:43+02:00" (current time) … the flow is "2019-07-10T18:48:43+02:00"-`fromNow`->"2019-07-10T16:48:43Z"-`setTimeZone`->"2019-07-10T16:48:43+02:00".
     * @method fromNow
     * @memberof module:jaaJSU~$time
     * @public
     * @returns {module:jaaJSU~$time~DateArray}
     */
    function fromNow(){
        return toDateArray((new Date()).toISOString());
    }
    /**
     * Function generates `DateArray` from passed string.
     * @method fromString
     * @memberof module:jaaJSU~$time
     * @public
     * @param {String} [timestamp_string] If `undefined` returns result of {@link module:jaaJSU~$time.fromNow}, else it is used {@link module:jaaJSU~$time.toDateArray} for parsing.
     * @param {String} [timezone= internal_zone] Default timezone — uses if is not setted in `timestamp_string`
     * @returns {module:jaaJSU~$time~DateArray}
     */
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
    /**
     * This is in fact output of {@link module:jaaJSU~$time.toDateArray}.
     * @typedef {Array} DateArray
     * @memberof module:jaaJSU~$time
     * @category types descriptions
     * @inner
     * @property {String} [date=""] is always in form of "YYYY-MM-DD" or ""
     * @property {String} [time=""] is always in form of "HH:mm:SS" or "HH:mm:00" or ""
     * @property {String} [time_zone=""] is always in form of "[+-]\d\d:\d\d" or "CET" or ""
     */
    /**
     * Function generates array in a form `[ date, time, time_zone ]` from 'ISO' like string.
     * @method toDateArray
     * @memberof module:jaaJSU~$time
     * @private
     * @param {String} timestamp_string
     *  <br/>- Supported forms are combinations of date ("YYYY-MM-DD", "DD/MM/YYYY"), time ("HH:mm:ss", "HH:mm") and timezone ("CET", "+01:00", "-02:00", ...)
     *  <br/>- Typically: "2019-06-02 12:35:45 +01:00", "2019-06-02T12:35:45+01:00", "12:35:45+01:00 2019-06-02", ...
     * @returns {module:jaaJSU~$time~DateArray}
     */
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
    /**
     * It is in fact argument for `options` in [`Date.prototype.toLocaleString` Parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString#Parameters).
     * @typedef {Object} toLocaleStringOptions
     * @memberof module:jaaJSU~$time
     * @category types descriptions
     * @inner
     * @property {String} [locale=internal_locale] In which language/national format generate final string
     * @property {String} [timeZone=internal_zone] Time zone name from [`ary_ianna_time_zones`](#props_ary_ianna_time_zones).
     * @property {Boolean} [declension=true] Needed for some languages — for example in Czech: "10. července" (`declension=true`), or "10. červenec" (`declension=false`)
     */
    /**
     * Function generates text based on `format`, `locale` and `timeZone` from `DateArray`.
     * @method toStringFromObject
     * @memberof module:jaaJSU~$time
     * @private
     * @param {module:jaaJSU~$time~ArrayOfOperation[]} format
     * @param {module:jaaJSU~$time~toLocaleStringOptions} params_obj
     * @returns {module:jaaJSU~$time~function_DateArray2String}
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
     * This holds information about how show one piece of String output typically for {@link module:jaaJSU~$time.toString}.
     * 
     * Predefined values can be found at {@link module:jaaJSU~$time.format_arrays}.
     * @typedef {Array} ArrayOfOperation
     * @memberof module:jaaJSU~$time
     * @category types descriptions
     * @inner
     * @property {String} operation In fact names of keys in [`Date.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) (i. e. "weekday", "month") or "text".
     * @property {String} argument In fact value of given key in [`Date.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) (i. e. "2-digit", "numeric").
     * @property {String} params Some additional information/modifications like "two_letters", "ordinal_number", ….
     */
    
    /**
     * Generates multidimensional array for formatting (eg. "YYYY"=> `[ [ "year", "numeric" ] ]`).
     * @method getFormatObject
     * @memberof module:jaaJSU~$time
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
     * @returns {module:jaaJSU~$time~ArrayOfOperation[]}
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
    /**
     * Function initializes `Date` from `DateArray`.
     * @method toDate
     * @memberof module:jaaJSU~$time
     * @public
     * @param {module:jaaJSU~$time~DateArray} [date_array] Defaults to 'now' (or use current `date`/`time`/`zone` if not filled).
     * @returns {Date}
     */
    function toDate(date_array){
        if(!date_array||!Array.isArray(date_array)) return new Date();
        
        let [ date, time, zone ]= date_array;
        if(!date) date= fromNow()[0];
        if(!time) time= "T00:00:00";
        if(!zone) zone= getTimeZoneOffsetString(date);
        if(zone==="CET"||zone==="CEST") zone= getCETOffset([ date, time ]);
        return new Date(date+time+zone);
    }
    /**
     * It is wrapper arround [`Date.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString).
     * @method toLocaleString
     * @memberof module:jaaJSU~$time
     * @public
     * @param {String} [format_object_name="date_time"] name of predefined time/date combinations see {@link module:jaaJSU~$time.format_objects}.
     * @param {module:jaaJSU~$time~toLocaleStringOptions} [toLocaleStringOptions]
     * @returns {module:jaaJSU~$time~function_DateArray2String} returns result of [`Date.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString);
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
     * @function function_DateArray2String
     * @memberof module:jaaJSU~$time
     * @category types descriptions
     * @inner
     * @param {module:jaaJSU~$time~DateArray} date_array
     * @returns {String}
     */
    /**
     * Function generates text based on `format`, `locale` and `timeZone` from `DateArray`.
     * @method toString
     * @memberof module:jaaJSU~$time
     * @public
     * @param {String|module:jaaJSU~$time~ArrayOfOperation[]} [format=$time.formats.SQL]
     * <br/>- Placeholder for replace/generate final string (eg. "MM"===two digits month) — see {@link module:jaaJSU~$time.getFormatObject}.
     * <br/>- Or lists of predefined formats — see {@link module:jaaJSU~$time.formats}.
     * @param {module:jaaJSU~$time~toLocaleStringOptions} [toLocaleStringOptions]
     * @returns {module:jaaJSU~$time~function_DateArray2String}
     * @example
     * $time.toString("DD/MM/YYYY HH:mm:SS",{ locale: "en-GB" })($time.fromNow());//= "05/06/2019 09:32:20"
     * $time.toString($time.formats.SQL)($time.fromNow());//= "2019-06-05 09:32:20"
     */
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
    /**
     * @method getTimeZone
     * @memberof module:jaaJSU~$time
     * @param {module:jaaJSU~$time~DateArray} date
     * @param {Object} parameters
     * @param {String} [parameters.locale=internal_locale]
     * @param {String} [parameters.description="long"] The representation of the time zone name. Possible values are:
     * <br/>- `"none"` skip description
     * <br/>- `"long"` (e.g., `British Summer Time`)
     * <br/>- `"short"` (e.g., `GMT+1`)
     * @param {String} [parameters.offset=false] show offset part: `"UTC+01:00 (…)"` or `"UTC+01:00"` (if `description="none"`)
     * @returns {String} Timezone name/identificator (with offset)
     */
    function getTimeZone(date, { locale= internal_locale, description= "long", offset= false }= {}){
        description= description.toLocaleLowerCase();
        const [ date_part, time_part, offset_part ]= getDateArrayFromMixed(date), date_instance= new Date([ date_part, time_part, offset_part ].join(""));
        const locale_param= Object.keys(ary_ianna_time_offsets).indexOf(offset_part)!==-1 ? { timeZone: ary_ianna_time_zones[ary_ianna_time_offsets[offset_part]] } : {};
        let out_description= description==="none" ? "" : date_instance.toLocaleString(locale, Object.assign({ timeZoneName: description }, locale_param)).replace(date_instance.toLocaleString(locale, locale_param), "").trim();
        const out_offset= !offset ? "" : "UTC"+(offset_part==="Z" ? getTimeZoneOffsetStringFromOffset(date_instance.getTimezoneOffset()) : date_instance.toLocaleString(locale, Object.assign({ timeZoneName: "short" }, locale_param)).replace(date_instance.toLocaleString(locale, locale_param), "").replace(/[^\d\+\-\:]/g, "").trim());
        if(out_description&&out_offset) out_description= " ("+out_description+")";
        return out_offset+out_description;
    }
    /**
     * @method getCurrentTimeZone
     * @memberof module:jaaJSU~$time
     * @param {Object} parameters
     * @param {String} [parameters.locale=internal_locale]
     * @param {String} [parameters.description="long"] The representation of the time zone name. Possible values are:
     * <br/>- `"none"` skip description
     * <br/>- `"long"` (e.g., `British Summer Time`)
     * <br/>- `"short"` (e.g., `GMT+1`)
     * <br/>- `"ianna"`/`"IANNA"` (e.g. `Europe/Prague`): `locale` has no effect for this
     * @param {String} [parameters.offset=false] show offset part: `"UTC+01:00 (…)"` or `"UTC+01:00"` (if `description="none"`)
     * @returns {String} Timezone name/identificator (with offset) for current timezone
     */
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
    
    /**
     * @function function_Date2Date
     * @memberof module:jaaJSU~$time
     * @category types descriptions
     * @inner
     * @param {Date} date_instance
     * @returns {Date}
     */
    /**
     * @function function_Date2Number
     * @memberof module:jaaJSU~$time
     * @category types descriptions
     * @inner
     * @param {Date} date_instance
     * @returns {Number}
     */
    /**
     * This modify given **Date** instance (add days).
     * @method addDays
     * @memberof module:jaaJSU~$time.Date_utils
     * @public
     * @param {Number} days_num How many days to add to `date_instance`
     * @returns {module:jaaJSU~$time~function_Date2Date}
     * */
    function addDays(days_num){
        return date_instance=> (date_instance.setDate(date_instance.getDate()+days_num), date_instance);
    }
    /**
     * This modify given **Date** instance (add months).
     * @method addMonths
     * @memberof module:jaaJSU~$time.Date_utils
     * @public
     * @param {Number} months_num How many months to add to `date_instance`
     * @returns {module:jaaJSU~$time~function_Date2Date}
     * */
    function addMonths(months_num){
        return date_instance=> (date_instance.setMonth(date_instance.getMonth()+months_num), date_instance);
    }
    /**
     * @method getWeekDay
     * @memberof module:jaaJSU~$time.Date_utils
     * @public
     * @param {String} [type="numeric"] Show week numebr by default or se `weekday` in **MDN** see {@link module:jaaJSU~$time~toLocaleStringOptions}
     * @param {module:jaaJSU~$time~toLocaleStringOptions} [toLocaleStringOptions] Key `declension` is redutant for this function
     * @returns {module:jaaJSU~$time~function_Date2Number} If `type="numeric"`, it returns **0 (Su) - 6 (Sa)**, else it returns **name of week day**
     * */
    function getWeekDay(type= "numeric", { locale= internal_locale, timeZone= internal_zone }= {}){
        return type==="numeric" ? date_instance=> date_instance.getDay() : date_instance=> date_instance.toLocaleString(locale, timeZone ? { timeZone, weekday: type } : { timeZone, weekday: type });
    }
    /**
     * This return ISO number of week.
     * @method getWeekNumber
     * @memberof module:jaaJSU~$time.Date_utils
     * @public
     * @param {Date} date_instance
     * @return {Number} In fact, it calculates no. of thursdays from this week to the first one (January 4 is always in week 1.)
     */
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
    /**
     * @function function_DateArray2DateArray
     * @memberof module:jaaJSU~$time
     * @category types descriptions
     * @inner
     * @param {module:jaaJSU~$time~DateArray} date_array
     * @returns {module:jaaJSU~$time~DateArray}
     */
    
    /**
     * Curried method, first invocation sets operations (i. e. `{ addDay: 1 }`) and returns `function_DateArray2DateArray`.
     * @method modify
     * @memberof module:jaaJSU~$time
     * @public
     * @param {Object} mod_obj &nbsp;
     * <br/>- object literal representing requested operations
     * <br/>- use name convention like [setters for `Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#Setter) (only one argument is allowed)
     * <br/>- supports also *add\** commands with the same notation ("setMonth" => "addMonth")
     * <br/>- **IMPORTANT NOTE:** There are three behaviour changes
     * <br/>&nbsp;&nbsp;&nbsp;&nbsp;- "setMonth" is indexed from 1 (instead of 0)
     * <br/>&nbsp;&nbsp;&nbsp;&nbsp;- for "setDate" there is alias "setDay"
     * <br/>&nbsp;&nbsp;&nbsp;&nbsp;- for "addDate" there is alias "addDays"
     * <br/>- Some operations: **"\*Date"** (or **"setDay"**, **"addDays"**), **"\*Month"**, **"\*FullYear"**, **"\*Hours"**, **"\*Minutes"**, **"\*Seconds"**
     * @returns {module:jaaJSU~$time~function_DateArray2DateArray}
     */
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
    /**
     * Helper method for invoking "add*" operations in [`modify`](#methods_modify).
     * 
     * In general `d.set...(d.get...+${value})` (where `d` is instance of `Date`).
     * @method modifyAdditions
     * @memberof module:jaaJSU~$time
     * @private
     * @param {String} operation e.g. "addMonth"
     * @param {Number} value mainly argument (number) for 
     * @param {Date} dateObject instance of `Date`
     * @returns {Date} returns `dateObject`
     */
    function modifyAdditions(operation, value, dateObject){
        const cmd= operation.substr(3); /* addMonth=> ...Month => (set/get)Month */
        dateObject["set"+cmd](dateObject["get"+cmd]()+value);
        return dateObject;
    }
    function redefineTimeZone(zone= internal_zone){
        return ([ date= "", time= "" ]= [])=> [ date, time, zone ];
    }
    /**
     * Utility workings with native Date
     * @namespace Date_utils
     * @memberof module:jaaJSU~$time
     * @readonly
     */
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
    
    /**
     * Alias for `undefined` which can be used to trigger default value of argument.
     * @property {undefined} _
     * @memberof module:jaaJSU~$time
     * @public
     * @example
     * test($time._)==="A"; function test(a= "A"){ return a; }
     */
    const _= void(0);
    /**
     * Public name of {@link module:jaaJSU~$time.format_arrays}.
     * @namespace formats
     * @alias module:jaaJSU~$time.format_arrays
     * @memberof module:jaaJSU~$time
     * @readonly
     * @static
     */
    const formats= format_arrays;
    
    const getTimeZones= ()=> ary_ianna_time_zones;
    const isTimeZone= candidate=> ary_ianna_time_zones.indexOf(candidate)!==-1;
    const setInternalZone= zone=> internal_zone= zone;
    const setInternalLocale= locale=> internal_locale= locale;
    return { fromDate, fromDateArguments, fromNow, fromString, toDate, toLocaleString, toRelative, getDiff, getRelative, toString, getCETOffset, getTimeZone, getCurrentTimeZone, getTimeZoneOffset, getTimeZoneOffsetString, modify, redefineTimeZone, Date_utils, double, daysInMonth, getDaysInMonth, getMonthName, getOrdinalSuffix, _, formats, getTimeZones, isTimeZone, setInternalZone, setInternalLocale };
}));