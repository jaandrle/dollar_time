/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* from_functions *//* global toDateArray */
/**
 * Function generates `DateArray` from instance of `Date`.
 * @method fromDate
 * @memberof module:jaaJSU~$time
 * @public
 * @param {Date} date_instance instance of `Date` class
 * @returns {module:jaaJSU~$time~DateArray}
 */
export function fromDate(date_instance){
    return toDateArray(date_instance.toISOString());
}