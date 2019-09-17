/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* to_functions/helpers *//* global toStringFromObject, getFormatObject */
/**
 * Function generates text based on `format`, `locale` and `timeZone` from `DateArray`.
 * @method toString
 * @memberof $time
 * @public
 * @param {String|...Array} format
 *  - **Default: `$time.formats.SQL`**
 *  - Placeholder for replace/generate final string (eg. "MM"===two digits month) — see [`getFormatObject`](#methods_getFormatObject).
 *  - Or lists of predefined formats — see [`formats`](#props_formats).
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
 *      $time.toString("DD/MM/YYYY HH:mm:SS",{ locale: "en-GB" })($time.fromNow());//= "05/06/2019 09:32:20"
 *      $time.toString($time.formats.SQL)($time.fromNow());//= "2019-06-05 09:32:20"
 */
function toString(format, params_obj){
    return toStringFromObject(Array.isArray(format) ? format : format ? getFormatObject(format) : undefined, params_obj);
}