[$time](../README.md) / [%24time](../modules/_time.md) / toLocaleStringOptions

# Interface: toLocaleStringOptions

[$time](../modules/_time.md).toLocaleStringOptions

It is in fact argument for `options` in [`Date.prototype.toLocaleString` Parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString#Parameters).

## Table of contents

### Properties

- [declension](_time.toLocaleStringOptions.md#declension)
- [locale](_time.toLocaleStringOptions.md#locale)
- [timeZone](_time.toLocaleStringOptions.md#timezone)

## Properties

### declension

• `Optional` **declension**: `boolean`

Needed for some languages — for example in Czech: "10. července" (`declension=true`), or "10. červenec" (`declension=false`)

**Defaults to `true`**

___

### locale

• `Optional` **locale**: `string`

ISO language identificator such as **"en-GB"** (default value)

___

### timeZone

• `Optional` **timeZone**: [`ary_ianna_time_zones`](../modules/_time.md#ary_ianna_time_zones)
