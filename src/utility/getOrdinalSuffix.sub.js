/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* init *//* global ordinal_numbers */
/**
 * See {@link $time.ordinal_numbers}.
 * @method getOrdinalSuffix
 * @memberof $time
 * @public
 * @param {Number} n
 * @return {String} `n`+English suffix
 * @example
 * console.log($time.getOrdinalSuffix(1));//"1st"
 */
function getOrdinalSuffix(n_orig) {
    const n= typeof n_orig==="number" ? n_orig : parseInt(n_orig);
    if(isNaN(n)) return n_orig;
    let v= n%100;
    return n_orig+(ordinal_numbers[(v-20)%10]||ordinal_numbers[v]||ordinal_numbers[0]);
}