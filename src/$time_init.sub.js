/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
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
 *  - `YMDHms_2d`: shows **"YYYY-MM-DD HH:mm:ss"**
 *  - `Hms_2d`: shows **"HH:mm:ss"**
 * @property {Object} format_arrays
 * @private
 * @for $time.{namespace}
 */
    format_arrays= (({ dash, colon, space, two_dig })=>({
        YMD_2d: [ ["year", "numeric"], dash, ["month", two_dig], dash, ["day", two_dig] ],
        Hms_2d: [ ["hour", two_dig, "h23"], colon, ["minute", two_dig], colon, ["second", two_dig] ],
        YMDHms_2d: [ ["year", "numeric"], dash, ["month", two_dig], dash, ["day", two_dig], space, ["hour", two_dig, "h23"], colon, ["minute", two_dig], colon, ["second", two_dig] ]
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