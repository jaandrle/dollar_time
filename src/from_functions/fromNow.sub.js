/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* from_functions *//* global toDateArray */
/**
 * Function generates `DateArray` from current date and time.
 * @method fromNow
 * @for $time.{namespace}
 * @public
 * @returns {DateArray}
 *  - See [toDateArray](#methods_toDateArray).
 */
function fromNow(){
    return toDateArray((new Date()).toISOString());
}