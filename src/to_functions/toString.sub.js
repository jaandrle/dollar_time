/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* to_functions/helpers *//* global toStringFromObject, getFormatObject */
export function toString(format, params_obj){
    return toStringFromObject(Array.isArray(format) ? format : format ? getFormatObject(format) : undefined, params_obj);
}