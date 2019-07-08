/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* init *//* global internal_locale, internal_zone */
function addDays(days_num){
    return date_instance=> (date_instance.setDate(date_instance.getDate()+days_num), date_instance);
}
function addMonths(monthss_num){
    return date_instance=> (date_instance.setMonth(date_instance.getMonth()+monthss_num), date_instance);
}
function getWeekDay(type= "numeric", { locale= internal_locale, timeZone= internal_zone }= {}){
    return type==="numeric" ? date_instance=> date_instance.getDay() : date_instance=> date_instance.toLocaleString(locale, { weekday: type });
}
function getWeekNumber(date_instance){ /* calculates no. of thursdays from this week to the first one (January 4 is always in week 1.) */
    const tdt= new Date(date_instance.valueOf());
    tdt.setDate(tdt.getDate() + 3 - (date_instance.getDay() + 6) % 7);
    var firstThursday = tdt.valueOf();
    tdt.setMonth(0, 1);
    if(tdt.getDay() !== 4){
        tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - tdt) / 604800000);
}