/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/**
* Function adds leading zero to the `time`. [It can be replaced in future: see `padStart`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)
* @method double
* @memberof module:jaaJSU~$time
* @public
* @param {Number|String} time
* @return {String}
*  * 00, 01, 02, ..., 09, 10, ..., 100, ...
*/
export function double(n){
    n= String(n);
    return n.length===1 ? "0"+n : n;
}