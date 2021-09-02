/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* init *//* global internal_locale, ary_ianna_time_zones, ary_ianna_time_offsets */
/* timezones/helpers *//* global getDateArrayFromMixed, getTimeZoneOffsetStringFromOffset */
export function getTimeZone(date, { locale= internal_locale, description= "long", offset= false }= {}){
    description= description.toLocaleLowerCase();
    const [ date_part, time_part, offset_part ]= getDateArrayFromMixed(date), date_instance= new Date([ date_part, time_part, offset_part ].join(""));
    const locale_param= Object.keys(ary_ianna_time_offsets).indexOf(offset_part)!==-1 ? { timeZone: ary_ianna_time_zones[ary_ianna_time_offsets[offset_part]] } : {};
    let out_description= description==="none" ? "" : date_instance.toLocaleString(locale, Object.assign({ timeZoneName: description }, locale_param)).replace(date_instance.toLocaleString(locale, locale_param), "").trim();
    const out_offset= !offset ? "" : "UTC"+(offset_part==="Z" ? getTimeZoneOffsetStringFromOffset(date_instance.getTimezoneOffset()) : date_instance.toLocaleString(locale, Object.assign({ timeZoneName: "short" }, locale_param)).replace(date_instance.toLocaleString(locale, locale_param), "").replace(/[^\d\+\-\:]/g, "").trim());
    if(out_description&&out_offset) out_description= " ("+out_description+")";
    return out_offset+out_description;
}
export function getCurrentTimeZone({ locale= internal_locale, description= "long", offset= false }= {}){
    description= description.toLocaleLowerCase();
    if(description!=="ianna") return getTimeZone(undefined, { locale, description, offset });
    let out_description= "", dtf, dtf_ro;
    if(typeof Intl!=='undefined'&&typeof Intl.DateTimeFormat==='function'){
        dtf= Intl.DateTimeFormat() || {};
        if(typeof dtf.resolvedOptions!=="function") return undefined;
        dtf_ro= dtf.resolvedOptions().timeZone;
        out_description= Object.keys(ary_ianna_time_offsets).indexOf(dtf_ro)!==-1 ? ary_ianna_time_zones[ary_ianna_time_offsets[dtf_ro]] : dtf_ro;
    }
    const out_offset= !offset ? "" : getTimeZone(undefined, { locale, description: "none", offset: true });
    if(out_description&&out_offset) out_description= " ("+out_description+")";
    return out_offset+out_description;
}