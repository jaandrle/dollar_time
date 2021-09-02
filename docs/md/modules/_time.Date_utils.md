[$time](../README.md) / [%24time](_time.md) / Date_utils

# Namespace: Date\_utils

[$time](_time.md).Date_utils

Helpers for working with {@link Date}.

## Table of contents

### Functions

- [addDays](_time.Date_utils.md#adddays)
- [addMonths](_time.Date_utils.md#addmonths)
- [getWeekDay](_time.Date_utils.md#getweekday)
- [getWeekNumber](_time.Date_utils.md#getweeknumber)

## Functions

### addDays

▸ **addDays**(`days`): (`d`: `Date`) => `Date`

#### Parameters

| Name | Type |
| :------ | :------ |
| `days` | `number` |

#### Returns

`fn`

▸ (`d`): `Date`

##### Parameters

| Name | Type |
| :------ | :------ |
| `d` | `Date` |

##### Returns

`Date`

___

### addMonths

▸ **addMonths**(`months`): (`d`: `Date`) => `Date`

#### Parameters

| Name | Type |
| :------ | :------ |
| `months` | `number` |

#### Returns

`fn`

▸ (`d`): `Date`

##### Parameters

| Name | Type |
| :------ | :------ |
| `d` | `Date` |

##### Returns

`Date`

___

### getWeekDay

▸ **getWeekDay**(`type`, `options`): (`d`: `Date`) => `number`

If `type="numeric"`, it returns **0 (Su) - 6 (Sa)**, else it returns **name of week day**

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `options` | [`toLocaleStringOptions`](../interfaces/_time.toLocaleStringOptions.md) |

#### Returns

`fn`

▸ (`d`): `number`

If `type="numeric"`, it returns **0 (Su) - 6 (Sa)**, else it returns **name of week day**

##### Parameters

| Name | Type |
| :------ | :------ |
| `d` | `Date` |

##### Returns

`number`

___

### getWeekNumber

▸ **getWeekNumber**(`date`): `number`

This return ISO number of week.

#### Parameters

| Name | Type |
| :------ | :------ |
| `date` | `Date` |

#### Returns

`number`
