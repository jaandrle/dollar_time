/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* init *//* global ary_ianna_time_zones, ary_ianna_time_offsets */
/* from_functions *//* global toDateArray*/
/* utility *//* global double */
function generateTimeZoneFormatObject(timeZone, format_object){
    if(!timeZone) return format_object;
    if(ary_ianna_time_zones.indexOf(timeZone)!==-1) return Object.assign({ timeZone }, format_object);
    if(typeof ary_ianna_time_offsets[timeZone]!=="undefined") return Object.assign({ timeZone: ary_ianna_time_zones[ary_ianna_time_offsets[timeZone]] }, format_object);
    return format_object;
}
function getDateInstaneFromDateArrayOrString(date_string){
    if(!date_string) return new Date();
    if(!Array.isArray(date_string)) date_string= toDateArray(date_string);
    return new Date(...date_string[0].split("-").map((v,k)=> k===1 ? +v-1 : +v));
}
function getTimeZoneOffsetStringFromOffset(offset){
    const { floor, abs }= Math;
    let out= offset > 0 ? "-" : "+";
    offset= abs(offset);
    out+= double(floor(offset/60))+":"+double(offset%60);
    return out;
}