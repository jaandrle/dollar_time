/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* from_functions *//* global toDateArray */
/**
 * Function generates `DateArray` from arguments to initialize `Date`.
 * @method fromDateArguments
 * @memberof module:jaaJSU~$time
 * @public
 * @param {...Mixed} args parameters for initialize `Date` class
 * @returns {module:jaaJSU~$time~DateArray}
 */
function fromDateArguments(...args){
    return toDateArray((args.filter(d=> typeof d!=="undefined").length ? new Date(...args) : new Date()).toISOString());
}