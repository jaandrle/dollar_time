/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* from_functions *//* global fromNow */
/* to_functions *//* global toDate */
function toRelative(date_array){
    return getRelative(getDiffMs()(date_array));
}

function getDiff(reference_time, output_measure_string= "seconds", full_precision= false){
    const c_measure= { seconds: 1000, minutes: 60000 /* 60*sec */, hours: 3600000 /* 60*mins */, days: 86400000 /* 24*days */, weeks: 604800000 /* 7*days */, months: 2419200000 /* 4*weeks */, years: 29030400000 /* 12*months */ };
    const reference_time_ms= reference_time ? toDate(reference_time).getTime() : false;
    return function diff(target_time){
        const diff_val= getDiffMs(reference_time_ms, -c_measure[output_measure_string])(target_time);
        return full_precision ? diff_val : Math.floor(diff_val);
    };
}
function getDiffMs(reference_time, output_measure= 1){
    const reference_time_ms= reference_time ? toDate(reference_time).getTime() : false;
    return function diff(target_time){ return (toDate(target_time).getTime()-(reference_time_ms ? reference_time_ms : toDate(fromNow()).getTime()))/output_measure; };
}
function getRelative(ms_diff){
    const { abs, floor, round }= Math;
    const out_text= ms_diff < 0 ? "%s ago" : "in %s";
    ms_diff= abs(ms_diff);
    if(ms_diff<1500) return "now";
    ms_diff= floor(ms_diff/1000);
    if(ms_diff<10) return out_text.replace("%s", "a few seconds");
    if(ms_diff<60) return out_text.replace("%s", ms_diff+" seconds");
    ms_diff= floor(ms_diff/60);
    if(ms_diff===1) return out_text.replace("%s", "a minute");
    if(ms_diff<60) return out_text.replace("%s", ms_diff+" minutes");
    ms_diff= round(ms_diff/60);
    if(ms_diff===1) return out_text.replace("%s", "an hour");
    if(ms_diff<24) return out_text.replace("%s", ms_diff+" hours");
    ms_diff= ms_diff/24;
    if(round(ms_diff)===1) return out_text.replace("%s", "a day");
    if(ms_diff<29.5) return out_text.replace("%s", round(ms_diff)+" days");
    ms_diff= ms_diff/30.41666; //avg per month
    if(round(ms_diff)===1) return out_text.replace("%s", "a month");
    if(ms_diff<12) return out_text.replace("%s", round(ms_diff)+" months");
    ms_diff= round(ms_diff/12);
    if(ms_diff===1) return out_text.replace("%s", "a year");
    return out_text.replace("%s", ms_diff+" years");
}