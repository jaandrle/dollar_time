/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* init *//* global internal_zone */
/* timezones/helpers *//* global getDateInstaneFromDateArrayOrString */
function getTimeZoneOffset(date, timeZone= internal_zone){
    if(timeZone) return getTimeZoneDiffOffset(getDateInstaneFromDateArrayOrString(date), timeZone);
    return getDateInstaneFromDateArrayOrString(date).getTimezoneOffset();
}
function getTimeZoneDiffOffset(date_instance, timeZone= internal_zone){
    const [ sign= "+", hours= 0, minutes= 0 ]= date_instance.toLocaleString('en-GB', { timeZone, weekday: "short", timeZoneName: "short" }).replace(/(\+|\-)/g, (_, m)=> m+":").replace(/[^\d:\+\-]/g, "").split(":");
    const target_offset= ( sign==="-" ? -1 : 1 )*(Number(hours)*60+Number(minutes));
    return target_offset-date_instance.getTimezoneOffset();
}