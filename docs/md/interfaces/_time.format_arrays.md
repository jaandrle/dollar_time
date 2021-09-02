[$time](../README.md) / [%24time](../modules/_time.md) / format_arrays

# Interface: format\_arrays

[$time](../modules/_time.md).format_arrays

Exported as [formats](../modules/_time.md#formats).

Internal object holding predefined formating arguments for [getFormatObject](../modules/_time.md#getformatobject).
```javascript
format_arrays.YYYYMMDD=== [ ["year", "numeric"], [ "text", "-" ], ["month", "2-digit"], [ "text", "-" ], ["day", "2-digit"] ]
```

## Table of contents

### Properties

- [SQL](_time.format_arrays.md#sql)
- [SQL\_DATE](_time.format_arrays.md#sql_date)
- [SQL\_TIME](_time.format_arrays.md#sql_time)

## Properties

### SQL

• **SQL**: [`ArrayOfOperations`](../modules/_time.md#arrayofoperations)

Generate format of **"YYYY-MM-DD HH:mm:ss"**

___

### SQL\_DATE

• **SQL\_DATE**: [`ArrayOfOperations`](../modules/_time.md#arrayofoperations)

Generate format of **"YYYY-MM-DD"**

___

### SQL\_TIME

• **SQL\_TIME**: [`ArrayOfOperations`](../modules/_time.md#arrayofoperations)

Generate format of **"HH:mm:ss"**
