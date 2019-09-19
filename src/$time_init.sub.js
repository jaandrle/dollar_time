/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
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