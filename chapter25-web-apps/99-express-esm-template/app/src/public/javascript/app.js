/* client-side JavaScript here */
console.log(`Everything's perfectly all right now. We're fine. We're all fine here now, thank you. How are you`);

const imageActionRadios = document.querySelectorAll('[name=imageActionsRadio]');
const msgBox = document.querySelector('#msgBox');
const imgPlaceHolder = document.querySelector('img');


for (const imageActionRadio of [...imageActionRadios]) {
  imageActionRadio.addEventListener('change', async () => {
    msgBox.innerHTML = `Processing <code>${ imageActionRadio.value }</code> action`;
    if (imageActionRadio.value == 'loadImage') {
      const response = await fetch('/download/images?filename=hi.png');
      const responseBlob = await response.blob();
      const objectUrl = URL.createObjectURL(responseBlob);
      imgPlaceHolder.src = objectUrl;
      imgPlaceHolder.onload = () => URL.revokeObjectURL(objectUrl);
    } else {
      imgPlaceHolder.src = '';
    }
  });
}
