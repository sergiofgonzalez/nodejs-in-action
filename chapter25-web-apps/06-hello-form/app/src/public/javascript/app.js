/* client-side JavaScript here */
console.log(`Everything's perfectly all right now. We're fine. We're all fine here now, thank you. How are you?`);

const form = document.querySelector('form');

// You can use `form.elements` as an array to its elements
console.log(`form.elements[1].type: ${ form.elements[1].type }`);

// you can also use `form.elements` as a map, with key the element's name:
console.log(`form.elements.password.type: ${ form.elements.password.type }`);

// the elements have a `form` property to refer back to the form
console.log(`form.elements.password.form === form: ${ form.elements.password.form === form }`);

form.addEventListener('submit', event => {
  console.log(`Processing form: name=${ form.elements.name.value }; password=${ form.elements.password.value }`);
  event.preventDefault();
});