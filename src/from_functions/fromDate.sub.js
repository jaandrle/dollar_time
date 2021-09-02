/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* from_functions *//* global toDateArray */
export function fromDate(date_instance){
    return toDateArray(date_instance.toISOString());
}