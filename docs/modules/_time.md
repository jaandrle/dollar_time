[$time](../README.md) / %24time

# Namespace: $time

This namespace provides features for date/time. Mainly, there are utilities using **Date** class and feature [`Date.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString).

**`version`** 1.5.0

**`see`** [https://github.com/jaandrle/dollar_time](https://github.com/jaandrle/dollar_time)

## Table of contents

### Public Namespaces

- [Date\_utils](_time.Date_utils.md)

### Interfaces

- [format\_arrays](../interfaces/_time.format_arrays.md)
- [format\_objects](../interfaces/_time.format_objects.md)
- [toLocaleStringOptions](../interfaces/_time.toLocaleStringOptions.md)
- [toRelativeOptions](../interfaces/_time.toRelativeOptions.md)

### Type aliases

- [ArrayOfOperation](_time.md#arrayofoperation)
- [ArrayOfOperations](_time.md#arrayofoperations)
- [DateArray](_time.md#datearray)
- [Intl\_UnicodeBCP47LocaleIdentifier](_time.md#intl_unicodebcp47localeidentifier)
- [Measures](_time.md#measures)
- [OperationTypes](_time.md#operationtypes)
- [RelativeTimeFormatLocaleMatcher](_time.md#relativetimeformatlocalematcher)
- [RelativeTimeFormatNumeric](_time.md#relativetimeformatnumeric)
- [RelativeTimeFormatStyle](_time.md#relativetimeformatstyle)
- [Values](_time.md#values)
- [ary\_ianna\_time\_offsets](_time.md#ary_ianna_time_offsets)
- [ary\_ianna\_time\_offsets\_keyed](_time.md#ary_ianna_time_offsets_keyed)
- [ary\_ianna\_time\_zones](_time.md#ary_ianna_time_zones)
- [format\_object](_time.md#format_object)
- [modifications](_time.md#modifications)
- [ordinal\_numbers](_time.md#ordinal_numbers)

### Public Variables

- [\_](_time.md#_)
- [formats](_time.md#formats)

### Public Functions

- [fromDate](_time.md#fromdate)
- [fromDateArguments](_time.md#fromdatearguments)
- [fromNow](_time.md#fromnow)
- [fromString](_time.md#fromstring)
- [getCETOffset](_time.md#getcetoffset)
- [getCurrentTimeZone](_time.md#getcurrenttimezone)
- [getDiff](_time.md#getdiff)
- [getRelative](_time.md#getrelative)
- [getTimeZone](_time.md#gettimezone)
- [getTimeZoneOffset](_time.md#gettimezoneoffset)
- [getTimeZoneOffsetString](_time.md#gettimezoneoffsetstring)
- [getTimeZones](_time.md#gettimezones)
- [isTimeZone](_time.md#istimezone)
- [modify](_time.md#modify)
- [setInternalLocale](_time.md#setinternallocale)
- [setInternalZone](_time.md#setinternalzone)
- [toDate](_time.md#todate)
- [toLocaleString](_time.md#tolocalestring)
- [toRelative](_time.md#torelative)
- [toString](_time.md#tostring)

### Private Functions

- [getFormatObject](_time.md#getformatobject)

## Type aliases

### ArrayOfOperation

Ƭ `Private` **ArrayOfOperation**<`O`\>: [`O`, `O` extends keyof `Intl.DateTimeFormatOptions` ? `Intl.DateTimeFormatOptions`[`O`] : `string`, `undefined` \| ``"ordinal_number"`` \| ``"two_letters"``]

First two items represents key/value of [`Date.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) (i. e. "weekday", "month") or "text".
Last item reprezents internal manipulations:
<br/>- "ordinal_number": Include suffix – **only English supported**
<br/>- "two_letters": 1→01, …

#### Type parameters

| Name | Type |
| :------ | :------ |
| `O` | extends [`OperationTypes`](_time.md#operationtypes) |

___

### ArrayOfOperations

Ƭ `Private` **ArrayOfOperations**: [`ArrayOfOperation`](_time.md#arrayofoperation)<[`OperationTypes`](_time.md#operationtypes)\>[]

___

### DateArray

Ƭ `Private` **DateArray**: [`string`, `string`, keyof [`ary_ianna_time_offsets`](_time.md#ary_ianna_time_offsets) \| keyof [`ary_ianna_time_offsets_keyed`](_time.md#ary_ianna_time_offsets_keyed) \| ``""``]

`Array<string>` reprezentation of date/time:
```text
[
  date: is always in form of "YYYY-MM-DD" or "",
  time: is always in form of "HH:mm:SS" or "HH:mm:00" or "",
  zone: is always in form of "[+-]\d\d:\d\d" or "CET" or ""
]
```
Valid examples:
```javascript
[ "2019-06-02", "12:35:45", "CET" ]
[ "2019-06-02", "12:35:45", "" ]
[ "2019-06-02", "", "" ]
[ "", "12:35:45", "" ]
```

___

### Intl\_UnicodeBCP47LocaleIdentifier

Ƭ **Intl\_UnicodeBCP47LocaleIdentifier**: `string`

See {@link Intl.UnicodeBCP47LocaleIdentifier} or [Intl - Locale identification and negotiation | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation).

___

### Measures

Ƭ `Private` **Measures**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `days` | ``86400000`` |
| `hours` | ``3600000`` |
| `minutes` | ``60000`` |
| `months` | ``2419200000`` |
| `seconds` | ``1000`` |
| `weeks` | ``604800000`` |
| `years` | ``29030400000`` |

___

### OperationTypes

Ƭ `Private` **OperationTypes**: keyof `Intl.DateTimeFormatOptions` \| ``"text"``

___

### RelativeTimeFormatLocaleMatcher

Ƭ `Private` **RelativeTimeFormatLocaleMatcher**: ``"lookup"`` \| ``"best fit"``

The locale matching algorithm to use.

[MDN](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_negotiation).

___

### RelativeTimeFormatNumeric

Ƭ `Private` **RelativeTimeFormatNumeric**: ``"always"`` \| ``"auto"``

The format of output message.

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat#Parameters).

___

### RelativeTimeFormatStyle

Ƭ `Private` **RelativeTimeFormatStyle**: ``"long"`` \| ``"short"`` \| ``"narrow"``

The length of the internationalized message.

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat#Parameters).

___

### Values

Ƭ `Private` **Values**<`T`\>: `T`[keyof `T`]

#### Type parameters

| Name |
| :------ |
| `T` |

___

### ary\_ianna\_time\_offsets

Ƭ `Private` **ary\_ianna\_time\_offsets**: `Object`

This object stores offsets in `ary_ianna_time_zones` (time offsets as keys) and one corresponding index.

So for exmple, `ary_ianna_time_offsets["-01:00"]` is equal to **238** which is index of `ary_ianna_time_zones[238]==='Atlantic/Cape_Verde'` (always "-01:00").

#### Type declaration

| Name | Type |
| :------ | :------ |
| `+01:00` | ``15`` |
| `+02:00` | ``8`` |
| `+03:00` | ``270`` |
| `+04:00` | ``306`` |
| `+04:30` | ``191`` |
| `+05:00` | ``221`` |
| `+05:30` | ``173`` |
| `+05:45` | ``194`` |
| `+06:00` | ``207`` |
| `+06:30` | ``232`` |
| `+07:00` | ``182`` |
| `+08:00` | ``220`` |
| `+08:30` | ``210`` |
| `+08:45` | ``249`` |
| `+09:00` | ``176`` |
| `+09:30` | ``248`` |
| `+10:00` | ``229`` |
| `+11:00` | ``314`` |
| `+12:00` | ``345`` |
| `+13:00` | ``316`` |
| `+14:00` | ``326`` |
| `-01:00` | ``238`` |
| `-02:00` | ``242`` |
| `-03:00` | ``107`` |
| `-04:00` | ``49`` |
| `-05:00` | ``92`` |
| `-06:00` | ``62`` |
| `-07:00` | ``120`` |
| `-08:00` | ``337`` |
| `-09:00` | ``320`` |
| `-09:30` | ``330`` |
| `-10:00` | ``323`` |
| `-11:00` | ``332`` |

___

### ary\_ianna\_time\_offsets\_keyed

Ƭ `Private` **ary\_ianna\_time\_offsets\_keyed**: `Object`

This object stores offsets in `ary_ianna_time_zones` (timezone id as keys) and one corresponding index.

So for exmple, `ary_ianna_time_offsets["CET"]` is equal to **284** which is index of `ary_ianna_time_zones[284]==='Europe/Prague'` (in winter "+01:00" and in summer "+02:00").

**IMPORTANT NOTE:** BST, EET, WET hasn't been validated! … idea is to behave the same way like CET

#### Type declaration

| Name | Type |
| :------ | :------ |
| `BST` | ``275`` |
| `CEST` | ``284`` |
| `CET` | ``284`` |
| `EEST` | ``264`` |
| `EET` | ``264`` |
| `WEST` | ``274`` |
| `WET` | ``274`` |

___

### ary\_ianna\_time\_zones

Ƭ `Private` **ary\_ianna\_time\_zones**: ``"Africa/Abidjan"`` \| ``"Africa/Accra"`` \| ``"Africa/Algiers"`` \| ``"Africa/Bissau"`` \| ``"Africa/Cairo"`` \| ``"Africa/Casablanca"`` \| ``"Africa/Ceuta"`` \| ``"Africa/El_Aaiun"`` \| ``"Africa/Johannesburg"`` \| ``"Africa/Juba"`` \| ``"Africa/Khartoum"`` \| ``"Africa/Lagos"`` \| ``"Africa/Maputo"`` \| ``"Africa/Monrovia"`` \| ``"Africa/Nairobi"`` \| ``"Africa/Ndjamena"`` \| ``"Africa/Sao_Tome"`` \| ``"Africa/Tripoli"`` \| ``"Africa/Tunis"`` \| ``"Africa/Windhoek"`` \| ``"America/Adak"`` \| ``"America/Anchorage"`` \| ``"America/Araguaina"`` \| ``"America/Argentina/Buenos_Aires"`` \| ``"America/Argentina/Catamarca"`` \| ``"America/Argentina/Cordoba"`` \| ``"America/Argentina/Jujuy"`` \| ``"America/Argentina/La_Rioja"`` \| ``"America/Argentina/Mendoza"`` \| ``"America/Argentina/Rio_Gallegos"`` \| ``"America/Argentina/Salta"`` \| ``"America/Argentina/San_Juan"`` \| ``"America/Argentina/San_Luis"`` \| ``"America/Argentina/Tucuman"`` \| ``"America/Argentina/Ushuaia"`` \| ``"America/Asuncion"`` \| ``"America/Atikokan"`` \| ``"America/Bahia_Banderas"`` \| ``"America/Bahia"`` \| ``"America/Barbados"`` \| ``"America/Belem"`` \| ``"America/Belize"`` \| ``"America/Blanc-Sablon"`` \| ``"America/Boa_Vista"`` \| ``"America/Bogota"`` \| ``"America/Boise"`` \| ``"America/Cambridge_Bay"`` \| ``"America/Campo_Grande"`` \| ``"America/Cancun"`` \| ``"America/Caracas"`` \| ``"America/Cayenne"`` \| ``"America/Costa_Rica"`` \| ``"America/Creston"`` \| ``"America/Cuiaba"`` \| ``"America/Curacao"`` \| ``"America/Danmarkshavn"`` \| ``"America/Dawson_Creek"`` \| ``"America/Dawson"`` \| ``"America/Denver"`` \| ``"America/Detroit"`` \| ``"America/Edmonton"`` \| ``"America/Eirunepe"`` \| ``"America/El_Salvador"`` \| ``"America/Fort_Nelson"`` \| ``"America/Fortaleza"`` \| ``"America/Glace_Bay"`` \| ``"America/Godthab"`` \| ``"America/Goose_Bay"`` \| ``"America/Grand_Turk"`` \| ``"America/Guatemala"`` \| ``"America/Guayaquil"`` \| ``"America/Guyana"`` \| ``"America/Halifax"`` \| ``"America/Havana"`` \| ``"America/Hermosillo"`` \| ``"America/Chicago"`` \| ``"America/Chihuahua"`` \| ``"America/Indiana/Indianapolis"`` \| ``"America/Indiana/Knox"`` \| ``"America/Indiana/Marengo"`` \| ``"America/Indiana/Petersburg"`` \| ``"America/Indiana/Tell_City"`` \| ``"America/Indiana/Vevay"`` \| ``"America/Indiana/Vincennes"`` \| ``"America/Indiana/Winamac"`` \| ``"America/Inuvik"`` \| ``"America/Iqaluit"`` \| ``"America/Jamaica"`` \| ``"America/Juneau"`` \| ``"America/Kentucky/Louisville"`` \| ``"America/Kentucky/Monticello"`` \| ``"America/La_Paz"`` \| ``"America/Lima"`` \| ``"America/Los_Angeles"`` \| ``"America/Maceio"`` \| ``"America/Managua"`` \| ``"America/Manaus"`` \| ``"America/Martinique"`` \| ``"America/Matamoros"`` \| ``"America/Mazatlan"`` \| ``"America/Menominee"`` \| ``"America/Merida"`` \| ``"America/Metlakatla"`` \| ``"America/Mexico_City"`` \| ``"America/Miquelon"`` \| ``"America/Moncton"`` \| ``"America/Monterrey"`` \| ``"America/Montevideo"`` \| ``"America/Nassau"`` \| ``"America/New_York"`` \| ``"America/Nipigon"`` \| ``"America/Nome"`` \| ``"America/Noronha"`` \| ``"America/North_Dakota/Beulah"`` \| ``"America/North_Dakota/Center"`` \| ``"America/North_Dakota/New_Salem"`` \| ``"America/Ojinaga"`` \| ``"America/Panama"`` \| ``"America/Pangnirtung"`` \| ``"America/Paramaribo"`` \| ``"America/Phoenix"`` \| ``"America/Port_of_Spain"`` \| ``"America/Port-au-Prince"`` \| ``"America/Porto_Velho"`` \| ``"America/Puerto_Rico"`` \| ``"America/Punta_Arenas"`` \| ``"America/Rainy_River"`` \| ``"America/Rankin_Inlet"`` \| ``"America/Recife"`` \| ``"America/Regina"`` \| ``"America/Resolute"`` \| ``"America/Rio_Branco"`` \| ``"America/Santarem"`` \| ``"America/Santiago"`` \| ``"America/Santo_Domingo"`` \| ``"America/Sao_Paulo"`` \| ``"America/Scoresbysund"`` \| ``"America/Sitka"`` \| ``"America/St_Johns"`` \| ``"America/Swift_Current"`` \| ``"America/Tegucigalpa"`` \| ``"America/Thule"`` \| ``"America/Thunder_Bay"`` \| ``"America/Tijuana"`` \| ``"America/Toronto"`` \| ``"America/Vancouver"`` \| ``"America/Whitehorse"`` \| ``"America/Winnipeg"`` \| ``"America/Yakutat"`` \| ``"America/Yellowknife"`` \| ``"Antarctica/Casey"`` \| ``"Antarctica/Davis"`` \| ``"Antarctica/Macquarie"`` \| ``"Antarctica/Mawson"`` \| ``"Antarctica/Palmer"`` \| ``"Antarctica/Rothera"`` \| ``"Antarctica/Syowa"`` \| ``"Antarctica/Troll"`` \| ``"Antarctica/Vostok"`` \| ``"Asia/Almaty"`` \| ``"Asia/Amman"`` \| ``"Asia/Anadyr"`` \| ``"Asia/Aqtau"`` \| ``"Asia/Aqtobe"`` \| ``"Asia/Ashgabat"`` \| ``"Asia/Atyrau"`` \| ``"Asia/Baghdad"`` \| ``"Asia/Baku"`` \| ``"Asia/Bangkok"`` \| ``"Asia/Barnaul"`` \| ``"Asia/Beirut"`` \| ``"Asia/Bishkek"`` \| ``"Asia/Brunei"`` \| ``"Asia/Colombo"`` \| ``"Asia/Damascus"`` \| ``"Asia/Dhaka"`` \| ``"Asia/Dili"`` \| ``"Asia/Dubai"`` \| ``"Asia/Dushanbe"`` \| ``"Asia/Famagusta"`` \| ``"Asia/Gaza"`` \| ``"Asia/Hebron"`` \| ``"Asia/Ho_Chi_Minh"`` \| ``"Asia/Hong_Kong"`` \| ``"Asia/Hovd"`` \| ``"Asia/Chita"`` \| ``"Asia/Choibalsan"`` \| ``"Asia/Irkutsk"`` \| ``"Asia/Jakarta"`` \| ``"Asia/Jayapura"`` \| ``"Asia/Jerusalem"`` \| ``"Asia/Kabul"`` \| ``"Asia/Kamchatka"`` \| ``"Asia/Karachi"`` \| ``"Asia/Kathmandu"`` \| ``"Asia/Khandyga"`` \| ``"Asia/Kolkata"`` \| ``"Asia/Krasnoyarsk"`` \| ``"Asia/Kuala_Lumpur"`` \| ``"Asia/Kuching"`` \| ``"Asia/Macau"`` \| ``"Asia/Magadan"`` \| ``"Asia/Makassar"`` \| ``"Asia/Manila"`` \| ``"Asia/Nicosia"`` \| ``"Asia/Novokuznetsk"`` \| ``"Asia/Novosibirsk"`` \| ``"Asia/Omsk"`` \| ``"Asia/Oral"`` \| ``"Asia/Pontianak"`` \| ``"Asia/Pyongyang"`` \| ``"Asia/Qatar"`` \| ``"Asia/Qyzylorda"`` \| ``"Asia/Riyadh"`` \| ``"Asia/Sakhalin"`` \| ``"Asia/Samarkand"`` \| ``"Asia/Seoul"`` \| ``"Asia/Shanghai"`` \| ``"Asia/Singapore"`` \| ``"Asia/Srednekolymsk"`` \| ``"Asia/Taipei"`` \| ``"Asia/Tashkent"`` \| ``"Asia/Tbilisi"`` \| ``"Asia/Tehran"`` \| ``"Asia/Thimphu"`` \| ``"Asia/Tokyo"`` \| ``"Asia/Tomsk"`` \| ``"Asia/Ulaanbaatar"`` \| ``"Asia/Urumqi"`` \| ``"Asia/Ust-Nera"`` \| ``"Asia/Vladivostok"`` \| ``"Asia/Yakutsk"`` \| ``"Asia/Yangon"`` \| ``"Asia/Yekaterinburg"`` \| ``"Asia/Yerevan"`` \| ``"Atlantic/Azores"`` \| ``"Atlantic/Bermuda"`` \| ``"Atlantic/Canary"`` \| ``"Atlantic/Cape_Verde"`` \| ``"Atlantic/Faroe"`` \| ``"Atlantic/Madeira"`` \| ``"Atlantic/Reykjavik"`` \| ``"Atlantic/South_Georgia"`` \| ``"Atlantic/Stanley"`` \| ``"Australia/Adelaide"`` \| ``"Australia/Brisbane"`` \| ``"Australia/Broken_Hill"`` \| ``"Australia/Currie"`` \| ``"Australia/Darwin"`` \| ``"Australia/Eucla"`` \| ``"Australia/Hobart"`` \| ``"Australia/Lindeman"`` \| ``"Australia/Lord_Howe"`` \| ``"Australia/Melbourne"`` \| ``"Australia/Perth"`` \| ``"Australia/Sydney"`` \| ``"Europe/Amsterdam"`` \| ``"Europe/Andorra"`` \| ``"Europe/Astrakhan"`` \| ``"Europe/Athens"`` \| ``"Europe/Belgrade"`` \| ``"Europe/Berlin"`` \| ``"Europe/Brussels"`` \| ``"Europe/Budapest"`` \| ``"Europe/Bucharest"`` \| ``"Europe/Copenhagen"`` \| ``"Europe/Dublin"`` \| ``"Europe/Gibraltar"`` \| ``"Europe/Helsinki"`` \| ``"Europe/Chisinau"`` \| ``"Europe/Istanbul"`` \| ``"Europe/Kaliningrad"`` \| ``"Europe/Kiev"`` \| ``"Europe/Kirov"`` \| ``"Europe/Lisbon"`` \| ``"Europe/London"`` \| ``"Europe/Luxembourg"`` \| ``"Europe/Madrid"`` \| ``"Europe/Malta"`` \| ``"Europe/Minsk"`` \| ``"Europe/Monaco"`` \| ``"Europe/Moscow"`` \| ``"Europe/Oslo"`` \| ``"Europe/Paris"`` \| ``"Europe/Prague"`` \| ``"Europe/Riga"`` \| ``"Europe/Rome"`` \| ``"Europe/Samara"`` \| ``"Europe/Saratov"`` \| ``"Europe/Simferopol"`` \| ``"Europe/Sofia"`` \| ``"Europe/Stockholm"`` \| ``"Europe/Tallinn"`` \| ``"Europe/Tirane"`` \| ``"Europe/Ulyanovsk"`` \| ``"Europe/Uzhgorod"`` \| ``"Europe/Vienna"`` \| ``"Europe/Vilnius"`` \| ``"Europe/Volgograd"`` \| ``"Europe/Warsaw"`` \| ``"Europe/Zaporozhye"`` \| ``"Europe/Zurich"`` \| ``"Indian/Cocos"`` \| ``"Indian/Chagos"`` \| ``"Indian/Christmas"`` \| ``"Indian/Kerguelen"`` \| ``"Indian/Mahe"`` \| ``"Indian/Maldives"`` \| ``"Indian/Mauritius"`` \| ``"Indian/Reunion"`` \| ``"Pacific/Apia"`` \| ``"Pacific/Auckland"`` \| ``"Pacific/Bougainville"`` \| ``"Pacific/Easter"`` \| ``"Pacific/Efate"`` \| ``"Pacific/Enderbury"`` \| ``"Pacific/Fakaofo"`` \| ``"Pacific/Fiji"`` \| ``"Pacific/Funafuti"`` \| ``"Pacific/Galapagos"`` \| ``"Pacific/Gambier"`` \| ``"Pacific/Guadalcanal"`` \| ``"Pacific/Guam"`` \| ``"Pacific/Honolulu"`` \| ``"Pacific/Chatham"`` \| ``"Pacific/Chuuk"`` \| ``"Pacific/Kiritimati"`` \| ``"Pacific/Kosrae"`` \| ``"Pacific/Kwajalein"`` \| ``"Pacific/Majuro"`` \| ``"Pacific/Marquesas"`` \| ``"Pacific/Nauru"`` \| ``"Pacific/Niue"`` \| ``"Pacific/Norfolk"`` \| ``"Pacific/Noumea"`` \| ``"Pacific/Pago_Pago"`` \| ``"Pacific/Palau"`` \| ``"Pacific/Pitcairn"`` \| ``"Pacific/Pohnpei"`` \| ``"Pacific/Port_Moresby"`` \| ``"Pacific/Rarotonga"`` \| ``"Pacific/Tahiti"`` \| ``"Pacific/Tarawa"`` \| ``"Pacific/Tongatapu"`` \| ``"Pacific/Wake"`` \| ``"Pacific/Wallis"``

This array stores all time zones names (eg. 'Europe/Andorra') supported by `{ timeZone: ... }` in second argument of `Date.prototype.toLocaleString`.

Original from [stackoverflow.com/a/54500197](https://stackoverflow.com/a/54500197).

___

### format\_object

Ƭ `Private` **format\_object**: { [P in keyof Intl.DateTimeFormatOptions]: Intl.DateTimeFormatOptions[P]}

___

### modifications

Ƭ `Private` **modifications**: ``"addDays"`` \| ``"addDay"`` \| ``"addMonth"`` \| ``"addFullYear"`` \| ``"addHours"`` \| ``"addMinutes"`` \| ``"addSeconds"`` \| ``"setDays"`` \| ``"setDay"`` \| ``"setMonth"`` \| ``"setFullYear"`` \| ``"setHours"`` \| ``"setMinutes"`` \| ``"setSeconds"``

___

### ordinal\_numbers

Ƭ `Private` **ordinal\_numbers**: (``"th"`` \| ``"st"`` \| ``"nd"`` \| ``"rd"``)[]

Internal helper array for {@link getOrdinalSuffix}.

## Public Variables

### \_

• `Const` **\_**: `undefined`

Alias for `undefined` which can be used to trigger default value of argument.

___

### formats

• `Const` **formats**: [`format_arrays`](../interfaces/_time.format_arrays.md)

Predefined formats for [toString](_time.md#tostring).

## Public Functions

### fromDate

▸ **fromDate**(`date_instance`): [`DateArray`](_time.md#datearray)

Function generates `DateArray` from instance of `Date`.
```javascript
$time.fromDate(new Date());
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `date_instance` | `Date` |

#### Returns

[`DateArray`](_time.md#datearray)

___

### fromDateArguments

▸ **fromDateArguments**(): [`DateArray`](_time.md#datearray)

In fact, internally uses {@link DateConstructor}. See [Date() constructor - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date).

#### Returns

[`DateArray`](_time.md#datearray)

▸ **fromDateArguments**(`value`): [`DateArray`](_time.md#datearray)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` \| `string` |

#### Returns

[`DateArray`](_time.md#datearray)

▸ **fromDateArguments**(`year`, `month`, `date?`, `hours?`, `minutes?`, `seconds?`, `ms?`): [`DateArray`](_time.md#datearray)

#### Parameters

| Name | Type |
| :------ | :------ |
| `year` | `number` |
| `month` | `number` |
| `date?` | `number` |
| `hours?` | `number` |
| `minutes?` | `number` |
| `seconds?` | `number` |
| `ms?` | `number` |

#### Returns

[`DateArray`](_time.md#datearray)

___

### fromNow

▸ **fromNow**(): [`DateArray`](_time.md#datearray)

Function generates `DateArray` from current date/time.

**Warning:** Internally uses `toISOString` method so result is always converted to "+00:00": `p($time.fromNow, $time.setTimeZone("+02:00"), $time.toString())()` (`p` is some pipe function) — this returns "2019-07-10T16:48:43+02:00" instead of "2019-07-10T18:48:43+02:00" (current time) … the flow is "2019-07-10T18:48:43+02:00"-`fromNow`->"2019-07-10T16:48:43Z"-`setTimeZone`->"2019-07-10T16:48:43+02:00".

#### Returns

[`DateArray`](_time.md#datearray)

___

### fromString

▸ **fromString**(`timestamp_string?`, `timezone?`): [`DateArray`](_time.md#datearray)

Function generates `DateArray` from passed string.
```javascript
$time.fromString("2019-06-02 12:35:45 +01:00");
$time.fromString("2019-06-02");
$time.fromString("12:35:45");
//…
$time.fromString("2019-06-02T12:35:45+01:00");
//…
$time.fromString("12:35:45+01:00 2019-06-02")
//…
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timestamp_string?` | `string` | If `undefined` returns result of [fromNow](_time.md#fromnow). Otherwise, supported forms are combinations of date ("YYYY-MM-DD", "DD/MM/YYYY"), time ("HH:mm:ss", "HH:mm") and timezone ("CET", "+01:00", "-02:00", ...): |
| `timezone?` | [`ary_ianna_time_zones`](_time.md#ary_ianna_time_zones) | - |

#### Returns

[`DateArray`](_time.md#datearray)

___

### getCETOffset

▸ **getCETOffset**(`date_array`): keyof [`ary_ianna_time_offsets`](_time.md#ary_ianna_time_offsets) \| ``"Z"``

#### Parameters

| Name | Type |
| :------ | :------ |
| `date_array` | [`DateArray`](_time.md#datearray) |

#### Returns

keyof [`ary_ianna_time_offsets`](_time.md#ary_ianna_time_offsets) \| ``"Z"``

___

### getCurrentTimeZone

▸ **getCurrentTimeZone**(`options?`): `string`

Timezone name/identificator (with offset) for current timezone

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | `Object` | - |
| `options.description` | ``"long"`` \| ``"none"`` \| ``"short"`` \| ``"ianna"`` \| ``"IANNA"`` | **Defaults to "long"**  - `"none"` skip description - `"long"` (e.g., `British Summer Time`) - `"short"` (e.g., `GMT+1`) - `"ianna"`/`"IANNA"` (e.g. `Europe/Prague`): `locale` has no effect for this |
| `options.locale?` | [`Intl_UnicodeBCP47LocaleIdentifier`](_time.md#intl_unicodebcp47localeidentifier) | **Defaults to "en-GB"** |
| `options.offset` | `boolean` | **Defaults to `false`**  Show offset part: `"UTC+01:00 (…)"` or `"UTC+01:00"` (if `description="none"`) |

#### Returns

`string`

___

### getDiff

▸ **getDiff**(`reference_date_array`, `output_measure_string`, `full_precision`): (`target_date_array`: [`DateArray`](_time.md#datearray)) => `number`

Returns date/times difference in `output_measure_string`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `reference_date_array` | [`DateArray`](_time.md#datearray) |
| `output_measure_string` | keyof [`Measures`](_time.md#measures) |
| `full_precision` | `boolean` |

#### Returns

`fn`

▸ (`target_date_array`): `number`

Returns date/times difference in `output_measure_string`.

##### Parameters

| Name | Type |
| :------ | :------ |
| `target_date_array` | [`DateArray`](_time.md#datearray) |

##### Returns

`number`

___

### getRelative

▸ **getRelative**(`ms_diff`, `options?`): `string`

Returns string representation of time difference (fallbacks into simplfy english version – see internal function `getRelativeBackup`).

#### Parameters

| Name | Type |
| :------ | :------ |
| `ms_diff` | `number` |
| `options?` | [`toRelativeOptions`](../interfaces/_time.toRelativeOptions.md) |

#### Returns

`string`

___

### getTimeZone

▸ **getTimeZone**(`date_array`, `options`): `string`

Timezone name/identificator (with offset)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `date_array` | [`DateArray`](_time.md#datearray) | - |
| `options` | `Object` | - |
| `options.description` | ``"long"`` \| ``"none"`` \| ``"short"`` | **Defaults to "long"**  - `"none"` skip description - `"long"` (e.g., `British Summer Time`) - `"short"` (e.g., `GMT+1`) |
| `options.locale?` | [`Intl_UnicodeBCP47LocaleIdentifier`](_time.md#intl_unicodebcp47localeidentifier) | **Defaults to "en-GB"** |
| `options.offset` | `boolean` | **Defaults to `false`**  Show offset part: `"UTC+01:00 (…)"` or `"UTC+01:00"` (if `description="none"`) |

#### Returns

`string`

___

### getTimeZoneOffset

▸ **getTimeZoneOffset**(`date_array`, `timeZone`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `date_array` | [`DateArray`](_time.md#datearray) |
| `timeZone` | `string` |

#### Returns

`number`

___

### getTimeZoneOffsetString

▸ **getTimeZoneOffsetString**(`date_array`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `date_array` | [`DateArray`](_time.md#datearray) |

#### Returns

`string`

___

### getTimeZones

▸ **getTimeZones**(): [`ary_ianna_time_zones`](_time.md#ary_ianna_time_zones)[]

#### Returns

[`ary_ianna_time_zones`](_time.md#ary_ianna_time_zones)[]

___

### isTimeZone

▸ **isTimeZone**(`candidate`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `candidate` | `string` |

#### Returns

`boolean`

___

### modify

▸ **modify**(`mod_obj`): (`date_array`: [`DateArray`](_time.md#datearray)) => [`DateArray`](_time.md#datearray)

Curried method, first invocation sets operations (i. e. `{ addDay: 1 }`) and returns `(date_array: DateArray)=> DateArray`.
<br/>- object literal representing requested operations
<br/>- use name convention like [setters for `Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#Setter) (only one argument is allowed)
<br/>- supports also *add\** commands with the same notation ("setMonth" => "addMonth")
<br/>- **IMPORTANT NOTE:** There are three behaviour changes
<br/>&nbsp;&nbsp;- "setMonth" is indexed from 1 (instead of 0)
<br/>&nbsp;&nbsp;- for "setDate" there is alias "setDay"
<br/>&nbsp;&nbsp;- for "addDate" there is alias "addDays"

#### Parameters

| Name | Type |
| :------ | :------ |
| `mod_obj` | `Record`<[`modifications`](_time.md#modifications), `number`\> |

#### Returns

`fn`

▸ (`date_array`): [`DateArray`](_time.md#datearray)

Curried method, first invocation sets operations (i. e. `{ addDay: 1 }`) and returns `(date_array: DateArray)=> DateArray`.
<br/>- object literal representing requested operations
<br/>- use name convention like [setters for `Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#Setter) (only one argument is allowed)
<br/>- supports also *add\** commands with the same notation ("setMonth" => "addMonth")
<br/>- **IMPORTANT NOTE:** There are three behaviour changes
<br/>&nbsp;&nbsp;- "setMonth" is indexed from 1 (instead of 0)
<br/>&nbsp;&nbsp;- for "setDate" there is alias "setDay"
<br/>&nbsp;&nbsp;- for "addDate" there is alias "addDays"

##### Parameters

| Name | Type |
| :------ | :------ |
| `date_array` | [`DateArray`](_time.md#datearray) |

##### Returns

[`DateArray`](_time.md#datearray)

___

### setInternalLocale

▸ **setInternalLocale**<`L`\>(`locale`): `L`

If setted into `undefined` tries to follow user device configuration.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `L` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `locale` | `L` |

#### Returns

`L`

___

### setInternalZone

▸ **setInternalZone**(`zone`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `zone` | `string` |

#### Returns

`string`

___

### toDate

▸ **toDate**(`date_array?`): `Date`

Defaults to `new Date()`, or if filled partialy defaults to current date/00:00:00/current zone.

#### Parameters

| Name | Type |
| :------ | :------ |
| `date_array?` | [`DateArray`](_time.md#datearray) |

#### Returns

`Date`

___

### toLocaleString

▸ **toLocaleString**(`format_object_name`, `options?`): (`date_array`: [`DateArray`](_time.md#datearray)) => `string`

It is wrapper arround [`Date.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString).

#### Parameters

| Name | Type |
| :------ | :------ |
| `format_object_name` | keyof [`format_objects`](../interfaces/_time.format_objects.md) |
| `options?` | [`toLocaleStringOptions`](../interfaces/_time.toLocaleStringOptions.md) |

#### Returns

`fn`

▸ (`date_array`): `string`

It is wrapper arround [`Date.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString).

##### Parameters

| Name | Type |
| :------ | :------ |
| `date_array` | [`DateArray`](_time.md#datearray) |

##### Returns

`string`

___

### toRelative

▸ **toRelative**(`reference_date_array`, `options?`): (`target_date_array`: [`DateArray`](_time.md#datearray)) => `string`

Curried function of [getRelative](_time.md#getrelative).

#### Parameters

| Name | Type |
| :------ | :------ |
| `reference_date_array` | [`DateArray`](_time.md#datearray) |
| `options?` | [`toRelativeOptions`](../interfaces/_time.toRelativeOptions.md) |

#### Returns

`fn`

▸ (`target_date_array`): `string`

Curried function of [getRelative](_time.md#getrelative).

##### Parameters

| Name | Type |
| :------ | :------ |
| `target_date_array` | [`DateArray`](_time.md#datearray) |

##### Returns

`string`

___

### toString

▸ **toString**(`format`, `options?`): (`date_array`: [`DateArray`](_time.md#datearray)) => `string`

Function generates text based on `format`, `locale` and `timeZone` from `DateArray`.
```javascript
$time.toString("DD/MM/YYYY HH:mm:SS",{ locale: "en-GB" })($time.fromNow());//= "05/06/2019 09:32:20"
$time.toString($time.formats.SQL)($time.fromNow());//= "2019-06-05 09:32:20"
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `format` | `string` \| [`Values`](_time.md#values)<[`format_arrays`](../interfaces/_time.format_arrays.md)\> | For using `string` see [getFormatObject](_time.md#getformatobject), else [$time.formats](_time.md#formats). |
| `options?` | [`toLocaleStringOptions`](../interfaces/_time.toLocaleStringOptions.md) | - |

#### Returns

`fn`

▸ (`date_array`): `string`

Function generates text based on `format`, `locale` and `timeZone` from `DateArray`.
```javascript
$time.toString("DD/MM/YYYY HH:mm:SS",{ locale: "en-GB" })($time.fromNow());//= "05/06/2019 09:32:20"
$time.toString($time.formats.SQL)($time.fromNow());//= "2019-06-05 09:32:20"
```

##### Parameters

| Name | Type |
| :------ | :------ |
| `date_array` | [`DateArray`](_time.md#datearray) |

##### Returns

`string`

___

## Private Functions

### getFormatObject

▸ `Private` **getFormatObject**(`format_string?`): [`ArrayOfOperations`](_time.md#arrayofoperations)

Generates multidimensional array for formatting (eg. "YYYY"=> `[ [ "year", "numeric" ] ]`). Supports:
<br/>- "YYYY", "YY",
<br/>- "MM", "MMM", "MMMM",
<br/>- "dddd" (weekday - Monday), "ddd" (shorter weekday - Mon), "dd" (Mo), "d" (0===Sun <> 6===Sat),
<br/>- "DD", "D", "Do",
<br/>- "HH", "H",
<br/>- "mm", "m",
<br/>- "SS", "S",
<br/>- "W", "Wo"

#### Parameters

| Name | Type |
| :------ | :------ |
| `format_string?` | `string` |

#### Returns

[`ArrayOfOperations`](_time.md#arrayofoperations)
