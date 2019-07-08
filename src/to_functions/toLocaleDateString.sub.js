/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* init *//* global internal_locale, internal_zone, format_objects */
/* to_functions *//* global toDate */
/* timezones/helpers *//* global generateTimeZoneFormatObject */
function toLocaleDateString(format_object= "YYYYMMDD", { locale= internal_locale, timeZone= internal_zone }= {}){
    return date_array=> toDate(date_array).toLocaleString(locale, generateTimeZoneFormatObject(timeZone, format_objects[format_object]));
}