/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* global gulp_place */
/**
 * This NAMESPACE provides features for date/time. Mainly, there are utilities using **Date** class and feature [`Date.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString).
 * @namespace $time
 * @version gulp_place("app.version", "eval_out")
 * @see {@link gulp_place("app.homepage", "eval_out")}
 * @category namespaces
 */
const $time= (function init(){
    gulp_place("$time_init.sub.js");/* global ary_ianna_time_zones, internal_zone: true, internal_locale: true, format_arrays */

    gulp_place("from_functions/*.sub.js", "glob");/* global fromNow, fromString, fromDate, fromDateArguments */
    gulp_place("to_functions/*.sub.js", "glob");/* global toDate, toString, toLocaleString, toRelative */
    /* to_functions/toRelative *//* global getDiff, getRelative *///gulp.remove.line
    gulp_place("timezones/*.sub.js", "glob");/* global getCETOffset, getTimeZoneOffset, getTimeZoneOffsetString, getTimeZone, getCurrentTimeZone */
    gulp_place("modify/*.sub.js", "glob");/* global getWeekDay, addDays, addMonths, getWeekNumber, redefineTimeZone, modify */
    gulp_place("utility/*.sub.js", "glob");/* global double, getOrdinalSuffix, getMonthName, getDaysInMonth, daysInMonth */
    
    return {
        /**
         * Alias for `undefined` which can be used to trigger default value of argument.
         * @property {Undefined} _
         * @memberof module:jaaJSU~$time
         * @public
         * @example
         * test($time._)==="A"; function test(a= "A"){ return a; }
         */
        _: undefined,
    
        fromNow, fromString, fromDate, fromDateArguments,
    
        toDate, toString, toLocaleString, toRelative,
    
        getDiff, getRelative,
        getCETOffset, getTimeZoneOffset, getTimeZoneOffsetString, getTimeZone, getCurrentTimeZone,
        /**
         * @namespace Date
         * @memberof module:jaaJSU~$time
         * @readonly
         */
        Date: { getWeekDay, getWeekNumber, addDays, addMonths },
        redefineTimeZone, modify,
    
        /* backward compatibility */ double, getOrdinalSuffix, getMonthName,
        getDaysInMonth, daysInMonth,
    
        getTimeZones: ()=> ary_ianna_time_zones, isTimeZone: candidate=> ary_ianna_time_zones.indexOf(candidate)!==-1,
        setInternalZone: zone=> internal_zone= zone, setInternalLocale: locale=> internal_locale= locale,
        /**
         * Public name of {@link module:jaaJSU~$time.format_arrays}.
         * @namespace formats
         * @alias module:jaaJSU~$time.format_arrays
         * @memberof module:jaaJSU~$time
         * @readonly
         * @static
         */
        formats: format_arrays
    };
})();