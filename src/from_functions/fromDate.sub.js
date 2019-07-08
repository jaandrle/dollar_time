/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* from_functions *//* global toDateArray */
/**
 * Function generates `DateArray` from instance of `Date`.
 * @method fromDate
 * @for $time.{namespace}
 * @public
 * @param {Date} date_instance 
 *  - instance of `Date` class
 * @returns {DateArray}
 *  - See [toDateArray](#methods_toDateArray).
 */
function fromDate(date_instance){
    return toDateArray(date_instance.toISOString());
}