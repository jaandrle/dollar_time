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