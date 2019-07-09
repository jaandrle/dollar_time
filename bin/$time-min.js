const $time=function(){const a=(({HHmm:a,YYYYMMDD:e,SS:i})=>({HHmm:a,YYYYMMDD:e,HHmmSS:Object.assign(i,a)}))({HHmm:{hour:"2-digit",minute:"2-digit"},YYYYMMDD:{year:"numeric",day:"2-digit",month:"2-digit"},SS:{second:"2-digit"}}),e=(({dash:a,colon:e,space:i,two_dig:r})=>({YYYYMMDDHHmmss:[["year","numeric"],a,["month",r],a,["day",r],i,["hour",r,"h23"],e,["minute",r],e,["second",r]],YYYYMMDD:[["year","numeric"],a,["month",r],a,["day",r]]}))({dash:["text","-"],colon:["text",":"],space:["text"," "],two_dig:"2-digit"}),i=["th","st","nd","rd"],r=a=>-1!==a.indexOf("-"),n=a=>-1!==a.indexOf("T");let t="en-GB",c="";const o=Object.freeze(["Europe/Andorra","Asia/Dubai","Asia/Kabul","Europe/Tirane","Asia/Yerevan","Antarctica/Casey","Antarctica/Davis","Antarctica/Mawson","Antarctica/Palmer","Antarctica/Rothera","Antarctica/Syowa","Antarctica/Troll","Antarctica/Vostok","America/Argentina/Buenos_Aires","America/Argentina/Cordoba","America/Argentina/Salta","America/Argentina/Jujuy","America/Argentina/Tucuman","America/Argentina/Catamarca","America/Argentina/La_Rioja","America/Argentina/San_Juan","America/Argentina/Mendoza","America/Argentina/San_Luis","America/Argentina/Rio_Gallegos","America/Argentina/Ushuaia","Pacific/Pago_Pago","Europe/Vienna","Australia/Lord_Howe","Antarctica/Macquarie","Australia/Hobart","Australia/Currie","Australia/Melbourne","Australia/Sydney","Australia/Broken_Hill","Australia/Brisbane","Australia/Lindeman","Australia/Adelaide","Australia/Darwin","Australia/Perth","Australia/Eucla","Asia/Baku","America/Barbados","Asia/Dhaka","Europe/Brussels","Europe/Sofia","Atlantic/Bermuda","Asia/Brunei","America/La_Paz","America/Noronha","America/Belem","America/Fortaleza","America/Recife","America/Araguaina","America/Maceio","America/Bahia","America/Sao_Paulo","America/Campo_Grande","America/Cuiaba","America/Santarem","America/Porto_Velho","America/Boa_Vista","America/Manaus","America/Eirunepe","America/Rio_Branco","America/Nassau","Asia/Thimphu","Europe/Minsk","America/Belize","America/St_Johns","America/Halifax","America/Glace_Bay","America/Moncton","America/Goose_Bay","America/Blanc-Sablon","America/Toronto","America/Nipigon","America/Thunder_Bay","America/Iqaluit","America/Pangnirtung","America/Atikokan","America/Winnipeg","America/Rainy_River","America/Resolute","America/Rankin_Inlet","America/Regina","America/Swift_Current","America/Edmonton","America/Cambridge_Bay","America/Yellowknife","America/Inuvik","America/Creston","America/Dawson_Creek","America/Fort_Nelson","America/Vancouver","America/Whitehorse","America/Dawson","Indian/Cocos","Europe/Zurich","Africa/Abidjan","Pacific/Rarotonga","America/Santiago","America/Punta_Arenas","Pacific/Easter","Asia/Shanghai","Asia/Urumqi","America/Bogota","America/Costa_Rica","America/Havana","Atlantic/Cape_Verde","America/Curacao","Indian/Christmas","Asia/Nicosia","Asia/Famagusta","Europe/Prague","Europe/Berlin","Europe/Copenhagen","America/Santo_Domingo","Africa/Algiers","America/Guayaquil","Pacific/Galapagos","Europe/Tallinn","Africa/Cairo","Africa/El_Aaiun","Europe/Madrid","Africa/Ceuta","Atlantic/Canary","Europe/Helsinki","Pacific/Fiji","Atlantic/Stanley","Pacific/Chuuk","Pacific/Pohnpei","Pacific/Kosrae","Atlantic/Faroe","Europe/Paris","Europe/London","Asia/Tbilisi","America/Cayenne","Africa/Accra","Europe/Gibraltar","America/Godthab","America/Danmarkshavn","America/Scoresbysund","America/Thule","Europe/Athens","Atlantic/South_Georgia","America/Guatemala","Pacific/Guam","Africa/Bissau","America/Guyana","Asia/Hong_Kong","America/Tegucigalpa","America/Port-au-Prince","Europe/Budapest","Asia/Jakarta","Asia/Pontianak","Asia/Makassar","Asia/Jayapura","Europe/Dublin","Asia/Jerusalem","Asia/Kolkata","Indian/Chagos","Asia/Baghdad","Asia/Tehran","Atlantic/Reykjavik","Europe/Rome","America/Jamaica","Asia/Amman","Asia/Tokyo","Africa/Nairobi","Asia/Bishkek","Pacific/Tarawa","Pacific/Enderbury","Pacific/Kiritimati","Asia/Pyongyang","Asia/Seoul","Asia/Almaty","Asia/Qyzylorda","Asia/Aqtobe","Asia/Aqtau","Asia/Atyrau","Asia/Oral","Asia/Beirut","Asia/Colombo","Africa/Monrovia","Europe/Vilnius","Europe/Luxembourg","Europe/Riga","Africa/Tripoli","Africa/Casablanca","Europe/Monaco","Europe/Chisinau","Pacific/Majuro","Pacific/Kwajalein","Asia/Yangon","Asia/Ulaanbaatar","Asia/Hovd","Asia/Choibalsan","Asia/Macau","America/Martinique","Europe/Malta","Indian/Mauritius","Indian/Maldives","America/Mexico_City","America/Cancun","America/Merida","America/Monterrey","America/Matamoros","America/Mazatlan","America/Chihuahua","America/Ojinaga","America/Hermosillo","America/Tijuana","America/Bahia_Banderas","Asia/Kuala_Lumpur","Asia/Kuching","Africa/Maputo","Africa/Windhoek","Pacific/Noumea","Pacific/Norfolk","Africa/Lagos","America/Managua","Europe/Amsterdam","Europe/Oslo","Asia/Kathmandu","Pacific/Nauru","Pacific/Niue","Pacific/Auckland","Pacific/Chatham","America/Panama","America/Lima","Pacific/Tahiti","Pacific/Marquesas","Pacific/Gambier","Pacific/Port_Moresby","Pacific/Bougainville","Asia/Manila","Asia/Karachi","Europe/Warsaw","America/Miquelon","Pacific/Pitcairn","America/Puerto_Rico","Asia/Gaza","Asia/Hebron","Europe/Lisbon","Atlantic/Madeira","Atlantic/Azores","Pacific/Palau","America/Asuncion","Asia/Qatar","Indian/Reunion","Europe/Bucharest","Europe/Belgrade","Europe/Kaliningrad","Europe/Moscow","Europe/Simferopol","Europe/Kirov","Europe/Astrakhan","Europe/Volgograd","Europe/Saratov","Europe/Ulyanovsk","Europe/Samara","Asia/Yekaterinburg","Asia/Omsk","Asia/Novosibirsk","Asia/Barnaul","Asia/Tomsk","Asia/Novokuznetsk","Asia/Krasnoyarsk","Asia/Irkutsk","Asia/Chita","Asia/Yakutsk","Asia/Khandyga","Asia/Vladivostok","Asia/Ust-Nera","Asia/Magadan","Asia/Sakhalin","Asia/Srednekolymsk","Asia/Kamchatka","Asia/Anadyr","Asia/Riyadh","Pacific/Guadalcanal","Indian/Mahe","Africa/Khartoum","Europe/Stockholm","Asia/Singapore","America/Paramaribo","Africa/Juba","Africa/Sao_Tome","America/El_Salvador","Asia/Damascus","America/Grand_Turk","Africa/Ndjamena","Indian/Kerguelen","Asia/Bangkok","Asia/Dushanbe","Pacific/Fakaofo","Asia/Dili","Asia/Ashgabat","Africa/Tunis","Pacific/Tongatapu","Europe/Istanbul","America/Port_of_Spain","Pacific/Funafuti","Asia/Taipei","Europe/Kiev","Europe/Uzhgorod","Europe/Zaporozhye","Pacific/Wake","America/New_York","America/Detroit","America/Kentucky/Louisville","America/Kentucky/Monticello","America/Indiana/Indianapolis","America/Indiana/Vincennes","America/Indiana/Winamac","America/Indiana/Marengo","America/Indiana/Petersburg","America/Indiana/Vevay","America/Chicago","America/Indiana/Tell_City","America/Indiana/Knox","America/Menominee","America/North_Dakota/Center","America/North_Dakota/New_Salem","America/North_Dakota/Beulah","America/Denver","America/Boise","America/Phoenix","America/Los_Angeles","America/Anchorage","America/Juneau","America/Sitka","America/Metlakatla","America/Yakutat","America/Nome","America/Adak","Pacific/Honolulu","America/Montevideo","Asia/Samarkand","Asia/Tashkent","America/Caracas","Asia/Ho_Chi_Minh","Pacific/Efate","Pacific/Wallis","Pacific/Apia","Africa/Johannesburg"]),s=Object.freeze({"-01:00":108,"-02:00":144,"-03:00":337,"-04:00":340,"-05:00":229,"-06:00":288,"-07:00":327,"-08:00":239,"-09:00":232,"-09:30":231,"-10:00":336,"-11:00":225,"+01:00":291,"+02:00":345,"+03:00":300,"+04:00":281,"+04:30":2,"+05:00":339,"+05:30":182,"+05:45":223,"+06:00":262,"+06:30":193,"+07:00":341,"+08:00":303,"+08:30":173,"+08:45":39,"+09:00":296,"+09:30":37,"+10:00":273,"+11:00":342,"+12:00":343,"+13:00":295,"+14:00":172,BST:134,CET:113,EET:250,WET:243});function u(a){return m(a.toISOString())}function A(){return m((new Date).toISOString())}function m(a){let e,i,r=0,n="",t="",c="",o="";for(;a.length;)e=a[0],/\d/.test(e)?a.search(/\d\d\d\d-\d\d-\d\d/)?a.search(/\d\d\/\d\d\/\d\d\d\d/)?a.search(/\d\d:\d\d:\d\d/)?a.search(/\d\d:\d\d/)?a=a.substr(1):(c="T"+a.substr(0,5)+":00",a=a.substr(5)):(c="T"+a.substr(0,8),a=a.substr(8)):(t=a.substr(0,10).split("/").sort((a,e)=>e).join("-"),a=a.substr(10)):(t=a.substr(0,10),a=a.substr(10)):/[ ,\._]/.test(e)||/T\d/.test(e)?a=a.substr(1):a.search(/[\+\-]\d\d:\d\d/)?a.search(/[A-Z]{2,}/)?"Z"===e?(o="Z",a=a.substr(1)):a=a.substr(1):(n=-1===(i=a.search(/[^A-Z]/))?a:a.substr(0,i),a=a.substr(n.length),"CET"===n&&(o=n,n="")):(n=a.substr(0,6),a=a.substr(6),Reflect.has(s,n)&&(o=n,n="")),(r+=1)>5&&t&&c&&o&&(a="");return[t,c,o]}function l(a,{locale:e=t,declension:i=!0,timeZone:r=c}={}){return a?n=>a.map(function(a,e,i,r){const n=k.bind(null,i);return function([i,t,c]){let o=function(a,e,i,r,n,t,c){switch(!0){case"text"===e:return i;case"week"===e:return P(a);case"weekday"===e&&"numeric"===i:return E()(a);case"month"===e&&"long"===i&&n:return a.toLocaleString(t,c({[e]:i,day:"numeric"})).replace(/[\d \.\/\\]/g,"");case"hour"===e&&"a"===r.toLowerCase():return a.toLocaleString("A"===r?"en-US":"en-GB",c({[e]:i,hourCycle:"h12"})).replace(/[\d \.\/\\]/g,"");case"hour"===e:return a.toLocaleString(t,c({[e]:i,hourCycle:r})).replace(/[ \.\/\\pam]/gi,"");default:return a.toLocaleString(t,c({[e]:i}))}}(a,i,t,c,r,e,n);return"2-digit"===t&&1===o.length&&(o="0"+o),"two_letters"===c?o=o.substr(0,2):"ordinal_number"===c&&-1!==e.indexOf("en")&&(o=T(o)),o}}(d(n),e,r,i)).join(""):a=>a.join("")}function d([a,e,i]=[]){return a||(a=A()[0]),e||(e="T00:00:00"),i||(i=b(a)),"CET"===i&&(i=h([a,e])),new Date(a+e+i)}function g(a,e=1){const i=!!a&&d(a).getTime();return function(a){return(d(a).getTime()-(i||d(A()).getTime()))/e}}function f(a){const{abs:e,floor:i,round:r}=Math,n=a<0?"%s ago":"in %s";return(a=e(a))<1500?"now":(a=i(a/1e3))<10?n.replace("%s","a few seconds"):a<60?n.replace("%s",a+" seconds"):1===(a=i(a/60))?n.replace("%s","a minute"):a<60?n.replace("%s",a+" minutes"):1===(a=r(a/60))?n.replace("%s","an hour"):a<24?n.replace("%s",a+" hours"):1===r(a/=24)?n.replace("%s","a day"):a<29.5?n.replace("%s",r(a)+" days"):1===r(a/=30.41666)?n.replace("%s","a month"):a<12?n.replace("%s",r(a)+" months"):1===(a=r(a/12))?n.replace("%s","a year"):n.replace("%s",a+" years")}function h([a,e]=[]){if(!a||!e){let i=A();a||(a=i[0]),e||(e=i[1].replace(/\.\d+/,""))}const i=a+e,r=a.split("-").reverse().join("/")+", "+e.replace("T",""),[n,t]=["+01:00","+02:00"].map(a=>new Date(i+a).toLocaleString("en-GB",{timeZone:"Europe/Prague"}));return r===n?"+01:00":r===t?"+02:00":"Z"}function p(a){return M(a).getTimezoneOffset()}function b(a){return y(p(a))}function k(a,e){return a?-1!==o.indexOf(a)?Object.assign({timeZone:a},e):void 0!==s[a]?Object.assign({timeZone:o[s[a]]},e):e:e}function M(a){return a?(Array.isArray(a)||(a=m(a)),new Date(...a[0].split("-").map((a,e)=>1===e?+a-1:+a))):new Date}function y(a){const{floor:e,abs:i}=Math;let r=a>0?"-":"+";return r+=_(e((a=i(a))/60))+":"+_(a%60)}function D(a){return e=>(e.setDate(e.getDate()+a),e)}function S(a){return e=>(e.setMonth(e.getMonth()+a),e)}function E(a="numeric",{locale:e=t,timeZone:i=c}={}){return"numeric"===a?a=>a.getDay():i=>i.toLocaleString(e,{weekday:a})}function P(a){const e=new Date(a.valueOf());e.setDate(e.getDate()+3-(a.getDay()+6)%7);var i=e.valueOf();return e.setMonth(0,1),4!==e.getDay()&&e.setMonth(0,1+(4-e.getDay()+7)%7),1+Math.ceil((i-e)/6048e5)}function _(a){return 1===(a=String(a)).length?"0"+a:a}function T(a){const e="number"==typeof a?a:parseInt(a);if(isNaN(e))return a;let r=e%100;return a+(i[(r-20)%10]||i[r]||i[0])}return{_:void 0,fromNow:A,fromString:function(a,e=c){if(!a)return A();let i=m(a);return 3!==i.length?r(i[0])?n(i[1])?i[2]=e||"":(i[2]=e||i[1],i[1]=""):i.unshift(""):e&&(i[2]=e),i},fromDate:u,fromDateArguments:function(...a){return m((a.filter(a=>void 0!==a).length?new Date(...a):new Date).toISOString())},toDate:d,toString:function(a,e){return l(!!a&&function(a=""){let e=[];for(;a.length;)switch(a[0]){case"M":i();break;case"d":r();break;case"W":t("week","W");break;case"Y":n();break;case"D":t("day","D");break;case"H":c("hour","H","h23");break;case"k":c("hour","k","h24");break;case"h":c("hour","h","h12");break;case"A":o("A");break;case"a":o("a");break;case"m":s("minute","m");break;case"s":s("second","s");break;case"[":u();break;default:let A=a[0];"text"===e[e.length-1][0]?e[e.length-1][1]+=A:e.push(["text",A]),a=a.substring(1)}function i(){let i="numeric";if(a.search(/MMMM/))if(a.search(/MMM/))if(a.search(/MM/)){if(!a.search(/Mo/))return a=a.substring(2),e.push(["month",i,"ordinal_number"]);a=a.substring(1)}else i="2-digit",a=a.substring(2);else i="short",a=a.substring(3);else i="long",a=a.substring(4);e.push(["month",i])}function r(){let i="numeric";if(a.search(/dddd/))if(a.search(/ddd/)){if(!a.search(/dd/))return i="short",a=a.substring(2),e.push(["weekday",i,"two_letters"]);a=a.substring(1)}else i="short",a=a.substring(3);else i="long",a=a.substring(4);e.push(["weekday",i])}function n(){let i="2-digit";a.search(/YYYY/)?a=a.substring(2):(i="numeric",a=a.substring(4)),e.push(["year",i])}function t(i,r){let n="numeric";if(!a.search(new RegExp(r+"o")))return a=a.substring(2),e.push([i,n,"ordinal_number"]);a.search(new RegExp(r+r))?a=a.substring(1):(n="2-digit",a=a.substring(2)),e.push([i,n])}function c(i,r,n){let t="numeric";a.search(new RegExp(r+r))?a=a.substring(1):(t="2-digit",a=a.substring(2)),e.push([i,t,n])}function o(i){a=a.substring(1),e.push(["hour","numeric",i])}function s(i,r){let n="numeric";a.search(new RegExp(r+r))?a=a.substring(1):(n="2-digit",a=a.substring(2)),e.push([i,n])}function u(){const i=a.indexOf("]");if(-1===i)return a=a.substring(1),!1;e.push(["text",a.substr(1,i-1)]),a=a.substr(i+1)}return e}(a),e)},toDateTimeString:function(a){return l(e.YYYYMMDDHHmmss,a)},toDateString:function(a){return l(e.YYYYMMDD,a)},toLocaleTimeString:function(e="HHmmSS",{locale:i=t,timeZone:r=c}={}){return n=>d(n).toLocaleString(i,k(r,a[e]))},toLocaleDateString:function(e="YYYYMMDD",{locale:i=t,timeZone:r=c}={}){return n=>d(n).toLocaleString(i,k(r,a[e]))},toRelative:function(a){return e=>f(g(a)(e))},getDiff:function(a,e="seconds",i=!1){const r=g(a,-{seconds:1e3,minutes:6e4,hours:36e5,days:864e5,weeks:6048e5,months:24192e5,years:290304e5}[e]);return function(a){const e=r(a);return i?e:Math.floor(e)}},getRelative:f,getCETOffset:h,getTimeZoneOffset:p,getTimeZoneOffsetString:b,getTimeZone:function(a,{locale:e=t,description:i="long",offset:r=!1}={}){const n=M(a);let c="none"===i?"":n.toLocaleString(e,{timeZoneName:i}).replace(n.toLocaleString(e),"").trim();const o=r?"UTC"+y(n.getTimezoneOffset()):"";return c&&o&&(c=" ("+c+")"),o+c},Date:{getWeekDay:E,getWeekNumber:P,addDays:D,addMonths:S},setTimeZone:function(a=c){return([e="",i=""]=[])=>[e,i,a]},modify:function(a){const e=Object.keys(a);return function(i){const r=d(i);for(let i,n=0;i=e[n];n++)"addDays"===i?D(a[i])(r):"addMonths"===i?S(a[i])(r):"setMonth"===i?r.setMonth(a[i]-1):Reflect.has(r,i)?r[i](a[i]):"setDay"===i&&r.setDate(a[i]);return u(r)}},double:_,getOrdinalSuffix:T,getMonthName:function(a,e){if("number"!=typeof a&&(a=parseInt(a)),isNaN(a))return!1;let i=["December","January","February","March","April","May","June","July","August","September","October","November"][a%12];return e&&(-1===e&&(e=3,4===i.length&&(e=4)),i=i.substring(0,e)),i},getDaysInMonth:function(a,e=(new Date).getFullYear()){return new Date(e,+a,0).getDate()},getTimeZones:()=>o,isTimeZone:a=>-1!==o.indexOf(a),setInternalZone:a=>c=a,setInternalLocale:a=>t=a}}();