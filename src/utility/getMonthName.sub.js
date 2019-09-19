/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/**
* @method getMonthName
* @memberof module:jaaJSU~$time
* @public
* @param {Number} n Month number (typically [1-12]); Works cyclically `13===1, ...`
* @param {Number|Boolean} [l=undefined] Length of output Month name
* @return {String} English month name
* @example
* console.log($time.getMonthName(5));//"May"
* console.log($time.getMonthName(24, 4));//"Dece"
*/
function getMonthName(n,l) {
    if(typeof n!=="number") n= parseInt(n);
    if(isNaN(n)) return false;
    let s= ["December","January","February","March","April","May","June", "July","August","September","October","November"];
    let v= s[n%12];
    if(l){
        if(l===-1){l=3; if(v.length===4) l=4;}
        v= v.substring(0,l);
    }
    return v;
}