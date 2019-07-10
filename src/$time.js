/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* global gulp_place */
/**
 * This NAMESPACE provides features for date/time. Mainly, there are utilities using **Date** class and feature [`Date.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString).
 * @class $time.{namespace}
 * @static
 */
const $time= (function init(){/* version: gulp_place("app.version", "variable") */
    gulp_place("$time_init.sub.js");/* global ary_ianna_time_zones, internal_zone: true, internal_locale: true */

    gulp_place("from_functions/*.sub.js", "glob");/* global fromNow, fromString, fromDate, fromDateArguments */
    gulp_place("to_functions/*.sub.js", "glob");/* global toDate, toString, toStringPreDefined, toLocaleString, toRelative */
    /* to_functions/toRelative *//* global getDiff, getRelative *///gulp.remove.line
    gulp_place("timezones/*.sub.js", "glob");/* global getCETOffset, getTimeZoneOffset, getTimeZoneOffsetString, getTimeZone */
    gulp_place("modify/*.sub.js", "glob");/* global getWeekDay, addDays, addMonths, getWeekNumber, setTimeZone, modify */
    gulp_place("utility/*.sub.js", "glob");/* global double, getOrdinalSuffix, getMonthName, getDaysInMonth */
    
    return {
        /**
         * Alias for `undefined` which can be used to trigger default value of argument. (eg. `test($time._)==="A"; function test(a= "A"){ return a; }`)
         * @property {undefined} _
         * @public
         */
        _: undefined,
    
        fromNow, fromString, fromDate, fromDateArguments,
    
        toDate, toString, toStringPreDefined, toLocaleString, toRelative,
    
        getDiff, getRelative,
        getCETOffset, getTimeZoneOffset, getTimeZoneOffsetString, getTimeZone,
    
        Date: { getWeekDay, getWeekNumber, addDays, addMonths },
        setTimeZone, modify,
    
        /* backward compatibility */ double, getOrdinalSuffix, getMonthName,
        getDaysInMonth,
    
        getTimeZones: ()=> ary_ianna_time_zones, isTimeZone: candidate=> ary_ianna_time_zones.indexOf(candidate)!==-1,
        setInternalZone: zone=> internal_zone= zone, setInternalLocale: locale=> internal_locale= locale
    };
})();