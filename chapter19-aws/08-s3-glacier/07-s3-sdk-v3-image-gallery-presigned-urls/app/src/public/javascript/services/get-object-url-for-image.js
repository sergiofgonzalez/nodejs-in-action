export async function getObjectUrlForImage(filename) {

  const res = await fetch(`/download/${ filename }`);
  if (!res.ok) {
    console.error(`fetch for /download/${ filename } failed with ${ res.statusText } (${ res.status })`);
    throw new Error('Network error for /download/:filename image URL');
  }
  const { presignedUrl } = await res.json();
  console.log(`Obtained presigned URL for image file ${ filename }: `, presignedUrl);

  const downloadResponse = await fetch(presignedUrl);
  if (!downloadResponse.ok) {
    console.error(`fetch for presigned image URL failed with ${ downloadResponse.statusText } (${ downloadResponse.status })`);
    throw new Error('Network error fetching presigned image URL');
  }
  const imageBlob = await downloadResponse.blob();
  const objectUrl = URL.createObjectURL(imageBlob);

  return objectUrl;
}
