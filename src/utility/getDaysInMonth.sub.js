/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
function getDaysInMonth(month_number, year= (new Date()).getFullYear()){/* months indexing from 0 */
    return new Date(year, +month_number, 0 /* last in prev month */).getDate();
}