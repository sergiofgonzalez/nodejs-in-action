# 57 &mdash; Hello, `Intl.DateTimeFormat`
> practising `Intl.DateTimeFormat` and its options

## Description
The `IntlDateTimeFormat` object is a constructor for objects that enable language-sensitive date and time formatting.

For example:
```javascript
const options = { 
  weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric',
  hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric',
  timeZone: 'Europe/Madrid', timeZoneName: 'long'
};
console.log(new Intl.DateTimeFormat('es-ES', options).format(date)); // -> jueves, 20/12/2012 4:00:00 (hora estándar de Europa central)
```
