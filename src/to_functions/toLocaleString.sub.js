/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* init *//* global internal_locale, internal_zone, format_objects */
/* to_functions *//* global toDate */
/* timezones/helpers *//* global generateTimeZoneFormatObject */
/**
 * It is wrapper arround [`Date.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString).
 * @method toLocaleString
 * @memberof $time
 * @public
 * @param {String} [format_object_name="date_time"] name of predefined time/date combinations see {@link $time.format_objects}.
 * @param {$time.types.toLocaleStringOptions} [toLocaleStringOptions]
 * @returns {$time.types.function_DateArray2String} returns result of [`Date.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString);
 */
function toLocaleString(format_object_name= "date_time", { locale= internal_locale, timeZone= internal_zone }= {}){
    return date_array=> toDate(date_array).toLocaleString(locale, generateTimeZoneFormatObject(timeZone, format_objects[format_object_name]));
}