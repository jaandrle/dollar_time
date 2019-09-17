# jaaJSU > $time ( jaandrle > JavaScript Utils > $time namespace )
Subrepository for https://github.com/jaandrle/jaaJSU ($time namespace)

Namespace `$time` contains utilites for working with JavaScript dates in *functional way*. There are *$time.from\** functions which create array in form of `[ date, time, zone ]` (e.g. `[ "2019-02-06", "T12:00:00", "Z" ]`) … so *.join("")* is valid argument for **Date** class. When it is combined with `$function.sequention` (from **jaaJSU**, or similar *pipe* function for exmple [Ramda `R.pipe`](https://ramdajs.com/docs/#pipe)) it is possible to write:
```JavaScript
    /* manipulations */
    $function.sequention( $time.fromString, $time.modify({ addDays: -6 }), $time.toString("YYYY-MM-DD") )("2019-07-01");
    //= "2019-06-25"
```

Library also supports localization - internaly uses [`Date.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString).

**IMPORTANT NOTE 1:** This is primary for my (company) internal purpose, but it can be helpful for others at least for inspiration. One of the reason was to replace [Moment.js ](https://momentjs.com/) so some parts are inspired with this library.

**IMPORTANT NOTE 2: There isn't strict development cycle for now + WIP!!!**

**IMPORTANT NOTE 3: Supports all modern browsers — main limitations are new patterns (e.g. arrow functions) and [`Date.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) see [compatibility table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString#Browser_compatibility) (iOS webkit in Cordova works - based on my tests, but I haven't found any official report about it)**
## Links
- **WIP !!!** [Documentation](docs/$time.md)
## Contribute
- Installation: use `node install`
- Build: use `gulp`
- Build parameters can be changed in: `package.json`
## Quick examples
```JavaScript
    /* just helper */const $function= { sequention: function(...functions){return function(input){let current= input; for(let i=0, i_length= functions.length; i<i_length; i++){ current= functions[i](current); } return current; }; } };

    /* get week number */
    $function.sequention( $time.fromString, $time.toString("W") )("2019-07-01");
    //= 27
    $function.sequention( $time.fromString, $time.toString("Wo") )("2019-07-01");
    //= 27th
    /* date/time formats */
    const niceFormat= $function.sequention( $time.fromString, $time.toString("dddd[, ]Do MMMM YYYY") );
    niceFormat("2019-07-01");
    //= "Monday, 1st July 2019"
    niceFormat("2000-01-01");
    //= "Saturday, 1st January 2000"
    /* relative times */
    const toRelativeFromStrings= $function.sequention( $time.fromString, $time.toRelative($time.fromString("2019-07-10 12:35:15")) );
    toRelativeFromStrings("2019-07-10 12:35:14");
    //= "a few seconds ago"
    toRelativeFromStrings("2019-07-10 12:34:30");
    //= "45 seconds ago"
    toRelativeFromStrings("2018-07-01 09:32:15");
    //= "a year ago"
```
