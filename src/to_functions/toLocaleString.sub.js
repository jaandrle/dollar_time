/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* init *//* global internal_locale, internal_zone, format_objects */
/* to_functions *//* global toDate */
/* timezones/helpers *//* global generateTimeZoneFormatObject */
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