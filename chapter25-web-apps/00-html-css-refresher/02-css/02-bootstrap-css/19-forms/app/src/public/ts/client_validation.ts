/* Note that you may want to use Browserify if you plan to use TS modules */

console.log(`Everything's perfectly all right now. We're fine. We're all fine here now, thank you. How are you?`);


const forms: HTMLFormElement[] = getValidatedHtmlElements('.needs-validation');

for (const form of forms) {
  form.addEventListener('submit', (event) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
  }, false);
}



function getValidatedHtmlElements<T extends Element>(htmlSelector: string): T[] {
  const elems = document.querySelectorAll(htmlSelector);
  if (!elems) {
    console.log(`ERROR: ${ htmlSelector } was not found in the HTML`);
    throw new Error(`Missing element ${ htmlSelector } in HTML`);
  }
  return [...elems] as T[];
}