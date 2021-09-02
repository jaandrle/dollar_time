gulp_place("$time_init.sub.js", "file_once");/* global ary_ianna_time_zones, internal_zone: true, internal_locale: true, format_arrays */

gulp_place("from_functions/*.sub.js", "glob_once");
gulp_place("to_functions/*.sub.js", "glob_once");
gulp_place("timezones/*.sub.js", "glob_once");
gulp_place("modify/*.sub.js", "glob_once");/* global getWeekDay, addDays, addMonths, getWeekNumber */
export const Date_utils= { getWeekDay, getWeekNumber, addDays, addMonths };

gulp_place("utility/*.sub.js", "glob_once");/* global double, getOrdinalSuffix, getMonthName, getDaysInMonth, daysInMonth */

export const _= void(0);
export const formats= format_arrays;

export const getTimeZones= ()=> ary_ianna_time_zones;
export const isTimeZone= candidate=> ary_ianna_time_zones.indexOf(candidate)!==-1;
export const setInternalZone= zone=> internal_zone= zone;
export const setInternalLocale= locale=> internal_locale= locale;