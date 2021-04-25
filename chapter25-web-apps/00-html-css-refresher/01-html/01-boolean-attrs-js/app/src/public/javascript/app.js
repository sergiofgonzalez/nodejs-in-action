/* client-side JavaScript here */

console.log(`Everything's perfectly all right now. We're fine. We're all fine here now, thank you. How are you?`);

const input1 = document.querySelector('#input1');
const input2 = document.querySelector('#input2');
const flipBtn = document.querySelector('#flipBtn');


flipBtn.addEventListener('click', () => {
  /* using boolean values */
  input1.disabled = !input1.disabled;
  input2.disabled = !input2.disabled;
});