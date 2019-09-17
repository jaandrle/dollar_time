<a name="$time"></a>

## $time : <code>object</code>
This NAMESPACE provides features for date/time. Mainly, there are utilities using **Date** class and feature [`Date.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString).

**Kind**: global namespace <a name="$time" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L3" title="$time.js:3"><small>(defined@3)</small></a>  

* [$time](#$time) : <code>object</code>
    * [._](#$time._)
    * [.types](#$time.types) : <code>object</code> ℗
        * [.function_Date2Date(date_instance)](#$time.types.function_Date2Date) ⇒ <code>Date</code>
        * [.function_Date2Number(date_instance)](#$time.types.function_Date2Number) ⇒ <code>Number</code>
        * [.function_DateArray(date_array)](#$time.types.function_DateArray) ⇒ [<code>DateArray</code>](#$time.types.DateArray)
        * [.DateArray](#$time.types.DateArray) : <code>Array</code>
        * [.toLocaleStringOptions](#$time.types.toLocaleStringOptions) : <code>Object</code>
    * [.format_objects](#$time.format_objects) : <code>object</code> ℗
    * [.format_arrays](#$time.format_arrays) : <code>object</code> ℗
    * [.Date](#$time.Date) : <code>object</code>
        * [.addDays(days_num)](#$time.Date.addDays) ⇒ [<code>function\_Date2Date</code>](#$time.types.function_Date2Date)
        * [.addMonths(months_num)](#$time.Date.addMonths) ⇒ [<code>function\_Date2Date</code>](#$time.types.function_Date2Date)
        * [.getWeekDay([type], [toLocaleStringOptions])](#$time.Date.getWeekDay) ⇒ [<code>function\_Date2Number</code>](#$time.types.function_Date2Number)
        * [.getWeekNumber(date_instance)](#$time.Date.getWeekNumber) ⇒ <code>Number</code>
    * [.formats](#$time.formats) : <code>object</code>
    * [.ordinal_numbers](#$time.ordinal_numbers) ℗
    * [.ary_ianna_time_zones](#$time.ary_ianna_time_zones) ℗
    * [.ary_ianna_time_offsets](#$time.ary_ianna_time_offsets) ℗
    * [.isDateString(date_string)](#$time.isDateString) ⇒ <code>Boolean</code> ℗
    * [.isTimeString(date_string)](#$time.isTimeString) ⇒ <code>Boolean</code> ℗
    * [.fromDate(date_instance)](#$time.fromDate) ⇒ [<code>DateArray</code>](#$time.types.DateArray)
    * [.fromDateArguments(...args)](#$time.fromDateArguments) ⇒ [<code>DateArray</code>](#$time.types.DateArray)
    * [.fromNow()](#$time.fromNow) ⇒ [<code>DateArray</code>](#$time.types.DateArray)
    * [.fromString(timestamp_string, [timezone])](#$time.fromString) ⇒ [<code>DateArray</code>](#$time.types.DateArray)
    * [.toDateArray(timestamp_string)](#$time.toDateArray) ⇒ [<code>DateArray</code>](#$time.types.DateArray) ℗
    * [.toStringFromObject(format, params_obj)](#$time.toStringFromObject) ⇒ <code>function</code> ℗
    * [.getFormatObject(format_string)](#$time.getFormatObject) ⇒ <code>Array</code> ℗
    * [.toDate(date_array)](#$time.toDate) ⇒ <code>Date</code>
    * [.toLocaleString([format_object_name], [toLocaleStringOptions])](#$time.toLocaleString) ⇒ <code>function</code>
    * [.toString(format, params_obj)](#$time.toString) ⇒ <code>function</code>
    * [.getTimeZone(date, parameters)](#$time.getTimeZone) ⇒ <code>String</code>
    * [.getCurrentTimeZone(parameters)](#$time.getCurrentTimeZone) ⇒ <code>String</code>
    * [.modify(mod_obj)](#$time.modify) ⇒ [<code>function\_DateArray</code>](#$time.types.function_DateArray)
    * [.modifyAdditions(operation, value, dateObject)](#$time.modifyAdditions) ⇒ <code>Date</code> ℗
    * [.double(time)](#$time.double) ⇒ <code>String</code>
    * [.daysInMonth(month, year)](#$time.daysInMonth) ⇒ <code>Number</code>
    * [.getDaysInMonth(date_array)](#$time.getDaysInMonth) ⇒ <code>Number</code>
    * [.getMonthName(n, [l])](#$time.getMonthName) ⇒ <code>String</code>
    * [.getOrdinalSuffix(n)](#$time.getOrdinalSuffix) ⇒ <code>String</code>


* * *

<a name="$time._"></a>

### $time.\_
Alias for `undefined` which can be used to trigger default value of argument.

**Kind**: static property of [<code>$time</code>](#$time) <a name="$time._" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L1240" title="$time.js:1240"><small>(defined@1240)</small></a>  
**Access**: public  
**Properties**

| Name | Type |
| --- | --- |
| _ | <code>Undefined</code> | 

**Example**  
```js
test($time._)==="A"; function test(a= "A"){ return a; }
```

* * *

<a name="$time.types"></a>

### $time.types : <code>object</code> ℗
Just virtual key!!! This is overwiev of all internal types for better description.

**Kind**: static namespace of [<code>$time</code>](#$time) <a name="$time.types" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L7" title="$time.js:7"><small>(defined@7)</small></a>  
**Access**: private  

* [.types](#$time.types) : <code>object</code> ℗
    * [.function_Date2Date(date_instance)](#$time.types.function_Date2Date) ⇒ <code>Date</code>
    * [.function_Date2Number(date_instance)](#$time.types.function_Date2Number) ⇒ <code>Number</code>
    * [.function_DateArray(date_array)](#$time.types.function_DateArray) ⇒ [<code>DateArray</code>](#$time.types.DateArray)
    * [.DateArray](#$time.types.DateArray) : <code>Array</code>
    * [.toLocaleStringOptions](#$time.types.toLocaleStringOptions) : <code>Object</code>


* * *

<a name="$time.types.function_Date2Date"></a>

#### types.function\_Date2Date(date_instance) ⇒ <code>Date</code>
**Kind**: static method of [<code>types</code>](#$time.types) <a name="$time.types.function_Date2Date" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L1023" title="$time.js:1023"><small>(defined@1023)</small></a>  

| Param | Type |
| --- | --- |
| date_instance | <code>Date</code> | 


* * *

<a name="$time.types.function_Date2Number"></a>

#### types.function\_Date2Number(date_instance) ⇒ <code>Number</code>
**Kind**: static method of [<code>types</code>](#$time.types) <a name="$time.types.function_Date2Number" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L1029" title="$time.js:1029"><small>(defined@1029)</small></a>  

| Param | Type |
| --- | --- |
| date_instance | <code>Date</code> | 


* * *

<a name="$time.types.function_DateArray"></a>

#### types.function\_DateArray(date_array) ⇒ [<code>DateArray</code>](#$time.types.DateArray)
**Kind**: static method of [<code>types</code>](#$time.types) <a name="$time.types.function_DateArray" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L1086" title="$time.js:1086"><small>(defined@1086)</small></a>  

| Param | Type |
| --- | --- |
| date_array | [<code>DateArray</code>](#$time.types.DateArray) | 


* * *

<a name="$time.types.DateArray"></a>

#### types.DateArray : <code>Array</code>
This is in fact output of [toDateArray](#$time.toDateArray).

**Kind**: static typedef of [<code>types</code>](#$time.types) <a name="$time.types.DateArray" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L570" title="$time.js:570"><small>(defined@570)</small></a>  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [date] | <code>String</code> | <code>&quot;&quot;</code> | is always in form of "YYYY-MM-DD" or "" |
| [time] | <code>String</code> | <code>&quot;&quot;</code> | is always in form of "HH:mm:SS" or "HH:mm:00" or "" |
| [time_zone] | <code>String</code> | <code>&quot;&quot;</code> | is always in form of "[+-]\d\d:\d\d" or "CET" or "" |


* * *

<a name="$time.types.toLocaleStringOptions"></a>

#### types.toLocaleStringOptions : <code>Object</code>
It is in fact argument for `options` in [`Date.prototype.toLocaleString` Parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString#Parameters).

**Kind**: static typedef of [<code>types</code>](#$time.types) <a name="$time.types.toLocaleStringOptions" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L643" title="$time.js:643"><small>(defined@643)</small></a>  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [locale] | <code>String</code> | <code>internal_locale</code> | In which language/national format generate final string |
| [timeZone] | <code>String</code> | <code>internal_zone</code> | Time zone name from [`ary_ianna_time_zones`](#props_ary_ianna_time_zones). |
| [declension] | <code>Boolean</code> | <code>true</code> | Needed for some languages — for example in Czech: "10. července" (`declension=true`), or "10. červenec" (`declension=false`) |


* * *

<a name="$time.format_objects"></a>

### $time.format\_objects : <code>object</code> ℗
Internal object holding predefined formating arguments for [toLocaleString](#$time.toLocaleString).

**Kind**: static namespace of [<code>$time</code>](#$time) <a name="$time.format_objects" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L16" title="$time.js:16"><small>(defined@16)</small></a>  
**Access**: private  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| time | <code>Object</code> | shows combination of 2-digits hour and minutes |
| time_seconds | <code>Object</code> | shows combination of `time` and seconds |
| date | <code>Object</code> | shows combination of 2-digits day, month and full year |
| date_time | <code>Object</code> | shows combination of `time` and `date` |
| date_time_seconds | <code>Object</code> | shows combination of `date_time` and `seconds` |

**Example**  
```js
format_objects.time==={ hour: "2-digit", minute: "2-digit" }
```

* * *

<a name="$time.format_arrays"></a>

### $time.format\_arrays : <code>object</code> ℗
Internal object holding predefined formating arguments for [getFormatObject](#$time.getFormatObject).

**Kind**: static namespace of [<code>$time</code>](#$time) <a name="$time.format_arrays" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L40" title="$time.js:40"><small>(defined@40)</small></a>  
**Access**: private  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| SQL_DATE | <code>Array</code> | Generate format of **"YYYY-MM-DD"** |
| SQL | <code>Array</code> | Generate format of **"YYYY-MM-DD HH:mm:ss"** |
| SQL_TIME | <code>Array</code> | Generate format of **"HH:mm:ss"** |

**Example**  
```js
format_arrays.YYYYMMDD=== [ ["year", "numeric"], [ "text", "-" ], ["month", "2-digit"], [ "text", "-" ], ["day", "2-digit"] ]
```

* * *

<a name="$time.Date"></a>

### $time.Date : <code>object</code>
**Kind**: static namespace of [<code>$time</code>](#$time) <a name="$time.Date" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L1248" title="$time.js:1248"><small>(defined@1248)</small></a>  
**Read only**: true  

* [.Date](#$time.Date) : <code>object</code>
    * [.addDays(days_num)](#$time.Date.addDays) ⇒ [<code>function\_Date2Date</code>](#$time.types.function_Date2Date)
    * [.addMonths(months_num)](#$time.Date.addMonths) ⇒ [<code>function\_Date2Date</code>](#$time.types.function_Date2Date)
    * [.getWeekDay([type], [toLocaleStringOptions])](#$time.Date.getWeekDay) ⇒ [<code>function\_Date2Number</code>](#$time.types.function_Date2Number)
    * [.getWeekNumber(date_instance)](#$time.Date.getWeekNumber) ⇒ <code>Number</code>


* * *

<a name="$time.Date.addDays"></a>

#### Date.addDays(days_num) ⇒ [<code>function\_Date2Date</code>](#$time.types.function_Date2Date)
This modify given **Date** instance (add days).

**Kind**: static method of [<code>Date</code>](#$time.Date) <a name="$time.Date.addDays" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L1035" title="$time.js:1035"><small>(defined@1035)</small></a>  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| days_num | <code>Number</code> | How many days to add to `date_instance` |


* * *

<a name="$time.Date.addMonths"></a>

#### Date.addMonths(months_num) ⇒ [<code>function\_Date2Date</code>](#$time.types.function_Date2Date)
This modify given **Date** instance (add months).

**Kind**: static method of [<code>Date</code>](#$time.Date) <a name="$time.Date.addMonths" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L1046" title="$time.js:1046"><small>(defined@1046)</small></a>  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| months_num | <code>Number</code> | How many months to add to `date_instance` |


* * *

<a name="$time.Date.getWeekDay"></a>

#### Date.getWeekDay([type], [toLocaleStringOptions]) ⇒ [<code>function\_Date2Number</code>](#$time.types.function_Date2Number)
**Kind**: static method of [<code>Date</code>](#$time.Date) <a name="$time.Date.getWeekDay" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L1057" title="$time.js:1057"><small>(defined@1057)</small></a>  
**Returns**: [<code>function\_Date2Number</code>](#$time.types.function_Date2Number) - If `type="numeric"`, it returns **0 (Su) - 6 (Sa)**, else it returns **name of week day**  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [type] | <code>String</code> | <code>&quot;numeric&quot;</code> | Show week numebr by default or se `weekday` in **MDN** see [toLocaleStringOptions](#$time.types.toLocaleStringOptions) |
| [toLocaleStringOptions] | [<code>toLocaleStringOptions</code>](#$time.types.toLocaleStringOptions) |  | Key `declension` is redutant for this function |


* * *

<a name="$time.Date.getWeekNumber"></a>

#### Date.getWeekNumber(date_instance) ⇒ <code>Number</code>
This return ISO number of week.

**Kind**: static method of [<code>Date</code>](#$time.Date) <a name="$time.Date.getWeekNumber" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L1068" title="$time.js:1068"><small>(defined@1068)</small></a>  
**Returns**: <code>Number</code> - In fact, it calculates no. of thursdays from this week to the first one (January 4 is always in week 1.)  
**Access**: public  

| Param | Type |
| --- | --- |
| date_instance | <code>Date</code> | 


* * *

<a name="$time.formats"></a>

### $time.formats : <code>object</code>
Public name of [format_arrays](#$time.format_arrays).

**Kind**: static namespace of [<code>$time</code>](#$time) <a name="$time.formats" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L1261" title="$time.js:1261"><small>(defined@1261)</small></a>  
**Read only**: true  

* * *

<a name="$time.ordinal_numbers"></a>

### $time.ordinal\_numbers ℗
Internal helper array for [getOrdinalSuffix](#$time.getOrdinalSuffix).

**Kind**: static constant of [<code>$time</code>](#$time) <a name="$time.ordinal_numbers" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L68" title="$time.js:68"><small>(defined@68)</small></a>  
**Access**: private  
**Read only**: true  
**Properties**

| Name | Type |
| --- | --- |
| ordinal_numbers | <code>Array</code> | 


* * *

<a name="$time.ary_ianna_time_zones"></a>

### $time.ary\_ianna\_time\_zones ℗
This array stores all time zones names (eg. 'Europe/Andorra') supported by `{ timeZone: ... }` in second argument of `Date.prototype.toLocaleString`.

Original from [stackoverflow.com/a/54500197](https://stackoverflow.com/a/54500197).

**Kind**: static constant of [<code>$time</code>](#$time) <a name="$time.ary_ianna_time_zones" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L107" title="$time.js:107"><small>(defined@107)</small></a>  
**Access**: private  
**Read only**: true  
**Properties**

| Name | Type |
| --- | --- |
| ary_ianna_time_zones | <code>Array</code> | 


* * *

<a name="$time.ary_ianna_time_offsets"></a>

### $time.ary\_ianna\_time\_offsets ℗
This object stores offsets in `ary_ianna_time_zones` (keys) and one corresponding index.

So for exmple, `ary_ianna_time_offsets["CET"]` is equal to **284** which is index of `ary_ianna_time_zones[284]==='Europe/Prague'` (in winter "+01:00" and in summer "+02:00").

Next example is `ary_ianna_time_offsets["-01:00"]` is equal to **238** which is index of `ary_ianna_time_zones[238]==='Atlantic/Cape_Verde'` (always "-01:00").

**IMPORTANT NOTE:** BST, EET, WET hasn't been validated! … idea is to behave the same way like CET

**Kind**: static constant of [<code>$time</code>](#$time) <a name="$time.ary_ianna_time_offsets" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L467" title="$time.js:467"><small>(defined@467)</small></a>  
**Access**: private  
**Properties**

| Name | Type |
| --- | --- |
| ary_ianna_time_offsets | <code>Object</code> | 


* * *

<a name="$time.isDateString"></a>

### $time.isDateString(date_string) ⇒ <code>Boolean</code> ℗
Very simple test for 'YYYY-MM-DD' pattern. Returns `true` if `date_string` includes **`-`**.

**Kind**: static method of [<code>$time</code>](#$time) <a name="$time.isDateString" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L70" title="$time.js:70"><small>(defined@70)</small></a>  
**Access**: private  

| Param | Type |
| --- | --- |
| date_string | <code>String</code> \| <code>String</code> | 

**Example**  
```js
isDateString("2019-05-06");//= true
isDateString("06/05/2019");//= false !!!!
```

* * *

<a name="$time.isTimeString"></a>

### $time.isTimeString(date_string) ⇒ <code>Boolean</code> ℗
Very simple test for 'T...' pattern. Returns `true` if `date_string` includes **`T`**.

**Kind**: static method of [<code>$time</code>](#$time) <a name="$time.isTimeString" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L82" title="$time.js:82"><small>(defined@82)</small></a>  
**Access**: private  

| Param | Type |
| --- | --- |
| date_string | <code>String</code> \| <code>String</code> | 

**Example**  
```js
isTimeString("T12:00:00");//= true
isTimeString("12:00:00");//= false !!!
isTimeString("Twrong");//= true !!!!
```

* * *

<a name="$time.fromDate"></a>

### $time.fromDate(date_instance) ⇒ [<code>DateArray</code>](#$time.types.DateArray)
Function generates `DateArray` from instance of `Date`.

**Kind**: static method of [<code>$time</code>](#$time) <a name="$time.fromDate" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L511" title="$time.js:511"><small>(defined@511)</small></a>  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| date_instance | <code>Date</code> | instance of `Date` class |


* * *

<a name="$time.fromDateArguments"></a>

### $time.fromDateArguments(...args) ⇒ [<code>DateArray</code>](#$time.types.DateArray)
Function generates `DateArray` from arguments to initialize `Date`.

**Kind**: static method of [<code>$time</code>](#$time) <a name="$time.fromDateArguments" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L522" title="$time.js:522"><small>(defined@522)</small></a>  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>Mixed</code> | parameters for initialize `Date` class |


* * *

<a name="$time.fromNow"></a>

### $time.fromNow() ⇒ [<code>DateArray</code>](#$time.types.DateArray)
Function generates `DateArray` from current date and time.

**Warning:** Internally uses `toISOString` method so result is always converted to "+00:00": `p($time.fromNow, $time.setTimeZone("+02:00"), $time.toString())()` (`p` is some pipe function) — this returns "2019-07-10T16:48:43+02:00" instead of "2019-07-10T18:48:43+02:00" (current time) … the flow is "2019-07-10T18:48:43+02:00"-`fromNow`->"2019-07-10T16:48:43Z"-`setTimeZone`->"2019-07-10T16:48:43+02:00".

**Kind**: static method of [<code>$time</code>](#$time) <a name="$time.fromNow" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L533" title="$time.js:533"><small>(defined@533)</small></a>  
**Access**: public  

* * *

<a name="$time.fromString"></a>

### $time.fromString(timestamp_string, [timezone]) ⇒ [<code>DateArray</code>](#$time.types.DateArray)
Function generates `DateArray` from passed string.

**Kind**: static method of [<code>$time</code>](#$time) <a name="$time.fromString" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L545" title="$time.js:545"><small>(defined@545)</small></a>  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| timestamp_string | <code>String</code> |  | <br/>- Supported forms are combinations of date ("YYYY-MM-DD", "DD/MM/YYYY"), time ("HH:mm:ss", "HH:mm") and timezone ("CET", "+01:00", "-02:00", ...)  <br/>- Typically: "2019-06-02 12:35:45 +01:00", "2019-06-02T12:35:45+01:00", "12:35:45+01:00 2019-06-02", ... |
| [timezone] | <code>String</code> | <code>internal_zone</code> | Default timezone — uses if is not setted in `timestamp_string` |


* * *

<a name="$time.toDateArray"></a>

### $time.toDateArray(timestamp_string) ⇒ [<code>DateArray</code>](#$time.types.DateArray) ℗
Function generates array in a form `[ date, time, time_zone ]` from 'ISO' like string.

**Kind**: static method of [<code>$time</code>](#$time) <a name="$time.toDateArray" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L579" title="$time.js:579"><small>(defined@579)</small></a>  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| timestamp_string | <code>String</code> | <br/>- Supported forms are combinations of date ("YYYY-MM-DD", "DD/MM/YYYY"), time ("HH:mm:ss", "HH:mm") and timezone ("CET", "+01:00", "-02:00", ...)  <br/>- Typically: "2019-06-02 12:35:45 +01:00", "2019-06-02T12:35:45+01:00", "12:35:45+01:00 2019-06-02", ... |


* * *

<a name="$time.toStringFromObject"></a>

### $time.toStringFromObject(format, params_obj) ⇒ <code>function</code> ℗
Function generates text based on `format`, `locale` and `timeZone` from `DateArray`.

**Kind**: static method of [<code>$time</code>](#$time) <a name="$time.toStringFromObject" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L651" title="$time.js:651"><small>(defined@651)</small></a>  
**Returns**: <code>function</code> - `(date_array: `**[DateArray](#$time.types.DateArray)**`)` ⇒ **Srting**  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| format | <code>Array</code> | <br/>- Placeholder for replace/generate final string (eg. [[ "month", "2-digits" ]]===two digits month) <br/>- see [getFormatObject](#$time.getFormatObject) and [format_arrays](#$time.format_arrays). |
| params_obj | [<code>toLocaleStringOptions</code>](#$time.types.toLocaleStringOptions) |  |

**Example**  
```js
$time.toStringFromObject("DD/MM/YYYY HH:mm:SS",{ locale: "en-GB" })($time.fromNow());//= "05/06/2019 09:32:20"
```

* * *

<a name="$time.getFormatObject"></a>

### $time.getFormatObject(format_string) ⇒ <code>Array</code> ℗
Generates multidimensional array for formatting (eg. "YYYY"=> `[ [ "year", "numeric" ] ]`).

**Kind**: static method of [<code>$time</code>](#$time) <a name="$time.getFormatObject" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L688" title="$time.js:688"><small>(defined@688)</small></a>  
**Returns**: <code>Array</code> - <br/>- `[ [ operation, argument, params ] ]`
<br/>- `Opertions` are in fact arguments for [`Date.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) and `arguments` are their values.  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| format_string | <code>String</code> | - supports "YYYY", "YY", "MM", "MMM", "MMMM", "dddd" (weekday - Monday), "ddd" (shorter weekday - Mon), "dd" (Mo), "d" (0===Sun <> 6===Sat), "DD", "D", "Do", "HH", "H", "mm", "m", "SS", "S", "W", "Wo" |


* * *

<a name="$time.toDate"></a>

### $time.toDate(date_array) ⇒ <code>Date</code>
Function initializes `Date` from `DateArray`.

**Kind**: static method of [<code>$time</code>](#$time) <a name="$time.toDate" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L818" title="$time.js:818"><small>(defined@818)</small></a>  
**Access**: public  

| Param | Type |
| --- | --- |
| date_array | [<code>DateArray</code>](#$time.types.DateArray) | 


* * *

<a name="$time.toLocaleString"></a>

### $time.toLocaleString([format_object_name], [toLocaleStringOptions]) ⇒ <code>function</code>
It is wrapper arround [`Date.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString).

**Kind**: static method of [<code>$time</code>](#$time) <a name="$time.toLocaleString" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L833" title="$time.js:833"><small>(defined@833)</small></a>  
**Returns**: <code>function</code> - <br/>- **`date_array`&lt;DateArray&gt;`=>` &lt;String&gt;**
<br/>- returns result of [`Date.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString);  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [format_object_name] | <code>String</code> | <code>&quot;date_time&quot;</code> | name of predefined time/date combinations see [`format_objects`](#props_format_objects). |
| [toLocaleStringOptions] | [<code>toLocaleStringOptions</code>](#$time.types.toLocaleStringOptions) |  |  |


* * *

<a name="$time.toString"></a>

### $time.toString(format, params_obj) ⇒ <code>function</code>
Function generates text based on `format`, `locale` and `timeZone` from `DateArray`.

**Kind**: static method of [<code>$time</code>](#$time) <a name="$time.toString" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L887" title="$time.js:887"><small>(defined@887)</small></a>  
**Returns**: <code>function</code> - - `DateArray`=> **&lt;String&gt;**  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| format | <code>String</code> \| <code>Array</code> | - **Default: `$time.formats.SQL`**  - Placeholder for replace/generate final string (eg. "MM"===two digits month) — see [`getFormatObject`](#methods_getFormatObject).  - Or lists of predefined formats — see [`formats`](#props_formats). |
| params_obj | <code>DateArray</code> | - It is in fact argument for [`Date.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) |
| params_obj.locale | <code>String</code> | - In which language/national format generate final string |
| params_obj.timeZone | <code>String</code> | - Time zone name from [`ary_ianna_time_zones`](#props_ary_ianna_time_zones). |
| params_obj.declension | <code>String</code> | - **default: true**  - Needed for some languages — for example in Czech: "10. července" (`declension=true`), or "10. červenec" (`declension=false`) |

**Example**  
```js
$time.toString("DD/MM/YYYY HH:mm:SS",{ locale: "en-GB" })($time.fromNow());//= "05/06/2019 09:32:20"
     $time.toString($time.formats.SQL)($time.fromNow());//= "2019-06-05 09:32:20"
```

* * *

<a name="$time.getTimeZone"></a>

### $time.getTimeZone(date, parameters) ⇒ <code>String</code>
**Kind**: static method of [<code>$time</code>](#$time) <a name="$time.getTimeZone" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L929" title="$time.js:929"><small>(defined@929)</small></a>  
**Returns**: <code>String</code> - - Timezone name/identificator (with offset)  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>DateArray</code> | - See [toDateArray](#methods_toDateArray). |
| parameters | <code>Object</code> |  |
| parameters.locale | <code>String</code> | - **Default: internal_locale** |
| parameters.description | <code>String</code> | - **Default: "long"**  - The representation of the time zone name. Possible values are:      - `"none"` skip description      - `"long"` (e.g., `British Summer Time`)      - `"short"` (e.g., `GMT+1`) |
| parameters.offset | <code>String</code> | - **Default: false**  - show offset part: `"UTC+01:00 (…)"` or `"UTC+01:00"` (if `description="none"`) |


* * *

<a name="$time.getCurrentTimeZone"></a>

### $time.getCurrentTimeZone(parameters) ⇒ <code>String</code>
**Kind**: static method of [<code>$time</code>](#$time) <a name="$time.getCurrentTimeZone" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L958" title="$time.js:958"><small>(defined@958)</small></a>  
**Returns**: <code>String</code> - - Timezone name/identificator (with offset) for current timezone  

| Param | Type | Description |
| --- | --- | --- |
| parameters | <code>Object</code> |  |
| parameters.locale | <code>String</code> | - **Default: internal_locale** |
| parameters.description | <code>String</code> | - **Default: "long"**  - The representation of the time zone name. Possible values are:      - `"none"` skip description      - `"long"` (e.g., `British Summer Time`)      - `"short"` (e.g., `GMT+1`)      - `"ianna"`/`"IANNA"` (e.g. `Europe/Prague`): `locale` has no effect for this |
| parameters.offset | <code>String</code> | - **Default: false**  - show offset part: `"UTC+01:00 (…)"` or `"UTC+01:00"` (if `description="none"`) |


* * *

<a name="$time.modify"></a>

### $time.modify(mod_obj) ⇒ [<code>function\_DateArray</code>](#$time.types.function_DateArray)
Curried method `mod_obj=> date_array=> result` – `mod_obj` holds information how modify given `date_array` **&lt;DateArray&gt;**. Result is again **&lt;DateArray&gt;**.

**Kind**: static method of [<code>$time</code>](#$time) <a name="$time.modify" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L1092" title="$time.js:1092"><small>(defined@1092)</small></a>  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| mod_obj | <code>Object</code> | <br/>- object literal representing requested operations <br/>- use name convention like [setters for `Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#Setter) (only one argument is allowed) <br/>- supports also *add\** commands with the same notation ("setMonth" => "addMonth") <br/>- **IMPORTANT NOTE:** There are three behaviour changes <br/>&nbsp;&nbsp;&nbsp;&nbsp;- "setMonth" is indexed from 1 (instead of 0) <br/>&nbsp;&nbsp;&nbsp;&nbsp;- for "setDate" there is alias "setDay" <br/>&nbsp;&nbsp;&nbsp;&nbsp;- for "addDate" there is alias "addDays" <br/>- Some operations: **"\*Date"** (or **"setDay"**, **"addDays"**), **"\*Month"**, **"\*FullYear"**, **"\*Hours"**, **"\*Minutes"**, **"\*Seconds"** |


* * *

<a name="$time.modifyAdditions"></a>

### $time.modifyAdditions(operation, value, dateObject) ⇒ <code>Date</code> ℗
Helper method for invoking "add*" operations in [`modify`](#methods_modify).

In general `d.set...(d.get...+${value})` (where `d` is instance of `Date`).

**Kind**: static method of [<code>$time</code>](#$time) <a name="$time.modifyAdditions" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L1122" title="$time.js:1122"><small>(defined@1122)</small></a>  
**Returns**: <code>Date</code> - returns `dateObject`  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| operation | <code>String</code> | e.g. "addMonth" |
| value | <code>Number</code> | mainly argument (number) for |
| dateObject | <code>Date</code> | instance of `Date` |


* * *

<a name="$time.double"></a>

### $time.double(time) ⇒ <code>String</code>
Function adds leading zero to the `time`. [It can be replaced in future: see `padStart`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)

**Kind**: static method of [<code>$time</code>](#$time) <a name="$time.double" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L1143" title="$time.js:1143"><small>(defined@1143)</small></a>  
**Returns**: <code>String</code> - * 00, 01, 02, ..., 09, 10, ..., 100, ...  
**Access**: public  

| Param | Type |
| --- | --- |
| time | <code>Number</code> \| <code>String</code> | 


* * *

<a name="$time.daysInMonth"></a>

### $time.daysInMonth(month, year) ⇒ <code>Number</code>
Returns number of days in given month (and year)

**Kind**: static method of [<code>$time</code>](#$time) <a name="$time.daysInMonth" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L1156" title="$time.js:1156"><small>(defined@1156)</small></a>  
**Returns**: <code>Number</code> - - total of days  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| month | <code>String</code> \| <code>Number</code> | - ISO number of month (eg 01 or 1 for January) |
| year | <code>String</code> \| <code>Number</code> | - **Default: current year**  - ISO nimber of year (eg. 2019) |


* * *

<a name="$time.getDaysInMonth"></a>

### $time.getDaysInMonth(date_array) ⇒ <code>Number</code>
Returns number of days in given month

**Kind**: static method of [<code>$time</code>](#$time) <a name="$time.getDaysInMonth" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L1172" title="$time.js:1172"><small>(defined@1172)</small></a>  
**Returns**: <code>Number</code> - - total of days  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| date_array | <code>DateArray</code> | - **Default: current date**  - see [`toDateArray`](#methods_toDateArray) |


* * *

<a name="$time.getMonthName"></a>

### $time.getMonthName(n, [l]) ⇒ <code>String</code>
**Kind**: static method of [<code>$time</code>](#$time) <a name="$time.getMonthName" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L1187" title="$time.js:1187"><small>(defined@1187)</small></a>  
**Returns**: <code>String</code> - * English month name  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| n | <code>Number</code> | * Month number (typically [1-12])  * Works cyclically `13===1, ...` |
| [l] | <code>Number</code> \| <code>Boolean</code> | * Length of output Month name |

**Example**  
```js
console.log($time.getMonthName(5));//"May"
    console.log($time.getMonthName(24, 4));//"Dece"
```

* * *

<a name="$time.getOrdinalSuffix"></a>

### $time.getOrdinalSuffix(n) ⇒ <code>String</code>
See [`ordinal_numbers`](#props_ordinal_numbers).

**Kind**: static method of [<code>$time</code>](#$time) <a name="$time.getOrdinalSuffix" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L1213" title="$time.js:1213"><small>(defined@1213)</small></a>  
**Returns**: <code>String</code> - * `n`+English suffix  
**Access**: public  

| Param | Type |
| --- | --- |
| n | <code>Number</code> | 

**Example**  
```js
console.log($time.getOrdinalSuffix(1));//"1st"
```

* * *

