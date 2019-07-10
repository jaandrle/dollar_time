/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* init *//* global format_arrays */
/* to_functions/helpers *//* global toStringFromObject */
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