'use strict';

/*
  toLocaleDateString: returns a string with a language sensitive representation of this date

  The method accepts a `locale` and an optional `options` parameter where you can pass flags
  to control the output behavior.
  options:
    + `weekday` - 'narrow', 'short', 'long'
    + `year` - 'numeric', '2-digit'
    + `month` - 'numeric', '2-digit', 'narrow', 'short', 'long'
    + `day` - 'numeric', '2-digit'
*/

/* 1: using only locale */
let date = new Date();
console.log(`today(en-US): ${ date.toLocaleDateString('en-US') }`);
console.log(`today(es-ES): ${ date.toLocaleDateString('es-ES') }`);
console.log(`today(zh-CN): ${ date.toLocaleDateString('zh-CN') }`);
console.log('-----------------\n');

/* 2: using locale and options to obtain custom string representation of the string: whole date string */
let dateOptions = {
  weekday: 'long',  /* Monday, Tuesday, ...     */
  year: 'numeric',  /* 2020, 2021, ...          */
  month: 'long',    /* January, February, ...   */
  day: 'numeric'    /* 1, 2, ..                 */
};

console.log(`today(en-US): ${ date.toLocaleDateString('en-US', dateOptions) }`);
console.log(`today(es-ES): ${ date.toLocaleDateString('es-ES', dateOptions) }`);
console.log(`today(zh-CN): ${ date.toLocaleDateString('zh-CN', dateOptions) }`);
console.log('-----------------\n');

/* 3: using locale and options to obtain custom string representation of the string: partial date */
dateOptions = {
  month: 'short',   /* Jan, Feb, ...  */
  day: 'numeric'    /* 1, 2, 3, ...   */
};
console.log(`today(en-US): ${ date.toLocaleDateString('en-US', dateOptions) }`);
console.log(`today(es-ES): ${ date.toLocaleDateString('es-ES', dateOptions) }`);
console.log(`today(zh-CN): ${ date.toLocaleDateString('zh-CN', dateOptions) }`);
console.log('-----------------\n');

dateOptions = {
  month: 'short',
  day: '2-digit' /* 01, 02, ... */
};
console.log(`today(en-US): ${ date.toLocaleDateString('en-US', dateOptions) }`);
console.log(`today(es-ES): ${ date.toLocaleDateString('es-ES', dateOptions) }`);
console.log(`today(zh-CN): ${ date.toLocaleDateString('zh-CN', dateOptions) }`);
console.log('-----------------\n');


dateOptions = {
  month: 'narrow' /* J, F, M, A ... */
};
console.log(`today(en-US): ${ date.toLocaleDateString('en-US', dateOptions) }`);
console.log(`today(es-ES): ${ date.toLocaleDateString('es-ES', dateOptions) }`);
console.log(`today(zh-CN): ${ date.toLocaleDateString('zh-CN', dateOptions) }`);
console.log('-----------------\n');

/* 4: using custom date instead of `new Date()` */
date = new Date(Date.UTC(2008, 4, 17, 21, 15, 47));
dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric'
};
console.log(`today(en-US): ${ date.toLocaleDateString('en-US', dateOptions) }`);
console.log(`today(es-ES): ${ date.toLocaleDateString('es-ES', dateOptions) }`);
console.log(`today(zh-CN): ${ date.toLocaleDateString('zh-CN', dateOptions) }`);
console.log('-----------------\n');

/*
  toLocaleTimeString: returns a string with a language sensitive representation of this time, with
  timezone support

  The method accepts a `locale` and an optional `options` parameter where you can pass flags
  to control the output behavior.
  options:
    + `timeZone` - the time zone, e.g. 'UTC',
    + `timeZoneName' - 'short', 'long'
    + 'hour12' - true, false
    + `hour` - 'numeric', '2-digit'
    + `minute` - 'numeric', '2-digit'
    + `second` - 'numeric', '2-digit'
*/

/* 1: display current time with options */
date = new Date();
let timeOptions = {
  hour12: true,       /* use a.m./p.m. format */
  hour: 'numeric',    /* 0, 1, 2, 3,...       */
  minute: '2-digit',  /* 00, 01, 02, 03,...   */
  second: '2-digit'   /* 00, 01, 02, 03,...   */
};
console.log(`today(en-US): ${ date.toLocaleTimeString('en-US', timeOptions) }`);
console.log(`today(es-ES): ${ date.toLocaleTimeString('es-ES', timeOptions) }`);
console.log(`today(zh-CN): ${ date.toLocaleTimeString('zh-CN', timeOptions) }`);
console.log('-----------------\n');

/* 2: display current time with timezone name */
date = new Date();
timeOptions = {
  timeZoneName: 'short',  /* show timeZoneName short  */
  hour12: false,          /* use 24-hour format       */
  hour: 'numeric',        /* 0, 1, 2, 3,...           */
  minute: '2-digit',      /* 00, 01, 02, 03,...       */
  second: '2-digit'       /* 00, 01, 02, 03,...       */
};
console.log(`today(en-US): ${ date.toLocaleTimeString('en-US', timeOptions) }`);
console.log(`today(es-ES): ${ date.toLocaleTimeString('es-ES', timeOptions) }`);
console.log(`today(zh-CN): ${ date.toLocaleTimeString('zh-CN', timeOptions) }`);
console.log('-----------------\n');

/* 3: display current time with timezone name */
date = new Date();
timeOptions = {
  timeZoneName: 'long',  /* show timeZoneName long  */
  hour12: false,          /* use 24-hour format       */
  hour: 'numeric',        /* 0, 1, 2, 3,...           */
  minute: '2-digit',      /* 00, 01, 02, 03,...       */
  second: '2-digit'       /* 00, 01, 02, 03,...       */
};
console.log(`today(en-US): ${ date.toLocaleTimeString('en-US', timeOptions) }`);
console.log(`today(es-ES): ${ date.toLocaleTimeString('es-ES', timeOptions) }`);
console.log(`today(zh-CN): ${ date.toLocaleTimeString('zh-CN', timeOptions) }`);
console.log('-----------------\n');


/* 4: display current time on specified timezone */
date = new Date();
timeOptions = {
  timeZone: 'Asia/Kuala_Lumpur',  /* use MY time              */
  timeZoneName: 'short',          /* show timeZoneName long   */
  hour12: false,                  /* use 24-hour format       */
  hour: 'numeric',                /* 0, 1, 2, 3,...           */
  minute: '2-digit',              /* 00, 01, 02, 03,...       */
  second: '2-digit'               /* 00, 01, 02, 03,...       */
};
console.log(`today(en-US): ${ date.toLocaleTimeString('en-US', timeOptions) }`);
console.log(`today(es-ES): ${ date.toLocaleTimeString('es-ES', timeOptions) }`);
console.log(`today(zh-CN): ${ date.toLocaleTimeString('zh-CN', timeOptions) }`);
console.log('-----------------\n');

/*
  toLocaleString: returns a string with a language sensitive representation of this date/time, with
  timezone support.
  Note that the first parameter (locale) is used to guide the language whose formatting options should be used.

  The method accepts a `locale` and an optional `options` parameter where you can pass flags
  to control the output behavior of both date and time.
  options:
    + `weekday` - 'narrow', 'short', 'long'
    + `year` - 'numeric', '2-digit'
    + `month` - 'numeric', '2-digit', 'narrow', 'short', 'long'
    + `day` - 'numeric', '2-digit'
    + `timeZone` - the time zone, e.g. 'UTC',
    + `timeZoneName' - 'short', 'long'
    + 'hour12' - true, false
    + `hour` - 'numeric', '2-digit'
    + `minute` - 'numeric', '2-digit'
    + `second` - 'numeric', '2-digit'
*/

/* 1: show current date time */
date = new Date();
let dateTimeOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'Asia/Kuala_Lumpur',
  timeZoneName: 'short',
  hour12: false,
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit'
};
console.log(`today(en-US): ${ date.toLocaleString('en-US', dateTimeOptions) }`);
console.log(`today(es-ES): ${ date.toLocaleString('es-ES', dateTimeOptions) }`);
console.log(`today(zh-CN): ${ date.toLocaleString('zh-CN', dateTimeOptions) }`);
console.log('-----------------\n');

/* 2: using custom date instead of `new Date()` */
date = new Date(Date.UTC(2008, 4, 17, 23, 35, 47, 123));
console.log(`today(en-US): ${ date.toLocaleString('en-US', dateTimeOptions) }`);
console.log(`today(es-ES): ${ date.toLocaleString('es-ES', dateTimeOptions) }`);
console.log(`today(zh-CN): ${ date.toLocaleString('zh-CN', dateTimeOptions) }`);
console.log('-----------------\n');

/* 3: segregating date and time options */
dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

timeOptions = {
  timeZone: 'Asia/Kuala_Lumpur',
  timeZoneName: 'short',
  hour12: false,
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit'
};

console.log(`today(en-US): ${ date.toLocaleString('en-US', { ...dateOptions, ...timeOptions }) }`);
console.log(`today(es-ES): ${ date.toLocaleString('es-ES', { ...dateOptions, ...timeOptions }) }`);
console.log(`today(zh-CN): ${ date.toLocaleString('zh-CN', { ...dateOptions, ...timeOptions }) }`);
console.log('-----------------\n');
