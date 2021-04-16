/* client-side JavaScript here */
import { getActionFromClickedElement } from './lib/get-action-from-clicked-element.js';

console.log(`Everything's perfectly all right now. We're fine. We're all fine here now, thank you. How are you`);

const table = document.querySelector('table');
const msgBox = document.querySelector('#msgBox');

table.addEventListener('click', (evt) => {
  const itemClicked = evt.target;
  if (itemClicked.nodeType === Node.ELEMENT_NODE) {
    const { action, filename } = getActionFromClickedElement(itemClicked);
    if (action) {
      console.log(`Click detected on an action icon: action=${ action }, file=${ filename }`);
      msgBox.textContent = `Processing ${ action } for ${ filename }`;
      evt.preventDefault();
      evt.stopPropagation();
    } else {
      console.log(`Click detected in the table was not relevant for actions`);
    }
  } else {
    console.log(`Click detected in the table was not relevant for actions`);
  }
});
