/* Note that you may want to use Browserify if you plan to use TS modules */

console.log(`Everything's perfectly all right now. We're fine. We're all fine here now, thank you. How are you?`);

const indeterminateCheckbox: HTMLInputElement = getValidatedHtmlElement('#indeterminateCheckbox');

indeterminateCheckbox.indeterminate = true;

function getValidatedHtmlElement<T extends Element>(htmlSelector: string): T {
  const elem = document.querySelector(htmlSelector);
  if (!elem) {
    console.log(`ERROR: ${ htmlSelector } was not found in the HTML`);
    throw new Error(`Missing element ${ htmlSelector } in HTML`);
  }
  return elem as T;
}