/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* init *//* global ary_ianna_time_offsets */
function toDateArray(timestamp_string){
    let letter, counter= 0, acc= "", substr_index, date= "", time= "", zone= "";
    while(timestamp_string.length){
        letter= timestamp_string[0];
        if(/\d/.test(letter)){
            if(!timestamp_string.search(/\d\d\d\d-\d\d-\d\d/)){
                date= timestamp_string.substr(0, 10);
                timestamp_string= timestamp_string.substr(10);
            } else if(!timestamp_string.search(/\d\d\/\d\d\/\d\d\d\d/)){
                date= timestamp_string.substr(0, 10).split("/").sort((_,k)=> k).join("-");
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
        } else if(/[ ,\._]/.test(letter)||/T\d/.test(letter)){
            timestamp_string= timestamp_string.substr(1);
        } else if(!timestamp_string.search(/[\+\-]\d\d:\d\d/)){
            acc= timestamp_string.substr(0, 6);
            timestamp_string= timestamp_string.substr(6);
            if(Reflect.has(ary_ianna_time_offsets, acc)){
                zone= acc;
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
        counter+= 1; if(counter>5 && date&&time&&zone){ timestamp_string= ""; }
    }
    return [ date, time, zone ];
}