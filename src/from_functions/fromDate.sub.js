/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* from_functions *//* global toDateArray */
function fromDate(date_instance){
    return toDateArray(date_instance.toISOString());
}