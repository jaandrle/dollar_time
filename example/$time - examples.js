/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true, devel: true */
const $function= { sequention: function(...functions){return function(input){let current= input; for(let i=0, i_length= functions.length; i<i_length; i++){ current= functions[i](current); } return current; }; } };
/* global $time */
const main_el= document.getElementById("main");

function test(text, schould, originally){
    const el= document.createElement("P");
    text= (text.toString && text.toString()) || text;
    const ok= text===schould;
    const originally_text= !originally ? "" : (" (originally: "+originally+")");
    if(ok) Object.assign(el, { textContent: "OK: "+text+originally_text, style: "color: green" });
    else Object.assign(el, { textContent: "Failed: "+text+" (schould be: '"+schould+"')", style: "color: red" });
    main_el.append(el);
}
function log(text){
    const el= document.createElement("h4");
    el.textContent= (text.toString && text.toString()) || text;
    main_el.append(el);
}

let res;


log(`moment("2019-07-01").add({ day: -6 }).format("YYYY-MM-DD")`);
res= $function.sequention( $time.fromString, $time.modify({ addDays: -6 }), $time.toString("YYYY-MM-DD") )("2019-07-01");
test(res, "2019-06-25");

log(`moment("2019-07-01").format("W")`);
res= $function.sequention( $time.fromString, $time.toString("W") )("2019-07-01");
test(res, "27");

log(`moment("2019-07-01").format("W")+"th"`);
res= $function.sequention( $time.fromString, $time.toString("Wo") )("2019-07-01");
test(res, "27th");

log(`moment("2019-07-01").format("dddd[, ]Do MMMM YYYY")`);
res= $function.sequention( $time.fromString, $time.toString("dddd[, ]Do MMMM YYYY") )("2019-07-01");
test(res, "Monday, 1st July 2019");

log(`moment("2000-01-01").format("dddd[, ]Do MMMM YYYY")`);
res= $function.sequention( $time.fromString, $time.toString("dddd[, ]Do MMMM YYYY") )("2000-01-01");
test(res, "Saturday, 1st January 2000");

log(`moment("2019-07-07").weekday() … 0(Sun)-6(Sat)`);
res= $function.sequention( $time.fromString, $time.toDate, $time.Date_utils.getWeekDay() )("2019-07-07");
test(res, "0");
res= $function.sequention( $time.fromString, $time.toString("d") )("2019-01-07");
test(res, "1");

log(`moment("2019-07-01").format("ddd")`);
res= $function.sequention( $time.fromString, $time.toString("ddd") )("2019-01-07");
test(res, "Mon");
log(`moment("2019-07-01").format("dd")`);
res= $function.sequention( $time.fromString, $time.toString("dd") )("2019-01-07");
test(res, "Mo");

$time._toRelativeFromStrings= $function.sequention( $time.fromString, $time.toRelative($time.fromString("2019-07-10 12:35:15")) );

log(`moment("2019-07-10 12:35:14").from("2019-07-10 12:35:15")`);
res= $time._toRelativeFromStrings("2019-07-10 12:35:14");
test(res, "1 second ago", "now");


log(`moment("2019-07-10 12:35:10").from("2019-07-10 12:35:15")`);
res= $time._toRelativeFromStrings("2019-07-10 12:35:10");
test(res, "5 seconds ago", "a few seconds ago");


log(`moment("2019-07-10 12:34:30").from("2019-07-10 12:35:15")`);
res= $time._toRelativeFromStrings("2019-07-10 12:34:30");
test(res, "45 seconds ago");


log(`moment("2019-07-10 12:34:15").from("2019-07-10 12:35:15")`);
res= $time._toRelativeFromStrings("2019-07-10 12:34:15");
test(res, "1 minute ago", "a minute ago");


log(`moment("2019-07-10 12:32:15").from("2019-07-10 12:35:15")`);
res= $time._toRelativeFromStrings("2019-07-10 12:32:15");
test(res, "3 minutes ago");


log(`moment("2019-07-10 11:32:15").from("2019-07-10 12:35:15")`);
res= $time._toRelativeFromStrings("2019-07-10 11:32:15");
test(res, "1 hour ago", "an hour ago");


log(`moment("2019-07-10 09:32:15").from("2019-07-10 12:35:15")`);
res= $time._toRelativeFromStrings("2019-07-10 09:32:15");
test(res, "3 hours ago");

log(`moment("2019-07-09 09:32:15").from("2019-07-10 12:35:15")`);
res= $time._toRelativeFromStrings("2019-07-09 09:32:15");
test(res, "yesterday", "a day ago");

log(`moment("2019-07-01 09:32:15").from("2019-07-10 12:35:15")`);
res= $time._toRelativeFromStrings("2019-07-01 09:32:15");
test(res, "9 days ago");

log(`moment("2019-06-01 09:32:15").from("2019-07-10 12:35:15")`);
res= $time._toRelativeFromStrings("2019-06-01 09:32:15");
test(res, "last month", "a month ago");


log(`moment("2018-10-01 09:32:15").from("2019-07-10 12:35:15")`);
res= $time._toRelativeFromStrings("2018-10-01 09:32:15");
test(res, "9 months ago");

log(`moment("2018-07-01 09:32:15").from("2019-07-10 12:35:15")`);
res= $time._toRelativeFromStrings("2018-07-01 09:32:15");
test(res, "last year", "a year ago");

log(`moment("2017-10-01 09:32:15").from("2019-07-10 12:35:15")`);
res= $time._toRelativeFromStrings("2017-10-01 09:32:15");
test(res, "2 years ago");
