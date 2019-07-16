/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* init *//* global internal_zone */
function redefineTimeZone(zone= internal_zone){
    return ([ date= "", time= "" ]= [])=> [ date, time, zone ];
}