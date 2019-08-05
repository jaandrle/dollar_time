/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* init *//* global ary_ianna_time_zones, ary_ianna_time_offsets */
/* from_functions *//* global toDateArray, fromNow */
/* utility *//* global double */
function generateTimeZoneFormatObject(timeZone, format_object){
    if(!timeZone) return format_object;
    if(ary_ianna_time_zones.indexOf(timeZone)!==-1) return Object.assign({ timeZone }, format_object);
    if(typeof ary_ianna_time_offsets[timeZone]!=="undefined") return Object.assign({ timeZone: ary_ianna_time_zones[ary_ianna_time_offsets[timeZone]] }, format_object);
    return format_object;
}
function getDateArrayFromMixed(date_string){
    if(!date_string) return fromNow();
    if(!Array.isArray(date_string)) return toDateArray(date_string);
    return date_string;
}
function getTimeZoneOffsetStringFromOffset(offset){
    const { floor, abs }= Math;
    let out= offset > 0 ? "-" : "+";
    offset= abs(offset);
    out+= double(floor(offset/60))+":"+double(offset%60);
    return out;
}