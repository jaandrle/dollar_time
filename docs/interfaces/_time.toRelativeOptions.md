[$time](../README.md) / [%24time](../modules/_time.md) / toRelativeOptions

# Interface: toRelativeOptions

[$time](../modules/_time.md).toRelativeOptions

Corresponds to {@link Intl.RelativeTimeFormatOptions} (see [Intl.RelativeTimeFormat - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat)).

## Table of contents

### Properties

- [localeMatcher](_time.toRelativeOptions.md#localematcher)
- [locales](_time.toRelativeOptions.md#locales)
- [numeric](_time.toRelativeOptions.md#numeric)
- [style](_time.toRelativeOptions.md#style)

## Properties

### localeMatcher

• `Optional` **localeMatcher**: [`RelativeTimeFormatLocaleMatcher`](../modules/_time.md#relativetimeformatlocalematcher)

The locale matching algorithm to use. For information about this option, see [Intl page](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_negotiation).

___

### locales

• `Optional` **locales**: `string`

ISO language identificator such as **"en-GB"** (default value)

___

### numeric

• `Optional` **numeric**: [`RelativeTimeFormatNumeric`](../modules/_time.md#relativetimeformatnumeric)

The format of output message. Defaults to `auto`

___

### style

• `Optional` **style**: [`RelativeTimeFormatStyle`](../modules/_time.md#relativetimeformatstyle)

The length of the internationalized message. Defaults to `long`
