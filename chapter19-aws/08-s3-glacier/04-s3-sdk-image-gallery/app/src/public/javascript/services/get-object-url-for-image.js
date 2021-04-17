export async function getObjectUrlForImage(filename) {

  const response = await fetch(`/download/${ filename }`);
  const responseBlob = await response.blob();
  const objectUrl = URL.createObjectURL(responseBlob);

  return objectUrl;
}
