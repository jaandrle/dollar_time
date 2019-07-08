/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* from_functions *//* global toDateArray */
/**
 * Function generates `DateArray` from arguments to initialize `Date`.
 * @method fromDateArguments
 * @for $time.{namespace}
 * @public
 * @param {...Mixed} args 
 *  - parameters for initialize `Date` class
 * @returns {DateArray}
 *  - See [toDateArray](#methods_toDateArray).
 */
function fromDateArguments(...args){
    return toDateArray((args.filter(d=> typeof d!=="undefined").length ? new Date(...args) : new Date()).toISOString());
}