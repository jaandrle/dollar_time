/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* init *//* global format_arrays */
/* to_functions/helpers *//* global toStringFromObject */
function toDateString(params_obj){
    return toStringFromObject(format_arrays.YYYYMMDD, params_obj);
}