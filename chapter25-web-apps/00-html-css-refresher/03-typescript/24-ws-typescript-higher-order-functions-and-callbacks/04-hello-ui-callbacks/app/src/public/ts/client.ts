const btnElement = document.querySelector<HTMLButtonElement>(`#my-btn`);
const infoTextarea = document.querySelector<HTMLTextAreaElement>('#infoArea');

if (!infoTextarea) {
  console.log(`ERROR: could not locate '#infoArea' in the HTML document`);
  throw new Error('Unexpected HTML structure');
}

btnElement?.addEventListener(`click`, (evt: MouseEvent) => {
  if (infoTextarea) {
    infoTextarea.textContent += `${ new Date().toISOString() }: ${ JSON.stringify(evt) }\n`;
  }
});