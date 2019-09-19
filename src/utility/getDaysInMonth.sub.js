/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* from_functions *//* global fromNow */
/**
 * Returns number of days in given month (and year)
 * @method daysInMonth
 * @memberof module:jaaJSU~$time
 * @public
 * @param {String|Number} month ISO number of month (eg 01 or 1 for January)
 * @param {String|Number} [year=">>current year<<"]  ISO nimber of year (eg. 2019)
 * @returns {Number} total of days
 */
function daysInMonth(month, year= (new Date()).getFullYear()){/* months indexing from 0 */
    return new Date(+year, +month, 0 /* last in prev month */).getDate();
}
/**
 * Returns number of days in given month
 * @method getDaysInMonth
 * @memberof module:jaaJSU~$time
 * @public
 * @param {module:jaaJSU~$time.types~DateArray} [date_array=">>current year<<"]
 * @returns {Number} total of days
 */
function getDaysInMonth([ date= fromNow()[0] ]= []){
    const [ _, month, year ]= date.split("-").map(Number);
    return daysInMonth(month, year);
}