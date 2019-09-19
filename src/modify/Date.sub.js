/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* init *//* global internal_locale, internal_zone */
/**
 * @function function_Date2Date
 * @memberof module:jaaJSU~$time
 * @category virtual
 * @param {Date} date_instance
 * @returns {Date}
 */
/**
 * @function function_Date2Number
 * @memberof module:jaaJSU~$time
 * @category virtual
 * @param {Date} date_instance
 * @returns {Number}
 */
/**
 * This modify given **Date** instance (add days).
 * @method addDays
 * @memberof module:jaaJSU~$time.Date
 * @public
 * @param {Number} days_num How many days to add to `date_instance`
 * @returns {module:jaaJSU~$time.function_Date2Date}
 * */
function addDays(days_num){
    return date_instance=> (date_instance.setDate(date_instance.getDate()+days_num), date_instance);
}
/**
 * This modify given **Date** instance (add months).
 * @method addMonths
 * @memberof module:jaaJSU~$time.Date
 * @public
 * @param {Number} months_num How many months to add to `date_instance`
 * @returns {module:jaaJSU~$time.function_Date2Date}
 * */
function addMonths(months_num){
    return date_instance=> (date_instance.setMonth(date_instance.getMonth()+months_num), date_instance);
}
/**
 * @method getWeekDay
 * @memberof module:jaaJSU~$time.Date
 * @public
 * @param {String} [type="numeric"] Show week numebr by default or se `weekday` in **MDN** see {@link module:jaaJSU~$time.toLocaleStringOptions}
 * @param {module:jaaJSU~$time.toLocaleStringOptions} [toLocaleStringOptions] Key `declension` is redutant for this function
 * @returns {module:jaaJSU~$time.function_Date2Number} If `type="numeric"`, it returns **0 (Su) - 6 (Sa)**, else it returns **name of week day**
 * */
function getWeekDay(type= "numeric", { locale= internal_locale, timeZone= internal_zone }= {}){
    return type==="numeric" ? date_instance=> date_instance.getDay() : date_instance=> date_instance.toLocaleString(locale, timeZone ? { timeZone, weekday: type } : { timeZone, weekday: type });
}
/**
 * This return ISO number of week.
 * @method getWeekNumber
 * @memberof module:jaaJSU~$time.Date
 * @public
 * @param {Date} date_instance
 * @return {Number} In fact, it calculates no. of thursdays from this week to the first one (January 4 is always in week 1.)
 */
function getWeekNumber(date_instance){
    const tdt= new Date(date_instance.valueOf());
    tdt.setDate(tdt.getDate() + 3 - (date_instance.getDay() + 6) % 7);
    var firstThursday = tdt.valueOf();
    tdt.setMonth(0, 1);
    if(tdt.getDay() !== 4){
        tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - tdt) / 604800000);
}