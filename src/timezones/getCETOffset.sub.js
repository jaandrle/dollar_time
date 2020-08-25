/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* from_functions *//* global fromNow */
export function getCETOffset([ date, time ]= []){
    if(!date||!time){
        let curr= fromNow();
        if(!date) date= curr[0];
        if(!time) time= curr[1].replace(/\.\d+/, "");
    }
    const /* repeting things for getting nexts consts group (line 1), for comparing in return (line 2) */
        timeZone= "Europe/Prague", locale= "en-GB", date_and_time= date+time,
        en_date_version= date.split("-").reverse().join("/")+", "+time.replace("T", "");
    const /* for comparing in return */
        [ date_one_hour, date_two_hours ]= [ "+01:00", "+02:00" ].map(offset=> new Date(date_and_time+offset).toLocaleString(locale, { timeZone }));
    return en_date_version===date_one_hour ? "+01:00" : en_date_version===date_two_hours ? "+02:00" : "Z";
}