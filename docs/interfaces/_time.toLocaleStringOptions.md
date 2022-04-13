[$time](../README.md) / [%24time](../modules/_time.md) / toLocaleStringOptions

# Interface: toLocaleStringOptions

[$time](../modules/_time.md).toLocaleStringOptions

It is in fact argument for `options` in [`Date.prototype.toLocaleString` Parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString#Parameters).

## Table of contents

### Properties

- [declension](_time.toLocaleStringOptions.md#declension)
- [locales](_time.toLocaleStringOptions.md#locales)
- [sunday\_shift](_time.toLocaleStringOptions.md#sunday_shift)
- [timeZone](_time.toLocaleStringOptions.md#timezone)

## Properties

### declension

• `Optional` **declension**: `boolean`

Needed for some languages — for example in Czech: "10. července" (`declension=true`), or "10. červenec" (`declension=false`)

**Defaults to `true`**

___

### locales

• `Optional` **locales**: `string`

ISO language identificator such as **"en-GB"** (default value)

___

### sunday\_shift

• `Optional` **sunday\_shift**: `number`

This provide handy way to change the default indexing for
- [toString](../modules/_time.md#tostring) with `"d"` part and/or,
- [Date_utils.getWeekDay](../modules/_time.Date_utils.md#getweekday) – see also {@link Date.getDay}

…primary for using in range [-1,infinity), for negative indices the final result is **increases by 7**

**Defaults to `0`**

*Examples:*
- `sunday_shift=-1` ⇒ `Mo=0,Tu=1,We=2,Th=3,Fr=4,Sa=5,Su=6`
- `sunday_shift=0` ⇒ `Mo=1,Tu=2,We=3,Th=4,Fr=5,Sa=6,Su=0`
- `sunday_shift=3` ⇒ `Mo=4,Tu=5,We=6,Th=7,Fr=8,Sa=9,Su=3`
- …also works: `sunday_shift=-8` ⇒ `Mo=0,Tu=1,We=2,Th=3,Fr=4,Sa=5,Su=-1``

___

### timeZone

• `Optional` **timeZone**: [`ary_ianna_time_zones`](../modules/_time.md#ary_ianna_time_zones)
