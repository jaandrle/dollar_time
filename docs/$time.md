<a name="module_jaaJSU"></a>

## jaaJSU

* [jaaJSU](#module_jaaJSU)
    * [~$time](#module_jaaJSU..$time) : <code>object</code>
        * [._](#module_jaaJSU..$time._)
        * [.format_objects](#module_jaaJSU..$time.format_objects) : <code>object</code> ℗
        * [.format_arrays](#module_jaaJSU..$time.format_arrays) : <code>object</code> ℗
        * [.Date](#module_jaaJSU..$time.Date) : <code>object</code>
            * [.addDays(days_num)](#module_jaaJSU..$time.Date.addDays) ⇒ [<code>function\_Date2Date</code>](#module_jaaJSU..$time.function_Date2Date)
            * [.addMonths(months_num)](#module_jaaJSU..$time.Date.addMonths) ⇒ [<code>function\_Date2Date</code>](#module_jaaJSU..$time.function_Date2Date)
            * [.getWeekDay([type], [toLocaleStringOptions])](#module_jaaJSU..$time.Date.getWeekDay) ⇒ [<code>function\_Date2Number</code>](#module_jaaJSU..$time.function_Date2Number)
            * [.getWeekNumber(date_instance)](#module_jaaJSU..$time.Date.getWeekNumber) ⇒ <code>Number</code>
        * [.formats](#module_jaaJSU..$time.formats) : <code>object</code>
        * [.ordinal_numbers](#module_jaaJSU..$time.ordinal_numbers) ℗
        * [.ary_ianna_time_zones](#module_jaaJSU..$time.ary_ianna_time_zones) ℗
        * [.ary_ianna_time_offsets](#module_jaaJSU..$time.ary_ianna_time_offsets) ℗
        * [.isDateString(date_string)](#module_jaaJSU..$time.isDateString) ⇒ <code>Boolean</code> ℗
        * [.isTimeString(date_string)](#module_jaaJSU..$time.isTimeString) ⇒ <code>Boolean</code> ℗
        * [.fromDate(date_instance)](#module_jaaJSU..$time.fromDate) ⇒ [<code>DateArray</code>](#module_jaaJSU..$time.DateArray)
        * [.fromDateArguments(...args)](#module_jaaJSU..$time.fromDateArguments) ⇒ [<code>DateArray</code>](#module_jaaJSU..$time.DateArray)
        * [.fromNow()](#module_jaaJSU..$time.fromNow) ⇒ [<code>DateArray</code>](#module_jaaJSU..$time.DateArray)
        * [.fromString([timestamp_string], [timezone])](#module_jaaJSU..$time.fromString) ⇒ [<code>DateArray</code>](#module_jaaJSU..$time.DateArray)
        * [.toDateArray(timestamp_string)](#module_jaaJSU..$time.toDateArray) ⇒ [<code>DateArray</code>](#module_jaaJSU..$time.DateArray) ℗
        * [.toStringFromObject(format, params_obj)](#module_jaaJSU..$time.toStringFromObject) ⇒ [<code>function\_DateArray2String</code>](#module_jaaJSU..$time.function_DateArray2String) ℗
        * [.getFormatObject(format_string)](#module_jaaJSU..$time.getFormatObject) ⇒ [<code>Array.&lt;ArrayOfOperation&gt;</code>](#module_jaaJSU..$time.ArrayOfOperation) ℗
        * [.toDate(date_array)](#module_jaaJSU..$time.toDate) ⇒ <code>Date</code>
        * [.toLocaleString([format_object_name], [toLocaleStringOptions])](#module_jaaJSU..$time.toLocaleString) ⇒ [<code>function\_DateArray2String</code>](#module_jaaJSU..$time.function_DateArray2String)
        * [.function_DateArray2String(date_array)](#module_jaaJSU..$time.function_DateArray2String) ⇒ <code>String</code>
        * [.toString([format], [toLocaleStringOptions])](#module_jaaJSU..$time.toString) ⇒ [<code>function\_DateArray2String</code>](#module_jaaJSU..$time.function_DateArray2String)
        * [.getTimeZone(date, parameters)](#module_jaaJSU..$time.getTimeZone) ⇒ <code>String</code>
        * [.getCurrentTimeZone(parameters)](#module_jaaJSU..$time.getCurrentTimeZone) ⇒ <code>String</code>
        * [.modify(mod_obj)](#module_jaaJSU..$time.modify) ⇒ [<code>function\_DateArray2DateArray</code>](#module_jaaJSU..$time.function_DateArray2DateArray)
        * [.modifyAdditions(operation, value, dateObject)](#module_jaaJSU..$time.modifyAdditions) ⇒ <code>Date</code> ℗
        * [.double(time)](#module_jaaJSU..$time.double) ⇒ <code>String</code>
        * [.daysInMonth(month, [year])](#module_jaaJSU..$time.daysInMonth) ⇒ <code>Number</code>
        * [.getDaysInMonth([date_array])](#module_jaaJSU..$time.getDaysInMonth) ⇒ <code>Number</code>
        * [.getMonthName(n, [l])](#module_jaaJSU..$time.getMonthName) ⇒ <code>String</code>
        * [.getOrdinalSuffix(n)](#module_jaaJSU..$time.getOrdinalSuffix) ⇒ <code>String</code>
        * _virtual_
            * [.function_Date2Date(date_instance)](#module_jaaJSU..$time.function_Date2Date) ⇒ <code>Date</code>
            * [.function_Date2Number(date_instance)](#module_jaaJSU..$time.function_Date2Number) ⇒ <code>Number</code>
            * [.function_DateArray2DateArray(date_array)](#module_jaaJSU..$time.function_DateArray2DateArray) ⇒ [<code>DateArray</code>](#module_jaaJSU..$time.DateArray)
            * [.DateArray](#module_jaaJSU..$time.DateArray) : <code>Array</code>
            * [.toLocaleStringOptions](#module_jaaJSU..$time.toLocaleStringOptions) : <code>Object</code>
            * [.ArrayOfOperation](#module_jaaJSU..$time.ArrayOfOperation) : <code>Array</code>


* * *

<a name="module_jaaJSU..$time"></a>

### jaaJSU~$time : <code>object</code>
This NAMESPACE provides features for date/time. Mainly, there are utilities using **Date** class and feature [`Date.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString).

**Kind**: inner namespace of [<code>jaaJSU</code>](#module_jaaJSU) <a name="module_jaaJSU..$time" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L6" title="$time.js:6"><small>(defined@6)</small></a>  
**Category**: namespaces  
**See**: [https://github.com/jaandrle/dollar_time](https://github.com/jaandrle/dollar_time)  
**Version**: 0.6.0  

* [~$time](#module_jaaJSU..$time) : <code>object</code>
    * [._](#module_jaaJSU..$time._)
    * [.format_objects](#module_jaaJSU..$time.format_objects) : <code>object</code> ℗
    * [.format_arrays](#module_jaaJSU..$time.format_arrays) : <code>object</code> ℗
    * [.Date](#module_jaaJSU..$time.Date) : <code>object</code>
        * [.addDays(days_num)](#module_jaaJSU..$time.Date.addDays) ⇒ [<code>function\_Date2Date</code>](#module_jaaJSU..$time.function_Date2Date)
        * [.addMonths(months_num)](#module_jaaJSU..$time.Date.addMonths) ⇒ [<code>function\_Date2Date</code>](#module_jaaJSU..$time.function_Date2Date)
        * [.getWeekDay([type], [toLocaleStringOptions])](#module_jaaJSU..$time.Date.getWeekDay) ⇒ [<code>function\_Date2Number</code>](#module_jaaJSU..$time.function_Date2Number)
        * [.getWeekNumber(date_instance)](#module_jaaJSU..$time.Date.getWeekNumber) ⇒ <code>Number</code>
    * [.formats](#module_jaaJSU..$time.formats) : <code>object</code>
    * [.ordinal_numbers](#module_jaaJSU..$time.ordinal_numbers) ℗
    * [.ary_ianna_time_zones](#module_jaaJSU..$time.ary_ianna_time_zones) ℗
    * [.ary_ianna_time_offsets](#module_jaaJSU..$time.ary_ianna_time_offsets) ℗
    * [.isDateString(date_string)](#module_jaaJSU..$time.isDateString) ⇒ <code>Boolean</code> ℗
    * [.isTimeString(date_string)](#module_jaaJSU..$time.isTimeString) ⇒ <code>Boolean</code> ℗
    * [.fromDate(date_instance)](#module_jaaJSU..$time.fromDate) ⇒ [<code>DateArray</code>](#module_jaaJSU..$time.DateArray)
    * [.fromDateArguments(...args)](#module_jaaJSU..$time.fromDateArguments) ⇒ [<code>DateArray</code>](#module_jaaJSU..$time.DateArray)
    * [.fromNow()](#module_jaaJSU..$time.fromNow) ⇒ [<code>DateArray</code>](#module_jaaJSU..$time.DateArray)
    * [.fromString([timestamp_string], [timezone])](#module_jaaJSU..$time.fromString) ⇒ [<code>DateArray</code>](#module_jaaJSU..$time.DateArray)
    * [.toDateArray(timestamp_string)](#module_jaaJSU..$time.toDateArray) ⇒ [<code>DateArray</code>](#module_jaaJSU..$time.DateArray) ℗
    * [.toStringFromObject(format, params_obj)](#module_jaaJSU..$time.toStringFromObject) ⇒ [<code>function\_DateArray2String</code>](#module_jaaJSU..$time.function_DateArray2String) ℗
    * [.getFormatObject(format_string)](#module_jaaJSU..$time.getFormatObject) ⇒ [<code>Array.&lt;ArrayOfOperation&gt;</code>](#module_jaaJSU..$time.ArrayOfOperation) ℗
    * [.toDate(date_array)](#module_jaaJSU..$time.toDate) ⇒ <code>Date</code>
    * [.toLocaleString([format_object_name], [toLocaleStringOptions])](#module_jaaJSU..$time.toLocaleString) ⇒ [<code>function\_DateArray2String</code>](#module_jaaJSU..$time.function_DateArray2String)
    * [.function_DateArray2String(date_array)](#module_jaaJSU..$time.function_DateArray2String) ⇒ <code>String</code>
    * [.toString([format], [toLocaleStringOptions])](#module_jaaJSU..$time.toString) ⇒ [<code>function\_DateArray2String</code>](#module_jaaJSU..$time.function_DateArray2String)
    * [.getTimeZone(date, parameters)](#module_jaaJSU..$time.getTimeZone) ⇒ <code>String</code>
    * [.getCurrentTimeZone(parameters)](#module_jaaJSU..$time.getCurrentTimeZone) ⇒ <code>String</code>
    * [.modify(mod_obj)](#module_jaaJSU..$time.modify) ⇒ [<code>function\_DateArray2DateArray</code>](#module_jaaJSU..$time.function_DateArray2DateArray)
    * [.modifyAdditions(operation, value, dateObject)](#module_jaaJSU..$time.modifyAdditions) ⇒ <code>Date</code> ℗
    * [.double(time)](#module_jaaJSU..$time.double) ⇒ <code>String</code>
    * [.daysInMonth(month, [year])](#module_jaaJSU..$time.daysInMonth) ⇒ <code>Number</code>
    * [.getDaysInMonth([date_array])](#module_jaaJSU..$time.getDaysInMonth) ⇒ <code>Number</code>
    * [.getMonthName(n, [l])](#module_jaaJSU..$time.getMonthName) ⇒ <code>String</code>
    * [.getOrdinalSuffix(n)](#module_jaaJSU..$time.getOrdinalSuffix) ⇒ <code>String</code>
    * _virtual_
        * [.function_Date2Date(date_instance)](#module_jaaJSU..$time.function_Date2Date) ⇒ <code>Date</code>
        * [.function_Date2Number(date_instance)](#module_jaaJSU..$time.function_Date2Number) ⇒ <code>Number</code>
        * [.function_DateArray2DateArray(date_array)](#module_jaaJSU..$time.function_DateArray2DateArray) ⇒ [<code>DateArray</code>](#module_jaaJSU..$time.DateArray)
        * [.DateArray](#module_jaaJSU..$time.DateArray) : <code>Array</code>
        * [.toLocaleStringOptions](#module_jaaJSU..$time.toLocaleStringOptions) : <code>Object</code>
        * [.ArrayOfOperation](#module_jaaJSU..$time.ArrayOfOperation) : <code>Array</code>


* * *

<a name="module_jaaJSU..$time._"></a>

#### $time.\_
Alias for `undefined` which can be used to trigger default value of argument.

**Kind**: static property of [<code>$time</code>](#module_jaaJSU..$time) <a name="module_jaaJSU..$time._" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L1226" title="$time.js:1226"><small>(defined@1226)</small></a>  
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

<a name="module_jaaJSU..$time.format_objects"></a>

#### $time.format\_objects : <code>object</code> ℗
Internal object holding predefined formating arguments for [toLocaleString](#module_jaaJSU..$time.toLocaleString).

**Kind**: static namespace of [<code>$time</code>](#module_jaaJSU..$time) <a name="module_jaaJSU..$time.format_objects" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L16" title="$time.js:16"><small>(defined@16)</small></a>  
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

<a name="module_jaaJSU..$time.format_arrays"></a>

#### $time.format\_arrays : <code>object</code> ℗
Internal object holding predefined formating arguments for [getFormatObject](#module_jaaJSU..$time.getFormatObject).

**Kind**: static namespace of [<code>$time</code>](#module_jaaJSU..$time) <a name="module_jaaJSU..$time.format_arrays" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L40" title="$time.js:40"><small>(defined@40)</small></a>  
**Access**: private  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| SQL_DATE | [<code>Array.&lt;ArrayOfOperation&gt;</code>](#module_jaaJSU..$time.ArrayOfOperation) | Generate format of **"YYYY-MM-DD"** |
| SQL | [<code>Array.&lt;ArrayOfOperation&gt;</code>](#module_jaaJSU..$time.ArrayOfOperation) | Generate format of **"YYYY-MM-DD HH:mm:ss"** |
| SQL_TIME | [<code>Array.&lt;ArrayOfOperation&gt;</code>](#module_jaaJSU..$time.ArrayOfOperation) | Generate format of **"HH:mm:ss"** |

**Example**  
```js
format_arrays.YYYYMMDD=== [ ["year", "numeric"], [ "text", "-" ], ["month", "2-digit"], [ "text", "-" ], ["day", "2-digit"] ]
```

* * *

<a name="module_jaaJSU..$time.Date"></a>

#### $time.Date : <code>object</code>
**Kind**: static namespace of [<code>$time</code>](#module_jaaJSU..$time) <a name="module_jaaJSU..$time.Date" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L1234" title="$time.js:1234"><small>(defined@1234)</small></a>  
**Read only**: true  

* [.Date](#module_jaaJSU..$time.Date) : <code>object</code>
    * [.addDays(days_num)](#module_jaaJSU..$time.Date.addDays) ⇒ [<code>function\_Date2Date</code>](#module_jaaJSU..$time.function_Date2Date)
    * [.addMonths(months_num)](#module_jaaJSU..$time.Date.addMonths) ⇒ [<code>function\_Date2Date</code>](#module_jaaJSU..$time.function_Date2Date)
    * [.getWeekDay([type], [toLocaleStringOptions])](#module_jaaJSU..$time.Date.getWeekDay) ⇒ [<code>function\_Date2Number</code>](#module_jaaJSU..$time.function_Date2Number)
    * [.getWeekNumber(date_instance)](#module_jaaJSU..$time.Date.getWeekNumber) ⇒ <code>Number</code>


* * *

<a name="module_jaaJSU..$time.Date.addDays"></a>

##### Date.addDays(days_num) ⇒ [<code>function\_Date2Date</code>](#module_jaaJSU..$time.function_Date2Date)
This modify given **Date** instance (add days).

**Kind**: static method of [<code>Date</code>](#module_jaaJSU..$time.Date) <a name="module_jaaJSU..$time.Date.addDays" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L1031" title="$time.js:1031"><small>(defined@1031)</small></a>  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| days_num | <code>Number</code> | How many days to add to `date_instance` |


* * *

<a name="module_jaaJSU..$time.Date.addMonths"></a>

##### Date.addMonths(months_num) ⇒ [<code>function\_Date2Date</code>](#module_jaaJSU..$time.function_Date2Date)
This modify given **Date** instance (add months).

**Kind**: static method of [<code>Date</code>](#module_jaaJSU..$time.Date) <a name="module_jaaJSU..$time.Date.addMonths" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L1042" title="$time.js:1042"><small>(defined@1042)</small></a>  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| months_num | <code>Number</code> | How many months to add to `date_instance` |


* * *

<a name="module_jaaJSU..$time.Date.getWeekDay"></a>

##### Date.getWeekDay([type], [toLocaleStringOptions]) ⇒ [<code>function\_Date2Number</code>](#module_jaaJSU..$time.function_Date2Number)
**Kind**: static method of [<code>Date</code>](#module_jaaJSU..$time.Date) <a name="module_jaaJSU..$time.Date.getWeekDay" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L1053" title="$time.js:1053"><small>(defined@1053)</small></a>  
**Returns**: [<code>function\_Date2Number</code>](#module_jaaJSU..$time.function_Date2Number) - If `type="numeric"`, it returns **0 (Su) - 6 (Sa)**, else it returns **name of week day**  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [type] | <code>String</code> | <code>&quot;numeric&quot;</code> | Show week numebr by default or se `weekday` in **MDN** see [toLocaleStringOptions](#module_jaaJSU..$time.toLocaleStringOptions) |
| [toLocaleStringOptions] | [<code>toLocaleStringOptions</code>](#module_jaaJSU..$time.toLocaleStringOptions) |  | Key `declension` is redutant for this function |


* * *

<a name="module_jaaJSU..$time.Date.getWeekNumber"></a>

##### Date.getWeekNumber(date_instance) ⇒ <code>Number</code>
This return ISO number of week.

**Kind**: static method of [<code>Date</code>](#module_jaaJSU..$time.Date) <a name="module_jaaJSU..$time.Date.getWeekNumber" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L1064" title="$time.js:1064"><small>(defined@1064)</small></a>  
**Returns**: <code>Number</code> - In fact, it calculates no. of thursdays from this week to the first one (January 4 is always in week 1.)  
**Access**: public  

| Param | Type |
| --- | --- |
| date_instance | <code>Date</code> | 


* * *

<a name="module_jaaJSU..$time.formats"></a>

#### $time.formats : <code>object</code>
Public name of [format_arrays](#module_jaaJSU..$time.format_arrays).

**Kind**: static namespace of [<code>$time</code>](#module_jaaJSU..$time) <a name="module_jaaJSU..$time.formats" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L1247" title="$time.js:1247"><small>(defined@1247)</small></a>  
**Read only**: true  

* * *

<a name="module_jaaJSU..$time.ordinal_numbers"></a>

#### $time.ordinal\_numbers ℗
Internal helper array for [getOrdinalSuffix](#module_jaaJSU..$time.getOrdinalSuffix).

**Kind**: static constant of [<code>$time</code>](#module_jaaJSU..$time) <a name="module_jaaJSU..$time.ordinal_numbers" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L68" title="$time.js:68"><small>(defined@68)</small></a>  
**Access**: private  
**Read only**: true  
**Properties**

| Name | Type |
| --- | --- |
| ordinal_numbers | <code>Array</code> | 


* * *

<a name="module_jaaJSU..$time.ary_ianna_time_zones"></a>

#### $time.ary\_ianna\_time\_zones ℗
This array stores all time zones names (eg. 'Europe/Andorra') supported by `{ timeZone: ... }` in second argument of `Date.prototype.toLocaleString`.

Original from [stackoverflow.com/a/54500197](https://stackoverflow.com/a/54500197).

**Kind**: static constant of [<code>$time</code>](#module_jaaJSU..$time) <a name="module_jaaJSU..$time.ary_ianna_time_zones" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L107" title="$time.js:107"><small>(defined@107)</small></a>  
**Access**: private  
**Read only**: true  
**Properties**

| Name | Type |
| --- | --- |
| ary_ianna_time_zones | <code>Array</code> | 


* * *

<a name="module_jaaJSU..$time.ary_ianna_time_offsets"></a>

#### $time.ary\_ianna\_time\_offsets ℗
This object stores offsets in `ary_ianna_time_zones` (keys) and one corresponding index.

So for exmple, `ary_ianna_time_offsets["CET"]` is equal to **284** which is index of `ary_ianna_time_zones[284]==='Europe/Prague'` (in winter "+01:00" and in summer "+02:00").

Next example is `ary_ianna_time_offsets["-01:00"]` is equal to **238** which is index of `ary_ianna_time_zones[238]==='Atlantic/Cape_Verde'` (always "-01:00").

**IMPORTANT NOTE:** BST, EET, WET hasn't been validated! … idea is to behave the same way like CET

**Kind**: static constant of [<code>$time</code>](#module_jaaJSU..$time) <a name="module_jaaJSU..$time.ary_ianna_time_offsets" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L467" title="$time.js:467"><small>(defined@467)</small></a>  
**Access**: private  
**Properties**

| Name | Type |
| --- | --- |
| ary_ianna_time_offsets | <code>Object</code> | 


* * *

<a name="module_jaaJSU..$time.isDateString"></a>

#### $time.isDateString(date_string) ⇒ <code>Boolean</code> ℗
Very simple test for 'YYYY-MM-DD' pattern. Returns `true` if `date_string` includes **`-`**.

**Kind**: static method of [<code>$time</code>](#module_jaaJSU..$time) <a name="module_jaaJSU..$time.isDateString" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L70" title="$time.js:70"><small>(defined@70)</small></a>  
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

<a name="module_jaaJSU..$time.isTimeString"></a>

#### $time.isTimeString(date_string) ⇒ <code>Boolean</code> ℗
Very simple test for 'T...' pattern. Returns `true` if `date_string` includes **`T`**.

**Kind**: static method of [<code>$time</code>](#module_jaaJSU..$time) <a name="module_jaaJSU..$time.isTimeString" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L82" title="$time.js:82"><small>(defined@82)</small></a>  
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

<a name="module_jaaJSU..$time.fromDate"></a>

#### $time.fromDate(date_instance) ⇒ [<code>DateArray</code>](#module_jaaJSU..$time.DateArray)
Function generates `DateArray` from instance of `Date`.

**Kind**: static method of [<code>$time</code>](#module_jaaJSU..$time) <a name="module_jaaJSU..$time.fromDate" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L511" title="$time.js:511"><small>(defined@511)</small></a>  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| date_instance | <code>Date</code> | instance of `Date` class |


* * *

<a name="module_jaaJSU..$time.fromDateArguments"></a>

#### $time.fromDateArguments(...args) ⇒ [<code>DateArray</code>](#module_jaaJSU..$time.DateArray)
Function generates `DateArray` from arguments to initialize `Date`.

**Kind**: static method of [<code>$time</code>](#module_jaaJSU..$time) <a name="module_jaaJSU..$time.fromDateArguments" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L522" title="$time.js:522"><small>(defined@522)</small></a>  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>Mixed</code> | parameters for initialize `Date` class |


* * *

<a name="module_jaaJSU..$time.fromNow"></a>

#### $time.fromNow() ⇒ [<code>DateArray</code>](#module_jaaJSU..$time.DateArray)
Function generates `DateArray` from current date and time.

**Warning:** Internally uses `toISOString` method so result is always converted to "+00:00": `p($time.fromNow, $time.setTimeZone("+02:00"), $time.toString())()` (`p` is some pipe function) — this returns "2019-07-10T16:48:43+02:00" instead of "2019-07-10T18:48:43+02:00" (current time) … the flow is "2019-07-10T18:48:43+02:00"-`fromNow`->"2019-07-10T16:48:43Z"-`setTimeZone`->"2019-07-10T16:48:43+02:00".

**Kind**: static method of [<code>$time</code>](#module_jaaJSU..$time) <a name="module_jaaJSU..$time.fromNow" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L533" title="$time.js:533"><small>(defined@533)</small></a>  
**Access**: public  

* * *

<a name="module_jaaJSU..$time.fromString"></a>

#### $time.fromString([timestamp_string], [timezone]) ⇒ [<code>DateArray</code>](#module_jaaJSU..$time.DateArray)
Function generates `DateArray` from passed string.

**Kind**: static method of [<code>$time</code>](#module_jaaJSU..$time) <a name="module_jaaJSU..$time.fromString" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L545" title="$time.js:545"><small>(defined@545)</small></a>  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [timestamp_string] | <code>String</code> |  | If `undefined` returns result of [fromNow](#module_jaaJSU..$time.fromNow), else it is used [toDateArray](#module_jaaJSU..$time.toDateArray) for parsing. |
| [timezone] | <code>String</code> | <code>internal_zone</code> | Default timezone — uses if is not setted in `timestamp_string` |


* * *

<a name="module_jaaJSU..$time.toDateArray"></a>

#### $time.toDateArray(timestamp_string) ⇒ [<code>DateArray</code>](#module_jaaJSU..$time.DateArray) ℗
Function generates array in a form `[ date, time, time_zone ]` from 'ISO' like string.

**Kind**: static method of [<code>$time</code>](#module_jaaJSU..$time) <a name="module_jaaJSU..$time.toDateArray" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L577" title="$time.js:577"><small>(defined@577)</small></a>  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| timestamp_string | <code>String</code> | <br/>- Supported forms are combinations of date ("YYYY-MM-DD", "DD/MM/YYYY"), time ("HH:mm:ss", "HH:mm") and timezone ("CET", "+01:00", "-02:00", ...)  <br/>- Typically: "2019-06-02 12:35:45 +01:00", "2019-06-02T12:35:45+01:00", "12:35:45+01:00 2019-06-02", ... |


* * *

<a name="module_jaaJSU..$time.toStringFromObject"></a>

#### $time.toStringFromObject(format, params_obj) ⇒ [<code>function\_DateArray2String</code>](#module_jaaJSU..$time.function_DateArray2String) ℗
Function generates text based on `format`, `locale` and `timeZone` from `DateArray`.

**Kind**: static method of [<code>$time</code>](#module_jaaJSU..$time) <a name="module_jaaJSU..$time.toStringFromObject" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L650" title="$time.js:650"><small>(defined@650)</small></a>  
**Access**: private  

| Param | Type |
| --- | --- |
| format | [<code>Array.&lt;ArrayOfOperation&gt;</code>](#module_jaaJSU..$time.ArrayOfOperation) | 
| params_obj | [<code>toLocaleStringOptions</code>](#module_jaaJSU..$time.toLocaleStringOptions) | 

**Example**  
```js
$time.toStringFromObject([ ["day", "2-digit"], [ "text", "/" ], ["month", "2-digit"], [ "text", "/" ], ["year", "numeric"] ],{ locale: "en-GB" })($time.fromNow());//= "05/06/2019"
```

* * *

<a name="module_jaaJSU..$time.getFormatObject"></a>

#### $time.getFormatObject(format_string) ⇒ [<code>Array.&lt;ArrayOfOperation&gt;</code>](#module_jaaJSU..$time.ArrayOfOperation) ℗
Generates multidimensional array for formatting (eg. "YYYY"=> `[ [ "year", "numeric" ] ]`).

**Kind**: static method of [<code>$time</code>](#module_jaaJSU..$time) <a name="module_jaaJSU..$time.getFormatObject" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L697" title="$time.js:697"><small>(defined@697)</small></a>  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| format_string | <code>String</code> | supports: <br/>- "YYYY", "YY", <br/>- "MM", "MMM", "MMMM", <br/>- "dddd" (weekday - Monday), "ddd" (shorter weekday - Mon), "dd" (Mo), "d" (0===Sun <> 6===Sat), <br/>- "DD", "D", "Do", <br/>- "HH", "H", <br/>- "mm", "m", <br/>- "SS", "S", <br/>- "W", "Wo" |


* * *

<a name="module_jaaJSU..$time.toDate"></a>

#### $time.toDate(date_array) ⇒ <code>Date</code>
Function initializes `Date` from `DateArray`.

**Kind**: static method of [<code>$time</code>](#module_jaaJSU..$time) <a name="module_jaaJSU..$time.toDate" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L832" title="$time.js:832"><small>(defined@832)</small></a>  
**Access**: public  

| Param | Type |
| --- | --- |
| date_array | [<code>DateArray</code>](#module_jaaJSU..$time.DateArray) | 


* * *

<a name="module_jaaJSU..$time.toLocaleString"></a>

#### $time.toLocaleString([format_object_name], [toLocaleStringOptions]) ⇒ [<code>function\_DateArray2String</code>](#module_jaaJSU..$time.function_DateArray2String)
It is wrapper arround [`Date.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString).

**Kind**: static method of [<code>$time</code>](#module_jaaJSU..$time) <a name="module_jaaJSU..$time.toLocaleString" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L847" title="$time.js:847"><small>(defined@847)</small></a>  
**Returns**: [<code>function\_DateArray2String</code>](#module_jaaJSU..$time.function_DateArray2String) - returns result of [`Date.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString);  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [format_object_name] | <code>String</code> | <code>&quot;date_time&quot;</code> | name of predefined time/date combinations see [format_objects](#module_jaaJSU..$time.format_objects). |
| [toLocaleStringOptions] | [<code>toLocaleStringOptions</code>](#module_jaaJSU..$time.toLocaleStringOptions) |  |  |


* * *

<a name="module_jaaJSU..$time.function_DateArray2String"></a>

#### $time.function\_DateArray2String(date_array) ⇒ <code>String</code>
**Kind**: static method of [<code>$time</code>](#module_jaaJSU..$time) <a name="module_jaaJSU..$time.function_DateArray2String" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L899" title="$time.js:899"><small>(defined@899)</small></a>  

| Param | Type |
| --- | --- |
| date_array | [<code>DateArray</code>](#module_jaaJSU..$time.DateArray) | 


* * *

<a name="module_jaaJSU..$time.toString"></a>

#### $time.toString([format], [toLocaleStringOptions]) ⇒ [<code>function\_DateArray2String</code>](#module_jaaJSU..$time.function_DateArray2String)
Function generates text based on `format`, `locale` and `timeZone` from `DateArray`.

**Kind**: static method of [<code>$time</code>](#module_jaaJSU..$time) <a name="module_jaaJSU..$time.toString" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L905" title="$time.js:905"><small>(defined@905)</small></a>  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [format] | <code>String</code> \| [<code>Array.&lt;ArrayOfOperation&gt;</code>](#module_jaaJSU..$time.ArrayOfOperation) | <code>$time.formats.SQL</code> | <br/>- Placeholder for replace/generate final string (eg. "MM"===two digits month) — see [getFormatObject](#module_jaaJSU..$time.getFormatObject). <br/>- Or lists of predefined formats — see [formats](#module_jaaJSU..$time.formats). |
| [toLocaleStringOptions] | [<code>toLocaleStringOptions</code>](#module_jaaJSU..$time.toLocaleStringOptions) |  |  |

**Example**  
```js
$time.toString("DD/MM/YYYY HH:mm:SS",{ locale: "en-GB" })($time.fromNow());//= "05/06/2019 09:32:20"
$time.toString($time.formats.SQL)($time.fromNow());//= "2019-06-05 09:32:20"
```

* * *

<a name="module_jaaJSU..$time.getTimeZone"></a>

#### $time.getTimeZone(date, parameters) ⇒ <code>String</code>
**Kind**: static method of [<code>$time</code>](#module_jaaJSU..$time) <a name="module_jaaJSU..$time.getTimeZone" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L936" title="$time.js:936"><small>(defined@936)</small></a>  
**Returns**: <code>String</code> - Timezone name/identificator (with offset)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| date | [<code>DateArray</code>](#module_jaaJSU..$time.DateArray) |  |  |
| parameters | <code>Object</code> |  |  |
| [parameters.locale] | <code>String</code> | <code>internal_locale</code> |  |
| [parameters.description] | <code>String</code> | <code>&quot;long&quot;</code> | The representation of the time zone name. Possible values are: <br/>- `"none"` skip description <br/>- `"long"` (e.g., `British Summer Time`) <br/>- `"short"` (e.g., `GMT+1`) |
| [parameters.offset] | <code>String</code> | <code>false</code> | show offset part: `"UTC+01:00 (…)"` or `"UTC+01:00"` (if `description="none"`) |


* * *

<a name="module_jaaJSU..$time.getCurrentTimeZone"></a>

#### $time.getCurrentTimeZone(parameters) ⇒ <code>String</code>
**Kind**: static method of [<code>$time</code>](#module_jaaJSU..$time) <a name="module_jaaJSU..$time.getCurrentTimeZone" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L958" title="$time.js:958"><small>(defined@958)</small></a>  
**Returns**: <code>String</code> - Timezone name/identificator (with offset) for current timezone  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| parameters | <code>Object</code> |  |  |
| [parameters.locale] | <code>String</code> | <code>internal_locale</code> |  |
| [parameters.description] | <code>String</code> | <code>&quot;long&quot;</code> | The representation of the time zone name. Possible values are: <br/>- `"none"` skip description <br/>- `"long"` (e.g., `British Summer Time`) <br/>- `"short"` (e.g., `GMT+1`) <br/>- `"ianna"`/`"IANNA"` (e.g. `Europe/Prague`): `locale` has no effect for this |
| [parameters.offset] | <code>String</code> | <code>false</code> | show offset part: `"UTC+01:00 (…)"` or `"UTC+01:00"` (if `description="none"`) |


* * *

<a name="module_jaaJSU..$time.modify"></a>

#### $time.modify(mod_obj) ⇒ [<code>function\_DateArray2DateArray</code>](#module_jaaJSU..$time.function_DateArray2DateArray)
Curried method, first invocation sets operations (i. e. `{ addDay: 1 }`) and returns `function_DateArray2DateArray`.

**Kind**: static method of [<code>$time</code>](#module_jaaJSU..$time) <a name="module_jaaJSU..$time.modify" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L1090" title="$time.js:1090"><small>(defined@1090)</small></a>  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| mod_obj | <code>Object</code> | &nbsp; <br/>- object literal representing requested operations <br/>- use name convention like [setters for `Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#Setter) (only one argument is allowed) <br/>- supports also *add\** commands with the same notation ("setMonth" => "addMonth") <br/>- **IMPORTANT NOTE:** There are three behaviour changes <br/>&nbsp;&nbsp;&nbsp;&nbsp;- "setMonth" is indexed from 1 (instead of 0) <br/>&nbsp;&nbsp;&nbsp;&nbsp;- for "setDate" there is alias "setDay" <br/>&nbsp;&nbsp;&nbsp;&nbsp;- for "addDate" there is alias "addDays" <br/>- Some operations: **"\*Date"** (or **"setDay"**, **"addDays"**), **"\*Month"**, **"\*FullYear"**, **"\*Hours"**, **"\*Minutes"**, **"\*Seconds"** |


* * *

<a name="module_jaaJSU..$time.modifyAdditions"></a>

#### $time.modifyAdditions(operation, value, dateObject) ⇒ <code>Date</code> ℗
Helper method for invoking "add*" operations in [`modify`](#methods_modify).

In general `d.set...(d.get...+${value})` (where `d` is instance of `Date`).

**Kind**: static method of [<code>$time</code>](#module_jaaJSU..$time) <a name="module_jaaJSU..$time.modifyAdditions" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L1120" title="$time.js:1120"><small>(defined@1120)</small></a>  
**Returns**: <code>Date</code> - returns `dateObject`  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| operation | <code>String</code> | e.g. "addMonth" |
| value | <code>Number</code> | mainly argument (number) for |
| dateObject | <code>Date</code> | instance of `Date` |


* * *

<a name="module_jaaJSU..$time.double"></a>

#### $time.double(time) ⇒ <code>String</code>
Function adds leading zero to the `time`. [It can be replaced in future: see `padStart`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)

**Kind**: static method of [<code>$time</code>](#module_jaaJSU..$time) <a name="module_jaaJSU..$time.double" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L1141" title="$time.js:1141"><small>(defined@1141)</small></a>  
**Returns**: <code>String</code> - * 00, 01, 02, ..., 09, 10, ..., 100, ...  
**Access**: public  

| Param | Type |
| --- | --- |
| time | <code>Number</code> \| <code>String</code> | 


* * *

<a name="module_jaaJSU..$time.daysInMonth"></a>

#### $time.daysInMonth(month, [year]) ⇒ <code>Number</code>
Returns number of days in given month (and year)

**Kind**: static method of [<code>$time</code>](#module_jaaJSU..$time) <a name="module_jaaJSU..$time.daysInMonth" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L1154" title="$time.js:1154"><small>(defined@1154)</small></a>  
**Returns**: <code>Number</code> - total of days  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| month | <code>String</code> \| <code>Number</code> |  | ISO number of month (eg 01 or 1 for January) |
| [year] | <code>String</code> \| <code>Number</code> | <code>&quot;&gt;&gt;current year&lt;&lt;&quot;</code> | ISO nimber of year (eg. 2019) |


* * *

<a name="module_jaaJSU..$time.getDaysInMonth"></a>

#### $time.getDaysInMonth([date_array]) ⇒ <code>Number</code>
Returns number of days in given month

**Kind**: static method of [<code>$time</code>](#module_jaaJSU..$time) <a name="module_jaaJSU..$time.getDaysInMonth" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L1166" title="$time.js:1166"><small>(defined@1166)</small></a>  
**Returns**: <code>Number</code> - total of days  
**Access**: public  

| Param | Type | Default |
| --- | --- | --- |
| [date_array] | <code>module:jaaJSU~$time.types.DateArray</code> | <code>&quot;&gt;&gt;current year&lt;&lt;&quot;</code> | 


* * *

<a name="module_jaaJSU..$time.getMonthName"></a>

#### $time.getMonthName(n, [l]) ⇒ <code>String</code>
**Kind**: static method of [<code>$time</code>](#module_jaaJSU..$time) <a name="module_jaaJSU..$time.getMonthName" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L1178" title="$time.js:1178"><small>(defined@1178)</small></a>  
**Returns**: <code>String</code> - English month name  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| n | <code>Number</code> | Month number (typically [1-12]); Works cyclically `13===1, ...` |
| [l] | <code>Number</code> \| <code>Boolean</code> | Length of output Month name |

**Example**  
```js
console.log($time.getMonthName(5));//"May"
console.log($time.getMonthName(24, 4));//"Dece"
```

* * *

<a name="module_jaaJSU..$time.getOrdinalSuffix"></a>

#### $time.getOrdinalSuffix(n) ⇒ <code>String</code>
See [ordinal_numbers](#module_jaaJSU..$time.ordinal_numbers).

**Kind**: static method of [<code>$time</code>](#module_jaaJSU..$time) <a name="module_jaaJSU..$time.getOrdinalSuffix" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L1200" title="$time.js:1200"><small>(defined@1200)</small></a>  
**Returns**: <code>String</code> - `n`+English suffix  
**Access**: public  

| Param | Type |
| --- | --- |
| n | <code>Number</code> | 

**Example**  
```js
console.log($time.getOrdinalSuffix(1));//"1st"
```

* * *

<a name="module_jaaJSU..$time.function_Date2Date"></a>

#### $time.function\_Date2Date(date_instance) ⇒ <code>Date</code>
**Kind**: static method of [<code>$time</code>](#module_jaaJSU..$time) <a name="module_jaaJSU..$time.function_Date2Date" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L1017" title="$time.js:1017"><small>(defined@1017)</small></a>  
**Category**: virtual  

| Param | Type |
| --- | --- |
| date_instance | <code>Date</code> | 


* * *

<a name="module_jaaJSU..$time.function_Date2Number"></a>

#### $time.function\_Date2Number(date_instance) ⇒ <code>Number</code>
**Kind**: static method of [<code>$time</code>](#module_jaaJSU..$time) <a name="module_jaaJSU..$time.function_Date2Number" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L1024" title="$time.js:1024"><small>(defined@1024)</small></a>  
**Category**: virtual  

| Param | Type |
| --- | --- |
| date_instance | <code>Date</code> | 


* * *

<a name="module_jaaJSU..$time.function_DateArray2DateArray"></a>

#### $time.function\_DateArray2DateArray(date_array) ⇒ [<code>DateArray</code>](#module_jaaJSU..$time.DateArray)
**Kind**: static method of [<code>$time</code>](#module_jaaJSU..$time) <a name="module_jaaJSU..$time.function_DateArray2DateArray" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L1082" title="$time.js:1082"><small>(defined@1082)</small></a>  
**Category**: virtual  

| Param | Type |
| --- | --- |
| date_array | [<code>DateArray</code>](#module_jaaJSU..$time.DateArray) | 


* * *

<a name="module_jaaJSU..$time.DateArray"></a>

#### $time.DateArray : <code>Array</code>
This is in fact output of [toDateArray](#module_jaaJSU..$time.toDateArray).

**Kind**: static typedef of [<code>$time</code>](#module_jaaJSU..$time) <a name="module_jaaJSU..$time.DateArray" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L568" title="$time.js:568"><small>(defined@568)</small></a>  
**Category**: virtual  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [date] | <code>String</code> | <code>&quot;&quot;</code> | is always in form of "YYYY-MM-DD" or "" |
| [time] | <code>String</code> | <code>&quot;&quot;</code> | is always in form of "HH:mm:SS" or "HH:mm:00" or "" |
| [time_zone] | <code>String</code> | <code>&quot;&quot;</code> | is always in form of "[+-]\d\d:\d\d" or "CET" or "" |


* * *

<a name="module_jaaJSU..$time.toLocaleStringOptions"></a>

#### $time.toLocaleStringOptions : <code>Object</code>
It is in fact argument for `options` in [`Date.prototype.toLocaleString` Parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString#Parameters).

**Kind**: static typedef of [<code>$time</code>](#module_jaaJSU..$time) <a name="module_jaaJSU..$time.toLocaleStringOptions" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L641" title="$time.js:641"><small>(defined@641)</small></a>  
**Category**: virtual  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [locale] | <code>String</code> | <code>internal_locale</code> | In which language/national format generate final string |
| [timeZone] | <code>String</code> | <code>internal_zone</code> | Time zone name from [`ary_ianna_time_zones`](#props_ary_ianna_time_zones). |
| [declension] | <code>Boolean</code> | <code>true</code> | Needed for some languages — for example in Czech: "10. července" (`declension=true`), or "10. červenec" (`declension=false`) |


* * *

<a name="module_jaaJSU..$time.ArrayOfOperation"></a>

#### $time.ArrayOfOperation : <code>Array</code>
This holds information about how show one piece of String output typically for [toString](#module_jaaJSU..$time.toString).

Predefined values can be found at [format_arrays](#module_jaaJSU..$time.format_arrays).

**Kind**: static typedef of [<code>$time</code>](#module_jaaJSU..$time) <a name="module_jaaJSU..$time.ArrayOfOperation" href="https://github.com/jaandrle/dollar_time/blob/master/bin/$time.js#L685" title="$time.js:685"><small>(defined@685)</small></a>  
**Category**: virtual  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| operation | <code>String</code> | In fact names of keys in [`Date.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) (i. e. "weekday", "month") or "text". |
| argument | <code>String</code> | In fact value of given key in [`Date.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) (i. e. "2-digit", "numeric"). |
| params | <code>String</code> | Some additional information/modifications like "two_letters", "ordinal_number", …. |


* * *

