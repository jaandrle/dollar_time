/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* from_functions *//* global fromNow */
/* timezones *//* global getTimeZoneOffsetString, getCETOffset */
/**
 * Function initializes `Date` from `DateArray`.
 * @method toDate
 * @memberof module:jaaJSU~$time
 * @public
 * @param {module:jaaJSU~$time~DateArray} date_array
 * @returns {Date}
 */
function toDate([ date, time, zone ]= []){
    if(!date) date= fromNow()[0];
    if(!time) time= "T00:00:00";
    if(!zone) zone= getTimeZoneOffsetString(date);
    if(zone==="CET") zone= getCETOffset([ date, time ]);
    return new Date(date+time+zone);
}