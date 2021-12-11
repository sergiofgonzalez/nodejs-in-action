/* client-side JavaScript here */

console.log(`Everything's perfectly all right now. We're fine. We're all fine here now, thank you. How are you?`);

const btn = document.querySelector('input[name="btnSubmit"]');

btn.addEventListener('click', (evt) => {
  evt.preventDefault();
});
