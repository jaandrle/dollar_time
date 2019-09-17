/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* init *//* global isDateString, isTimeString, internal_zone */
/* from_functions *//* global toDateArray, fromNow */
/**
 * Function generates `DateArray` from passed string.
 * @method fromString
 * @memberof $time
 * @public
 * @param {String} [timestamp_string] If `undefined` returns result of {@link $time.fromNow}, else it is used {@link $time.toDateArray} for parsing.
 * @param {String} [timezone= internal_zone] Default timezone — uses if is not setted in `timestamp_string`
 * @returns {$time.types.DateArray}
 */
function fromString(timestamp_string, timezone= internal_zone){
    if(!timestamp_string) return fromNow();
    let date_array= toDateArray(timestamp_string);
    if(date_array.length!==3){
        if(!isDateString(date_array[0])) date_array.unshift("");
        else if(!isTimeString(date_array[1])){
            date_array[2]= date_array[1] || timezone;
            date_array[1]= "";
        } else {
            date_array[2]= timezone;
        }
    } else if(!date_array[2]&&timezone){ date_array[2]= timezone; }
    return date_array;
}