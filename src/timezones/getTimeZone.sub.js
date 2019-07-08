/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* init *//* global internal_locale */
/* timezones/helpers *//* global getDateInstaneFromDateArrayOrString, getTimeZoneOffsetStringFromOffset */
function getTimeZone(date, { locale= internal_locale, description= "long", offset= false }= {}){
    const date_instance= getDateInstaneFromDateArrayOrString(date);
    let out_description= description==="none" ? "" : date_instance.toLocaleString(locale, { timeZoneName: description }).replace(date_instance.toLocaleString(locale), "").trim();
    const out_offset= !offset ? "" : "UTC"+getTimeZoneOffsetStringFromOffset(date_instance.getTimezoneOffset());
    if(out_description&&out_offset) out_description= " ("+out_description+")";
    return out_offset+out_description;
}