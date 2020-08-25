/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true, maxparams: 8, maxdepth: 3, maxcomplexity: 17, maxparams: 8 */
gulp_place("all", "clean");
gulp_place('{ "file": "$time_main.sub.js", "name": "$time" }', "combine");
