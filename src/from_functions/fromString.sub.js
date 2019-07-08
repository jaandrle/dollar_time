/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* init *//* global isDateString, isTimeString, internal_zone */
/* from_functions *//* global toDateArray, fromNow */
/**
 * Function generates `DateArray` from passed string.
 * @method fromString
 * @for $time.{namespace}
 * @public
 * @param {String} timestamp_string 
 *  - Supported forms are combinations of date ("YYYY-MM-DD", "DD/MM/YYYY"), time ("HH:mm:ss", "HH:mm") and timezone ("CET", "+01:00", "-02:00", ...)
 *  - Typically: "2019-06-02 12:35:45 +01:00", "2019-06-02T12:35:45+01:00", "12:35:45+01:00 2019-06-02", ...
 * @param {String} [timezone= internal_zone]
 *  - Override timezone in `timestamp_string`
 * @returns {DateArray}
 *  - See [toDateArray](#methods_toDateArray).
 */
function fromString(timestamp_string, timezone= internal_zone){
    if(!timestamp_string) return fromNow();
    let date_array= toDateArray(timestamp_string);
    if(date_array.length!==3){
        if(!isDateString(date_array[0])) date_array.unshift("");
        else if(!isTimeString(date_array[1])){
            date_array[2]= timezone ? timezone : date_array[1];
            date_array[1]= "";
        } else {
            date_array[2]= timezone ? timezone : "";
        }
    } else if(timezone){ date_array[2]= timezone; }
    return date_array;
}