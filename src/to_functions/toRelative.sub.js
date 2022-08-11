/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* init *//* global internal_locale */
/* from_functions *//* global fromNow */
/* to_functions *//* global toDate */
export function toRelative(reference_date_array, options){
    return date_array=> getRelative(getDiffMs(reference_date_array)(date_array), options);
}
export function getDiff(reference_time, output_measure_string= "seconds", full_precision= false){
    const c_measure= { seconds: 1000, minutes: 60000 /* 60*sec */, hours: 3600000 /* 60*mins */, days: 86400000 /* 24*days */, weeks: 604800000 /* 7*days */, months: 2419200000 /* 4*weeks */, years: 29030400000 /* 12*months */ };
    const diffFun= getDiffMs(reference_time, -c_measure[output_measure_string]);
    return function diff(target_time){
        const diff_val= diffFun(target_time);
        return full_precision ? diff_val : Math.floor(diff_val);
    };
}
function getDiffMs(reference_time, output_measure= 1){
    const reference_time_ms= reference_time ? toDate(reference_time).getTime() : false;
    return function diff(target_time){ return (toDate(target_time).getTime()-(reference_time_ms ? reference_time_ms : toDate(fromNow()).getTime()))/output_measure; };
}
function getRelativeIntl(is_positive, diff, measurement, { locales= internal_locale, localeMatcher, numeric= "auto", style }= {}){
    const i= new Intl.RelativeTimeFormat(locales, { localeMatcher, numeric, style });
    if(!is_positive) diff= -diff;
    return i.format(diff, measurement);
}
function getRelativeBackup(is_positive, diff, measurement){
    const out_text= !is_positive ? "%s ago" : "in %s";
    return out_text.replace("%s", diff+" "+measurement);
}
export function getRelative(diff, options){
    const { abs, floor, round }= Math;
    const out= typeof Intl.RelativeTimeFormat !== "function" ? getRelativeBackup : getRelativeIntl;
    const is_positive= diff < 0 ? false : true;
    
    diff= floor(abs(diff)/1000);
    if(diff<60) return out(is_positive, diff, "seconds", options);
    diff= floor(diff/60);
    if(diff<60) return out(is_positive, diff, "minutes", options);
    diff= round(diff/60);
    if(diff<24) return out(is_positive, diff, "hours", options);
    diff= diff/24;
    if(diff<29.5) return out(is_positive, round(diff), "days", options);
    diff= diff/30.41666; //avg per month
    if(diff<12) return out(is_positive, round(diff), "months", options);
    diff= round(diff/12);
    return out(is_positive, diff, "years", options);
}
