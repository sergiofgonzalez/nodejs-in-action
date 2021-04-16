/* client-side JavaScript here */
console.log(`Everything's perfectly all right now. We're fine. We're all fine here now, thank you. How are you`);

const showImgBtn = document.querySelector('button');
const imgPlaceHolder = document.querySelector('img');


showImgBtn.addEventListener('click', async () => {
  const response = await fetch('/download/images?filename=hi.png');
  const responseBlob = await response.blob();
  const objectUrl = URL.createObjectURL(responseBlob);
  imgPlaceHolder.src = objectUrl;
  imgPlaceHolder.onload = () => URL.revokeObjectURL(objectUrl);
});

