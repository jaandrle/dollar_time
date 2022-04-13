/**
 * This namespace provides features for date/time. Mainly, there are utilities using **Date** class and feature [`Date.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString).
 * @version gulp_place("app.version", "eval_out")
 * @see {@link gulp_place("app.homepage", "eval_out")}
 */
declare namespace $time{
    /**
     * @private
     */
    type Values<T>= T[keyof T];
    /**
     * @private
     */
    type format_object= { [P in keyof Intl.DateTimeFormatOptions]: Intl.DateTimeFormatOptions[P] };
    /**
     * Internal object holding predefined formating arguments for {@link toLocaleString}. See {@link Intl.DateTimeFormatOptions}.
     * ```javascript
     * format_objects.time==={ hour: "2-digit", minute: "2-digit" }
     * ```
     * @private
     */
    interface format_objects{
        /**
         * shows combination of 2-digits hour and minutes
         */
        time: format_object,
        /**
         * shows combination of `time` and seconds
         */
        time_seconds: format_object,
        /**
         * shows combination of 2-digits day, month and full year
         */
        date: format_object,
        /**
         * shows combination of `time` and `date`
         */
        date_time: format_object,
        /**
         * shows combination of `date_time` and `seconds`
         */
        date_time_seconds: format_object
    }
    /**
     * @private
     */
    type OperationTypes= keyof Intl.DateTimeFormatOptions | "text";
    /**
     * First two items represents key/value of [`Date.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) (i. e. "weekday", "month") or "text".
     * Last item reprezents internal manipulations:
     * <br/>- "ordinal_number": Include suffix – **only English supported**
     * <br/>- "two_letters": 1→01, …
     * @private
     */
    type ArrayOfOperation<O extends OperationTypes>= [
        O,
        O extends keyof Intl.DateTimeFormatOptions ? Intl.DateTimeFormatOptions[O] : string,
        undefined | "ordinal_number" | "two_letters"
    ];
    /**
     * @private
     */
    type ArrayOfOperations= ArrayOfOperation<OperationTypes>[];
    /**
     * Exported as {@link formats}.
     * 
     * Internal object holding predefined formating arguments for {@link getFormatObject}.
     * ```javascript
     * format_arrays.YYYYMMDD=== [ ["year", "numeric"], [ "text", "-" ], ["month", "2-digit"], [ "text", "-" ], ["day", "2-digit"] ]
     * ```
     * @private
     */
    interface format_arrays{
        /**
         * Generate format of **"YYYY-MM-DD"**
         */
        SQL_DATE: ArrayOfOperations,
        /**
         * Generate format of **"YYYY-MM-DD HH:mm:ss"**
         */
        SQL: ArrayOfOperations,
        /**
         * Generate format of **"HH:mm:ss"**
         */
        SQL_TIME: ArrayOfOperations
    }
    /**
     * Predefined formats for {@link toString}.
     * @category Public
     */
    const formats: format_arrays;
    /**
     * Alias for `undefined` which can be used to trigger default value of argument.
     * @category Public
     */
    const _: undefined;
    /**
     * Internal helper array for {@link getOrdinalSuffix}.
     * @private
     */
    type ordinal_numbers= Array<"th"|"st"|"nd"|"rd">;
    /**
     * This array stores all time zones names (eg. 'Europe/Andorra') supported by `{ timeZone: ... }` in second argument of `Date.prototype.toLocaleString`.
     * 
     * Original from [stackoverflow.com/a/54500197](https://stackoverflow.com/a/54500197).
     * @private
     */
    type ary_ianna_time_zones=
        'Africa/Abidjan' | 'Africa/Accra' | 'Africa/Algiers' | 'Africa/Bissau' | 'Africa/Cairo' | 'Africa/Casablanca' | 'Africa/Ceuta' | 'Africa/El_Aaiun' | 'Africa/Johannesburg' | 'Africa/Juba' | 'Africa/Khartoum' | 'Africa/Lagos' | 'Africa/Maputo' | 'Africa/Monrovia' | 'Africa/Nairobi' | 'Africa/Ndjamena' | 'Africa/Sao_Tome' | 'Africa/Tripoli' | 'Africa/Tunis' | 'Africa/Windhoek' | 'America/Adak' | 'America/Anchorage' | 'America/Araguaina' | 'America/Argentina/Buenos_Aires' | 'America/Argentina/Catamarca' | 'America/Argentina/Cordoba' | 'America/Argentina/Jujuy' | 'America/Argentina/La_Rioja' | 'America/Argentina/Mendoza' | 'America/Argentina/Rio_Gallegos' | 'America/Argentina/Salta' | 'America/Argentina/San_Juan' | 'America/Argentina/San_Luis' | 'America/Argentina/Tucuman' | 'America/Argentina/Ushuaia' | 'America/Asuncion' | 'America/Atikokan' | 'America/Bahia_Banderas' | 'America/Bahia' | 'America/Barbados' | 'America/Belem' | 'America/Belize' | 'America/Blanc-Sablon' | 'America/Boa_Vista' | 'America/Bogota' | 'America/Boise' | 'America/Cambridge_Bay' | 'America/Campo_Grande' | 'America/Cancun' | 'America/Caracas' | 'America/Cayenne' | 'America/Costa_Rica' | 'America/Creston' | 'America/Cuiaba' | 'America/Curacao' | 'America/Danmarkshavn' | 'America/Dawson_Creek' | 'America/Dawson' | 'America/Denver' | 'America/Detroit' | 'America/Edmonton' | 'America/Eirunepe' | 'America/El_Salvador' | 'America/Fort_Nelson' | 'America/Fortaleza' | 'America/Glace_Bay' | 'America/Godthab' | 'America/Goose_Bay' | 'America/Grand_Turk' | 'America/Guatemala' | 'America/Guayaquil' | 'America/Guyana' | 'America/Halifax' | 'America/Havana' | 'America/Hermosillo' | 'America/Chicago' | 'America/Chihuahua' | 'America/Indiana/Indianapolis' | 'America/Indiana/Knox' | 'America/Indiana/Marengo' | 'America/Indiana/Petersburg' | 'America/Indiana/Tell_City' | 'America/Indiana/Vevay' | 'America/Indiana/Vincennes' | 'America/Indiana/Winamac' | 'America/Inuvik' | 'America/Iqaluit' | 'America/Jamaica' | 'America/Juneau' | 'America/Kentucky/Louisville' | 'America/Kentucky/Monticello' | 'America/La_Paz' | 'America/Lima' | 'America/Los_Angeles' | 'America/Maceio' | 'America/Managua' | 'America/Manaus' | 'America/Martinique' | 'America/Matamoros' | 'America/Mazatlan' | 'America/Menominee' | 'America/Merida' | 'America/Metlakatla' | 'America/Mexico_City' | 'America/Miquelon' | 'America/Moncton' | 'America/Monterrey' | 'America/Montevideo' | 'America/Nassau' | 'America/New_York' | 'America/Nipigon' | 'America/Nome' | 'America/Noronha' | 'America/North_Dakota/Beulah' | 'America/North_Dakota/Center' | 'America/North_Dakota/New_Salem' | 'America/Ojinaga' | 'America/Panama' | 'America/Pangnirtung' | 'America/Paramaribo' | 'America/Phoenix' | 'America/Port_of_Spain' | 'America/Port-au-Prince' | 'America/Porto_Velho' | 'America/Puerto_Rico' | 'America/Punta_Arenas' | 'America/Rainy_River' | 'America/Rankin_Inlet' | 'America/Recife' | 'America/Regina' | 'America/Resolute' | 'America/Rio_Branco' | 'America/Santarem' | 'America/Santiago' | 'America/Santo_Domingo' | 'America/Sao_Paulo' | 'America/Scoresbysund' | 'America/Sitka' | 'America/St_Johns' | 'America/Swift_Current' | 'America/Tegucigalpa' | 'America/Thule' | 'America/Thunder_Bay' | 'America/Tijuana' | 'America/Toronto' | 'America/Vancouver' | 'America/Whitehorse' | 'America/Winnipeg' | 'America/Yakutat' | 'America/Yellowknife' | 'Antarctica/Casey' | 'Antarctica/Davis' | 'Antarctica/Macquarie' | 'Antarctica/Mawson' | 'Antarctica/Palmer' | 'Antarctica/Rothera' | 'Antarctica/Syowa' | 'Antarctica/Troll' | 'Antarctica/Vostok' | 'Asia/Almaty' | 'Asia/Amman' | 'Asia/Anadyr' | 'Asia/Aqtau' | 'Asia/Aqtobe' | 'Asia/Ashgabat' | 'Asia/Atyrau' | 'Asia/Baghdad' | 'Asia/Baku' | 'Asia/Bangkok' | 'Asia/Barnaul' | 'Asia/Beirut' | 'Asia/Bishkek' | 'Asia/Brunei' | 'Asia/Colombo' | 'Asia/Damascus' | 'Asia/Dhaka' | 'Asia/Dili' | 'Asia/Dubai' | 'Asia/Dushanbe' | 'Asia/Famagusta' | 'Asia/Gaza' | 'Asia/Hebron' | 'Asia/Ho_Chi_Minh' | 'Asia/Hong_Kong' | 'Asia/Hovd' | 'Asia/Chita' | 'Asia/Choibalsan' | 'Asia/Irkutsk' | 'Asia/Jakarta' | 'Asia/Jayapura' | 'Asia/Jerusalem' | 'Asia/Kabul' | 'Asia/Kamchatka' | 'Asia/Karachi' | 'Asia/Kathmandu' | 'Asia/Khandyga' | 'Asia/Kolkata' | 'Asia/Krasnoyarsk' | 'Asia/Kuala_Lumpur' | 'Asia/Kuching' | 'Asia/Macau' | 'Asia/Magadan' | 'Asia/Makassar' | 'Asia/Manila' | 'Asia/Nicosia' | 'Asia/Novokuznetsk' | 'Asia/Novosibirsk' | 'Asia/Omsk' | 'Asia/Oral' | 'Asia/Pontianak' | 'Asia/Pyongyang' | 'Asia/Qatar' | 'Asia/Qyzylorda' | 'Asia/Riyadh' | 'Asia/Sakhalin' | 'Asia/Samarkand' | 'Asia/Seoul' | 'Asia/Shanghai' | 'Asia/Singapore' | 'Asia/Srednekolymsk' | 'Asia/Taipei' | 'Asia/Tashkent' | 'Asia/Tbilisi' | 'Asia/Tehran' | 'Asia/Thimphu' | 'Asia/Tokyo' | 'Asia/Tomsk' | 'Asia/Ulaanbaatar' | 'Asia/Urumqi' | 'Asia/Ust-Nera' | 'Asia/Vladivostok' | 'Asia/Yakutsk' | 'Asia/Yangon' | 'Asia/Yekaterinburg' | 'Asia/Yerevan' | 'Atlantic/Azores' | 'Atlantic/Bermuda' | 'Atlantic/Canary' | 'Atlantic/Cape_Verde' | 'Atlantic/Faroe' | 'Atlantic/Madeira' | 'Atlantic/Reykjavik' | 'Atlantic/South_Georgia' | 'Atlantic/Stanley' | 'Australia/Adelaide' | 'Australia/Brisbane' | 'Australia/Broken_Hill' | 'Australia/Currie' | 'Australia/Darwin' | 'Australia/Eucla' | 'Australia/Hobart' | 'Australia/Lindeman' | 'Australia/Lord_Howe' | 'Australia/Melbourne' | 'Australia/Perth' | 'Australia/Sydney' |
        'Europe/Amsterdam' | 'Europe/Andorra' | 'Europe/Astrakhan' | 'Europe/Athens' | 'Europe/Belgrade' | 'Europe/Berlin' | 'Europe/Brussels' | 'Europe/Budapest' | 'Europe/Bucharest' | 'Europe/Copenhagen' | 'Europe/Dublin' | 'Europe/Gibraltar' | 'Europe/Helsinki' | 'Europe/Chisinau' | 'Europe/Istanbul' | 'Europe/Kaliningrad' | 'Europe/Kiev' | 'Europe/Kirov' | 'Europe/Lisbon' | 'Europe/London' | 'Europe/Luxembourg' | 'Europe/Madrid' | 'Europe/Malta' | 'Europe/Minsk' | 'Europe/Monaco' | 'Europe/Moscow' | 'Europe/Oslo' | 'Europe/Paris' | 'Europe/Prague' | 'Europe/Riga' | 'Europe/Rome' | 'Europe/Samara' | 'Europe/Saratov' | 'Europe/Simferopol' | 'Europe/Sofia' | 'Europe/Stockholm' | 'Europe/Tallinn' | 'Europe/Tirane' | 'Europe/Ulyanovsk' | 'Europe/Uzhgorod' | 'Europe/Vienna' | 'Europe/Vilnius' | 'Europe/Volgograd' | 'Europe/Warsaw' | 'Europe/Zaporozhye' | 'Europe/Zurich' |
        'Indian/Cocos' | 'Indian/Chagos' | 'Indian/Christmas' | 'Indian/Kerguelen' | 'Indian/Mahe' | 'Indian/Maldives' | 'Indian/Mauritius' | 'Indian/Reunion' |
        'Pacific/Apia' | 'Pacific/Auckland' | 'Pacific/Bougainville' | 'Pacific/Easter' | 'Pacific/Efate' | 'Pacific/Enderbury' | 'Pacific/Fakaofo' | 'Pacific/Fiji' | 'Pacific/Funafuti' | 'Pacific/Galapagos' | 'Pacific/Gambier' | 'Pacific/Guadalcanal' | 'Pacific/Guam' | 'Pacific/Honolulu' | 'Pacific/Chatham' | 'Pacific/Chuuk' | 'Pacific/Kiritimati' | 'Pacific/Kosrae' | 'Pacific/Kwajalein' | 'Pacific/Majuro' | 'Pacific/Marquesas' | 'Pacific/Nauru' | 'Pacific/Niue' | 'Pacific/Norfolk' | 'Pacific/Noumea' | 'Pacific/Pago_Pago' | 'Pacific/Palau' | 'Pacific/Pitcairn' | 'Pacific/Pohnpei' | 'Pacific/Port_Moresby' | 'Pacific/Rarotonga' | 'Pacific/Tahiti' | 'Pacific/Tarawa' | 'Pacific/Tongatapu' | 'Pacific/Wake' | 'Pacific/Wallis';
    /**
     * This object stores offsets in `ary_ianna_time_zones` (time offsets as keys) and one corresponding index.
     * 
     * So for exmple, `ary_ianna_time_offsets["-01:00"]` is equal to **238** which is index of `ary_ianna_time_zones[238]==='Atlantic/Cape_Verde'` (always "-01:00").
     * 
     * @private
     */
    type ary_ianna_time_offsets= {
        '-01:00': 238, '-02:00': 242, '-03:00': 107, '-04:00': 49, '-05:00': 92, '-06:00': 62, '-07:00': 120, '-08:00': 337, '-09:00': 320, '-09:30': 330, '-10:00': 323, '-11:00': 332,
        '+01:00': 15, '+02:00': 8, '+03:00': 270, '+04:00': 306, '+04:30': 191, '+05:00': 221, '+05:30': 173, '+05:45': 194, '+06:00': 207, '+06:30': 232, '+07:00': 182, '+08:00': 220, '+08:30': 210, '+08:45': 249, '+09:00': 176, '+09:30': 248, '+10:00': 229, '+11:00': 314, '+12:00': 345, '+13:00': 316, '+14:00': 326 };
    /**
     * This object stores offsets in `ary_ianna_time_zones` (timezone id as keys) and one corresponding index.
     * 
     * So for exmple, `ary_ianna_time_offsets["CET"]` is equal to **284** which is index of `ary_ianna_time_zones[284]==='Europe/Prague'` (in winter "+01:00" and in summer "+02:00").
     * 
     * **IMPORTANT NOTE:** BST, EET, WET hasn't been validated! … idea is to behave the same way like CET
     * @private
     */
    type ary_ianna_time_offsets_keyed= {
        BST: 275, CET: 284, CEST: 284, EET: 264, EEST: 264, WET: 274, WEST: 274 };
    /**
     * `Array<string>` reprezentation of date/time:
     * ```text
     * [
     *   date: is always in form of "YYYY-MM-DD" or "",
     *   time: is always in form of "HH:mm:SS" or "HH:mm:00" or "",
     *   zone: is always in form of "[+-]\d\d:\d\d" or "CET" or ""
     * ]
     * ```
     * Valid examples:
     * ```javascript
     * [ "2019-06-02", "12:35:45", "CET" ]
     * [ "2019-06-02", "12:35:45", "" ]
     * [ "2019-06-02", "", "" ]
     * [ "", "12:35:45", "" ]
     * ```
     * @private
     */
    type DateArray= [ string, string, keyof ary_ianna_time_offsets | keyof ary_ianna_time_offsets_keyed | "" ];
    /**
     * Function generates `DateArray` from instance of `Date`.
     * ```javascript
     * $time.fromDate(new Date());
     * ```
     * @category Public
     */
    function fromDate(date_instance: Date): DateArray;
    /**
     * Function generates `DateArray` from passed string.
     * ```javascript
     * $time.fromString("2019-06-02 12:35:45 +01:00");
     * $time.fromString("2019-06-02");
     * $time.fromString("12:35:45");
     * //…
     * $time.fromString("2019-06-02T12:35:45+01:00");
     * //…
     * $time.fromString("12:35:45+01:00 2019-06-02")
     * //…
     * ```
     * @param timestamp_string If `undefined` returns result of {@link fromNow}. Otherwise, supported forms are combinations of date ("YYYY-MM-DD", "DD/MM/YYYY"), time ("HH:mm:ss", "HH:mm") and timezone ("CET", "+01:00", "-02:00", ...):
     * @category Public
     */
    function fromString(timestamp_string?: string, timezone?: ary_ianna_time_zones): DateArray;
    /**
     * Function generates `DateArray` from current date/time.
     * 
     * **Warning:** Internally uses `toISOString` method so result is always converted to "+00:00": `p($time.fromNow, $time.setTimeZone("+02:00"), $time.toString())()` (`p` is some pipe function) — this returns "2019-07-10T16:48:43+02:00" instead of "2019-07-10T18:48:43+02:00" (current time) … the flow is "2019-07-10T18:48:43+02:00"-`fromNow`->"2019-07-10T16:48:43Z"-`setTimeZone`->"2019-07-10T16:48:43+02:00".
     * @category Public
     */
    function fromNow(): DateArray;
    /**
     * In fact, internally uses {@link DateConstructor}. See [Date() constructor - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date).
     * @category Public
     */
    function fromDateArguments(): DateArray;
    function fromDateArguments(value: number | string): DateArray;
    function fromDateArguments(year: number, month: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number): DateArray;
    
    /**
     * See {@link Intl.UnicodeBCP47LocaleIdentifier} or [Intl - Locale identification and negotiation | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation).
     */
    type Intl_UnicodeBCP47LocaleIdentifier= string;
    /**
     * Defaults to `new Date()`, or if filled partialy defaults to current date/00:00:00/current zone.
     * @category Public
     */
    function toDate(date_array?: DateArray): Date;
    /**
     * It is in fact argument for `options` in [`Date.prototype.toLocaleString` Parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString#Parameters).
     * @private
     */
    interface toLocaleStringOptions{
        /**
         * ISO language identificator such as **"en-GB"** (default value)
         */
        locales?: Intl_UnicodeBCP47LocaleIdentifier,
        timeZone?: ary_ianna_time_zones,
        /**
         * Needed for some languages — for example in Czech: "10. července" (`declension=true`), or "10. červenec" (`declension=false`)
         * 
         * **Defaults to `true`**
         */
        declension?: boolean,
        /**
         * This provide handy way to change the default indexing for
         * - {@link toString} with `"d"` part and/or,
         * - {@link Date_utils.getWeekDay} – see also {@link Date.getDay}
         *
         * …primary for using in range [-1,infinity), for negative indices the final result is **increases by 7**
         * 
         * **Defaults to `0`**
         * 
         * *Examples:*
         * - `sunday_shift=-1` ⇒ `Mo=0,Tu=1,We=2,Th=3,Fr=4,Sa=5,Su=6`
         * - `sunday_shift=0` ⇒ `Mo=1,Tu=2,We=3,Th=4,Fr=5,Sa=6,Su=0`
         * - `sunday_shift=3` ⇒ `Mo=4,Tu=5,We=6,Th=7,Fr=8,Sa=9,Su=3`
         * - …also works: `sunday_shift=-8` ⇒ `Mo=0,Tu=1,We=2,Th=3,Fr=4,Sa=5,Su=-1``
         */
        sunday_shift?: number
    }
    /**
     * The locale matching algorithm to use.
     *
     * [MDN](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_negotiation).
     * @private
     */
    type RelativeTimeFormatLocaleMatcher = "lookup" | "best fit";
    /**
     * The format of output message.
     *
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat#Parameters).
     * @private
     */
    type RelativeTimeFormatNumeric = "always" | "auto";
    /**
     * The length of the internationalized message.
     *
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat#Parameters).
     * @private
     */
    type RelativeTimeFormatStyle = "long" | "short" | "narrow";
    /**
     * Corresponds to {@link Intl.RelativeTimeFormatOptions} (see [Intl.RelativeTimeFormat - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat)).
     * @private
     */
    interface toRelativeOptions{
        /**
         * ISO language identificator such as **"en-GB"** (default value)
         */
        locales?: Intl_UnicodeBCP47LocaleIdentifier,
        /** The locale matching algorithm to use. For information about this option, see [Intl page](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_negotiation). */
        localeMatcher?: RelativeTimeFormatLocaleMatcher;
        /** The format of output message. Defaults to `auto` */
        numeric?: RelativeTimeFormatNumeric;
        /** The length of the internationalized message. Defaults to `long` */
        style?: RelativeTimeFormatStyle;
    }
    /**
     * Generates multidimensional array for formatting (eg. "YYYY"=> `[ [ "year", "numeric" ] ]`). Supports:
     * <br/>- "YYYY", "YY",
     * <br/>- "MM", "MMM", "MMMM",
     * <br/>- "dddd" (weekday - Monday), "ddd" (shorter weekday - Mon), "dd" (Mo), "d" (0===Sun <> 6===Sat),
     * <br/>- "DD", "D", "Do",
     * <br/>- "HH", "H",
     * <br/>- "mm", "m",
     * <br/>- "SS", "S",
     * <br/>- "W", "Wo"
     * @private
     */
    function getFormatObject(format_string?: string): ArrayOfOperations;
    /**
     * Function generates text based on `format`, `locale` and `timeZone` from `DateArray`.
     * ```javascript
     * $time.toString("DD/MM/YYYY HH:mm:SS",{ locale: "en-GB" })($time.fromNow());//= "05/06/2019 09:32:20"
     * $time.toString($time.formats.SQL)($time.fromNow());//= "2019-06-05 09:32:20"
     * ```
     * @param format For using `string` see {@link getFormatObject}, else {@link $time.formats}.
     * @category Public
     */
    function toString(format: string | Values<format_arrays>, options?: toLocaleStringOptions): (date_array: DateArray)=> string
    /**
     * It is wrapper arround [`Date.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString).
     * @category Public
     */
    function toLocaleString(format_object_name: keyof format_objects, options?: toLocaleStringOptions): (date_array: DateArray)=> string
    /**
     * @private
     */
    type Measures= { seconds: 1000, minutes: 60000 /* 60*sec */, hours: 3600000 /* 60*mins */, days: 86400000 /* 24*days */, weeks: 604800000 /* 7*days */, months: 2419200000 /* 4*weeks */, years: 29030400000 /* 12*months */ };
    /**
     * Returns date/times difference in `output_measure_string`.
     * @category Public
     */
    function getDiff(reference_date_array: DateArray, output_measure_string: keyof Measures, full_precision: boolean): (target_date_array: DateArray)=> number;
    /**
     * Returns string representation of time difference (fallbacks into simplfy english version – see internal function `getRelativeBackup`).
     * @category Public
     */
    function getRelative(ms_diff: number, options?: toRelativeOptions): string
    /**
     * Curried function of {@link getRelative}.
     * @category Public
     */
    function toRelative(reference_date_array: DateArray, options?: toRelativeOptions): (target_date_array: DateArray)=> string;
    /**
     * @private
     */
    type modifications=
        "addDays" | "addDay" | "addMonth" | "addFullYear" | "addHours" | "addMinutes" | "addSeconds" |
        "setDays" | "setDay" | "setMonth" | "setFullYear" | "setHours" | "setMinutes" | "setSeconds" ;
    /**
     * Curried method, first invocation sets operations (i. e. `{ addDay: 1 }`) and returns `(date_array: DateArray)=> DateArray`.
     * <br/>- object literal representing requested operations
     * <br/>- use name convention like [setters for `Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#Setter) (only one argument is allowed)
     * <br/>- supports also *add\** commands with the same notation ("setMonth" => "addMonth")
     * <br/>- **IMPORTANT NOTE:** There are three behaviour changes
     * <br/>&nbsp;&nbsp;- "setMonth" is indexed from 1 (instead of 0)
     * <br/>&nbsp;&nbsp;- for "setDate" there is alias "setDay"
     * <br/>&nbsp;&nbsp;- for "addDate" there is alias "addDays"
     * @category Public
     */
    function modify(mod_obj: Record<modifications,number>): (date_array: DateArray)=> DateArray;

    /**
     * Helpers for working with {@link Date}.
     * @category Public
     */
    namespace Date_utils{
        function addDays(days: number): (d: Date)=> Date;
        function addMonths(months: number): (d: Date)=> Date;
        /**
         * If `type="numeric"`, it returns **0 (Su) - 6 (Sa)**, else it returns **name of week day**
         */
        function getWeekDay(type: string, options: toLocaleStringOptions): (d: Date)=> number;
        /**
         * This return ISO number of week.
         */
        function getWeekNumber(date: Date): number;
    }
    /**
     * @category Public
     */
    function getCETOffset(date_array: DateArray): keyof ary_ianna_time_offsets | "Z";
    /**
     * Timezone name/identificator (with offset)
     * @category Public
     */
    function getTimeZone(date_array: DateArray, options: {
        /**
         * **Defaults to "en-GB"**
         */
        locale?: Intl_UnicodeBCP47LocaleIdentifier,
        /**
         * **Defaults to "long"**
         * 
         * - `"none"` skip description
         * - `"long"` (e.g., `British Summer Time`)
         * - `"short"` (e.g., `GMT+1`)
         */
        description: "long" | "none" | "short",
        /**
         * **Defaults to `false`**
         * 
         * Show offset part: `"UTC+01:00 (…)"` or `"UTC+01:00"` (if `description="none"`)
         */
        offset: boolean }): string
    /**
     * Timezone name/identificator (with offset) for current timezone
     * @category Public
     */
    function getCurrentTimeZone(options?: {
        /**
         * **Defaults to "en-GB"**
         */
        locale?: Intl_UnicodeBCP47LocaleIdentifier,
        /**
         * **Defaults to "long"**
         * 
         * - `"none"` skip description
         * - `"long"` (e.g., `British Summer Time`)
         * - `"short"` (e.g., `GMT+1`)
         * - `"ianna"`/`"IANNA"` (e.g. `Europe/Prague`): `locale` has no effect for this
         */
        description: "long" | "none" | "short" | "ianna" | "IANNA",
        /**
         * **Defaults to `false`**
         * 
         * Show offset part: `"UTC+01:00 (…)"` or `"UTC+01:00"` (if `description="none"`)
         */
        offset: boolean }): string
    /**
     * @category Public
     */
    function getTimeZoneOffset(date_array: DateArray, timeZone: string): number;
    /**
     * @category Public
     */
    function getTimeZoneOffsetString(date_array: DateArray): string;
    /**
     * @category Public
     */
    function getTimeZones(): ary_ianna_time_zones[];
    /**
     * @category Public
     */
    function isTimeZone (candidate: string): boolean;
    /**
     * @category Public
     */
    function setInternalZone(zone: string): string;
    /**
     * If setted into `undefined` tries to follow user device configuration.
     * @category Public
     */
    function setInternalLocale<L extends Intl_UnicodeBCP47LocaleIdentifier>(locale: L): L;
}
