/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* to_functions/helpers *//* global toStringFromObject, getFormatObject */
/**
 * @function function_DateArray2String
 * @memberof module:jaaJSU~$time
 * @param {module:jaaJSU~$time.DateArray} date_array
 * @returns {String}
 */
/**
 * Function generates text based on `format`, `locale` and `timeZone` from `DateArray`.
 * @method toString
 * @memberof module:jaaJSU~$time
 * @public
 * @param {String|module:jaaJSU~$time.ArrayOfOperation[]} [format=$time.formats.SQL]
 * <br/>- Placeholder for replace/generate final string (eg. "MM"===two digits month) — see {@link module:jaaJSU~$time.getFormatObject}.
 * <br/>- Or lists of predefined formats — see {@link module:jaaJSU~$time.formats}.
 * @param {module:jaaJSU~$time.toLocaleStringOptions} [toLocaleStringOptions]
 * @returns {module:jaaJSU~$time.function_DateArray2String}
 * @example
 * $time.toString("DD/MM/YYYY HH:mm:SS",{ locale: "en-GB" })($time.fromNow());//= "05/06/2019 09:32:20"
 * $time.toString($time.formats.SQL)($time.fromNow());//= "2019-06-05 09:32:20"
 */
function toString(format, params_obj){
    return toStringFromObject(Array.isArray(format) ? format : format ? getFormatObject(format) : undefined, params_obj);
}