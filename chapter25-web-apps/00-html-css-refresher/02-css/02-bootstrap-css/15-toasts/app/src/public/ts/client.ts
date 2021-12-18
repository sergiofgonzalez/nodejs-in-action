/* Note that you may want to use Browserify if you plan to use TS modules */

import { Toast } from 'bootstrap';

import { sayHello } from './lib/greeter';

console.log(`Everything's perfectly all right now. We're fine. We're all fine here now, thank you. How are you?`);

sayHello(`Jason`);

const toastBtn: HTMLButtonElement = getValidatedHtmlElement(`#liveToastBtn`);
const toast: HTMLElement = getValidatedHtmlElement(`#liveToast`);

toastBtn.addEventListener('click', () => {
  const bsToast = new Toast(toast);
  bsToast.show();
});


export function getValidatedHtmlElement<T extends Element>(htmlSelector: string): T {
  const elem = document.querySelector(htmlSelector);
  if (!elem) {
    console.log(`ERROR: ${ htmlSelector } was not found in the HTML`);
    throw new Error(`Missing element ${ htmlSelector } in HTML`);
  }
  return elem as T;
}