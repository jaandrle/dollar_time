/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* to_functions/helpers *//* global toStringFromObject, getFormatObject */
function toString(format_string, params_obj){
    return toStringFromObject(format_string ? getFormatObject(format_string) : false, params_obj);
}