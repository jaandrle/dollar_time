/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* init *//* global format_arrays */
/* to_functions/helpers *//* global toStringFromObject */
/**
 * Function generates text (including 2-digits month and day and full year and time) based on `locale` and `timeZone` from `DateArray`.
 * @method toDateTimeString
 * @for $time.{namespace}
 * @public
 * @param {DateArray} params_obj
 *  - See [toStringFromObject](#methods_toStringFromObject).
 * @returns {Function}
 *  - `DateArray`=> **<String>**
 * @example
 *      $time.toDateTimeString({ locale: "en-GB" })($time.fromNow());//= "05/06/2019 09:32:20"
 */
function toDateTimeString(params_obj){
    return toStringFromObject(format_arrays.YYYYMMDDHHmmss, params_obj);
}