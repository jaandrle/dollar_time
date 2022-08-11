/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* init *//* global ary_ianna_time_offsets */
function toDateArray(timestamp_string){
    let /* these hold outputs */
        date= "", time= "", zone= "";
    let /* iteration vars: curr letter instring +helpers for timezones */
        letter, acc= "", substr_index;
    while(timestamp_string.length){
        letter= timestamp_string[0];
        if(/\d/.test(letter)){
            if(!timestamp_string.search(/\d\d\d\d-\d\d-\d\d/)){
                date= timestamp_string.substr(0, 10);
                timestamp_string= timestamp_string.substr(10);
            } else if(!timestamp_string.search(/\d\d\/\d\d\/\d\d\d\d/)){
                date= timestamp_string.substr(0, 10).split("/").sort(()=> -1).join("-");
                timestamp_string= timestamp_string.substr(10);
            } else if(!timestamp_string.search(/\d\d:\d\d:\d\d/)){
                time= "T"+timestamp_string.substr(0, 8);
                timestamp_string= timestamp_string.substr(8);
            } else if(!timestamp_string.search(/\d\d:\d\d/)){
                time= "T"+timestamp_string.substr(0, 5)+":00";
                timestamp_string= timestamp_string.substr(5);
            } else {
                timestamp_string= timestamp_string.substr(1);
            }
        } else if(/[ ,\._]/.test(letter)||!timestamp_string.substring(0, 2).search(/T\d/)){
            timestamp_string= timestamp_string.substr(1);
        } else if(!timestamp_string.search(/[\+\-]\d\d:\d\d/)){
            acc= timestamp_string.substr(0, 6);
            timestamp_string= timestamp_string.substr(6);
            if(Reflect.has(ary_ianna_time_offsets, acc)){
                zone= acc;
                acc= "";
            } else if(acc.substr(1,5)==="00:00"){
                zone= "Z";
                acc= "";
            }
        } else if(!timestamp_string.search(/[A-Z]{2,}/)){
            substr_index= timestamp_string.search(/[^A-Z]/);
            acc= substr_index===-1 ? timestamp_string : timestamp_string.substr(0, substr_index);
            timestamp_string= timestamp_string.substr(acc.length);
            if(acc==="CET"){//Reflect.has(ary_ianna_time_offsets, acc)
                zone= acc;
                acc= "";
            }
        } else if(letter==="Z"){
            zone= "Z";
            timestamp_string= timestamp_string.substr(1);
        } else {
            timestamp_string= timestamp_string.substr(1);
        }
        if(date&&time&&zone){ timestamp_string= ""; }
    }
    return [ date, time, zone ];
}