/**
 * This NAMESPACE provides features for date/time. Mainly, there are utilities using **Date** class and feature [`Date.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString).
 * @namespace $time
 * @version gulp_place("app.version", "eval_out")
 * @see {@link gulp_place("app.homepage", "eval_out")}
 * @category namespaces
 */
gulp_place("$time_init.sub.js", "file_once");/* global ary_ianna_time_zones, internal_zone: true, internal_locale: true, format_arrays */

gulp_place("from_functions/*.sub.js", "glob_once");
gulp_place("to_functions/*.sub.js", "glob_once");
gulp_place("timezones/*.sub.js", "glob_once");
gulp_place("modify/*.sub.js", "glob_once");/* global getWeekDay, addDays, addMonths, getWeekNumber */
/**
 * Utility workings with native Date
 * @namespace Date_utils
 * @memberof module:jaaJSU~$time
 * @readonly
 */
export const Date_utils= { getWeekDay, getWeekNumber, addDays, addMonths };

gulp_place("utility/*.sub.js", "glob_once");/* global double, getOrdinalSuffix, getMonthName, getDaysInMonth, daysInMonth */

/**
 * Alias for `undefined` which can be used to trigger default value of argument.
 * @property {undefined} _
 * @memberof module:jaaJSU~$time
 * @public
 * @example
 * test($time._)==="A"; function test(a= "A"){ return a; }
 */
export const _= void(0);
/**
 * Public name of {@link module:jaaJSU~$time.format_arrays}.
 * @namespace formats
 * @alias module:jaaJSU~$time.format_arrays
 * @memberof module:jaaJSU~$time
 * @readonly
 * @static
 */
export const formats= format_arrays;

export const getTimeZones= ()=> ary_ianna_time_zones;
export const isTimeZone= candidate=> ary_ianna_time_zones.indexOf(candidate)!==-1;
export const setInternalZone= zone=> internal_zone= zone;
export const setInternalLocale= locale=> internal_locale= locale;