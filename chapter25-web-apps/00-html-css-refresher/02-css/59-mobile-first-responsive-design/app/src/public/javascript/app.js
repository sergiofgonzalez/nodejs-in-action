/* client-side JavaScript here */

console.log(`Everything's perfectly all right now. We're fine. We're all fine here now, thank you. How are you?`);

const currentYearSpan = document.querySelector('#current-year');

currentYearSpan.textContent = new Date().getFullYear();