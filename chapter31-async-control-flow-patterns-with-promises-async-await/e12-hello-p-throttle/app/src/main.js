/* eslint-disable no-unused-vars */
import pThrottle from 'p-throttle';

function reportTime() {
  console.log(`second: ${ new Date().getSeconds() }`);
}

/* no throttling */
// for (let i = 0; i < 10; i++) {
//   reportTime();
// }

/* with throttling: allow only 2 calls per second */
// const throttled = pThrottle(() => reportTime(), 2, 1000);
// for (let i = 0; i < 10; i++) {
//   throttled();
// }


/* throttling with async functions works pretty much the same way */
const now = Date.now();

function reportDelta(iterIndex) {
  const secDelta = ((Date.now() - now) / 1000).toFixed();
  return Promise.resolve(`${ iterIndex }: ${ secDelta }`);
}
const throttledReportDelta = pThrottle(reportDelta, 3, 1000);


for (let i = 0; i < 10; i++) {
  throttledReportDelta(i).then(console.log);
}