/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* global console, $time */
const $function= { sequention: function(...functions){return function(input){let current= input; for(let i=0, i_length= functions.length; i<i_length; i++){ current= functions[i](current); } return current; }; } };
const main_el= document.getElementById("main");