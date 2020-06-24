/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* from_functions *//* global fromNow */
/* timezones *//* global getTimeZoneOffsetString, getCETOffset */
/**
 * Function initializes `Date` from `DateArray`.
 * @method toDate
 * @memberof module:jaaJSU~$time
 * @public
 * @param {module:jaaJSU~$time~DateArray} [date_array] Defaults to 'now' (or use current `date`/`time`/`zone` if not filled).
 * @returns {Date}
 */
function toDate(date_array){
    if(!date_array||!Array.isArray(date_array)) return new Date();
    
    let [ date, time, zone ]= date_array;
    if(!date) date= fromNow()[0];
    if(!time) time= "T00:00:00";
    if(!zone) zone= getTimeZoneOffsetString(date);
    if(zone==="CET"||zone==="CEST") zone= getCETOffset([ date, time ]);
    return new Date(date+time+zone);
}