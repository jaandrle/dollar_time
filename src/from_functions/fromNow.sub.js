/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* from_functions *//* global toDateArray */
function fromNow(){
    return toDateArray((new Date()).toISOString());
}