'use strict';

// Create a date using UTC
const date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0, 123)); // 2012-11-20 03:00:00.123

// Format the date 
console.log(new Intl.DateTimeFormat('en-US').format(date));
console.log(new Intl.DateTimeFormat('en-GB').format(date));
console.log(new Intl.DateTimeFormat(['ban', 'es']).format(date));

const options1 = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
console.log(new Intl.DateTimeFormat('es-ES', options1).format(date));

const options2 = { weekday: 'long' };
console.log(new Intl.DateTimeFormat('es-ES', options2).format(date));

const options3 = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
console.log(new Intl.DateTimeFormat('es-ES', options3).format(date));

const options4 = { 
  weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric',
  hour12: false,
  timeZone: 'Europe/Madrid', timeZoneName: 'short'
};
console.log(new Intl.DateTimeFormat('es-ES', options4).format(date));

const options5 = { 
  weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric',
  hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric',
  timeZone: 'Europe/Madrid', timeZoneName: 'long'
};
console.log(new Intl.DateTimeFormat('es-ES', options5).format(date));

const options6 = { 
  weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric',
  hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric',
  timeZone: 'Europe/Madrid', timeZoneName: 'long'
};
console.log(new Intl.DateTimeFormat('es-ES', options6).format(date));

/* as of Node.js 14.0.0, fractionalSecondDigits is not working */
const options7 = { 
  hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric', fractionalSecondDigits: 3,
  timeZone: 'Europe/Madrid', timeZoneName: 'short'
};
console.log(new Intl.DateTimeFormat('es-ES', options7).format(date)); // should be 4:00:00.123


/* as of Node.js 14.0.0, dayPeriod is not working */
const options8 = { 
  hour: 'numeric', dayPeriod: 'short'
};
console.log(new Intl.DateTimeFormat('es-ES', options8).format(date)); // should 4 de la mañana
