/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* timezones/helpers *//* global getDateInstaneFromDateArrayOrString */
function getTimeZoneOffset(date){
    return getDateInstaneFromDateArrayOrString(date).getTimezoneOffset();
}