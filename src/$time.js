/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* global gulp_place */
/**
 * This NAMESPACE provides features for time.
 * @class $time.{namespace}
 * @static
 */
const time= (function init(){
    gulp_place("$time_init.sub.js");/* global ary_ianna_time_zones, internal_zone: true, internal_locale: true */

    gulp_place("from_functions/*.sub.js", "glob");/* global fromNow, fromString, fromDate, fromDateArguments */
    gulp_place("to_functions/*.sub.js", "glob");/* global toDate, toString, toDateTimeString, toDateString, toLocaleTimeString, toLocaleDateString, toRelative */
    /* to_functions/toRelative *//* global getDiffFull, getRelative *///gulp.remove.line
    gulp_place("timezones/*.sub.js", "glob");/* global getCETOffset, getTimeZoneOffset, getTimeZoneOffsetString, getTimeZone */
    gulp_place("modify/*.sub.js", "glob");/* global getWeekDay, addDays, addMonths, setTimeZone, modify */
    gulp_place("utility/*.sub.js", "glob");/* global double, getOrdinalSuffix, getMonthName */
    
    return {
        _: undefined,
    
        fromNow, fromString, fromDate, fromDateArguments,
    
        toDate, toString, toDateTimeString, toDateString, toLocaleTimeString, toLocaleDateString, toRelative,
    
        getDiff: getDiffFull, getRelative,
        getCETOffset, getTimeZoneOffset, getTimeZoneOffsetString, getTimeZone,
    
        Date: { getWeekDay, addDays, addMonths },
        setTimeZone, modify,
    
        /* backward compatibility */ double, getOrdinalSuffix, getMonthName,
        /* backward compatibility */ getTimeStamp: t=> toDateTimeString()(fromDateArguments(t)), getDateStamp: t=> toDateString()(fromDateArguments(t)),
    
        getTimeZones: ()=> ary_ianna_time_zones, isTimeZone: candidate=> ary_ianna_time_zones.indexOf(candidate)!==-1,
        setInternalZone: zone=> internal_zone= zone, setInternalLocale: locale=> internal_locale= locale
    };
})();