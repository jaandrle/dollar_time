/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* timezones/helpers *//* global getTimeZoneOffsetStringFromOffset */
/* timezones *//* global getTimeZoneOffset */
export function getTimeZoneOffsetString(date){
     return getTimeZoneOffsetStringFromOffset(getTimeZoneOffset(date));
}