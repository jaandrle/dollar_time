/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* from_functions *//* global fromDate */
/* to_functions *//* global toDate */
/* modify/Date *//* global addDays, addMonths */
/**
 * @function function_DateArray
 * @memberof $time.types
 * @param {$time.types.DateArray} date_array
 * @returns {$time.types.DateArray}
 */
/**
 * Curried method `mod_obj=> date_array=> result` – `mod_obj` holds information how modify given `date_array` **&lt;DateArray&gt;**. Result is again **&lt;DateArray&gt;**.
 * @method modify
 * @memberof $time
 * @public
 * @param {Object} mod_obj
 * <br/>- object literal representing requested operations
 * <br/>- use name convention like [setters for `Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#Setter) (only one argument is allowed)
 * <br/>- supports also *add\** commands with the same notation ("setMonth" => "addMonth")
 * <br/>- **IMPORTANT NOTE:** There are three behaviour changes
 * <br/>&nbsp;&nbsp;&nbsp;&nbsp;- "setMonth" is indexed from 1 (instead of 0)
 * <br/>&nbsp;&nbsp;&nbsp;&nbsp;- for "setDate" there is alias "setDay"
 * <br/>&nbsp;&nbsp;&nbsp;&nbsp;- for "addDate" there is alias "addDays"
 * <br/>- Some operations: **"\*Date"** (or **"setDay"**, **"addDays"**), **"\*Month"**, **"\*FullYear"**, **"\*Hours"**, **"\*Minutes"**, **"\*Seconds"**
 * @returns {$time.types.function_DateArray}
 */
function modify(mod_obj){
    const operations= Object.keys(mod_obj);
    return function(date_array){
        const dateObject= toDate(date_array);
        for(let i=0, operation; ( operation= operations[i] ); i++){
            if(operation==="addDays") addDays(mod_obj[operation])(dateObject);
            else if(operation.substr(0,3)==="add") modifyAdditions(operation, mod_obj[operation], dateObject);
            else if(operation==="setMonth") dateObject.setMonth(mod_obj[operation]-1);
            else if(Reflect.has(dateObject, operation)) dateObject[operation](mod_obj[operation]);
            else if(operation==="setDay") dateObject.setDate(mod_obj[operation]);
        }
        return fromDate(dateObject);
    };
}
/**
 * Helper method for invoking "add*" operations in [`modify`](#methods_modify).
 * 
 * In general `d.set...(d.get...+${value})` (where `d` is instance of `Date`).
 * @method modifyAdditions
 * @memberof $time
 * @private
 * @param {String} operation e.g. "addMonth"
 * @param {Number} value mainly argument (number) for 
 * @param {Date} dateObject instance of `Date`
 * @returns {Date} returns `dateObject`
 */
function modifyAdditions(operation, value, dateObject){
    const cmd= operation.substr(3); /* addMonth=> ...Month => (set/get)Month */
    dateObject["set"+cmd](dateObject["get"+cmd]()+value);
    return dateObject;
}