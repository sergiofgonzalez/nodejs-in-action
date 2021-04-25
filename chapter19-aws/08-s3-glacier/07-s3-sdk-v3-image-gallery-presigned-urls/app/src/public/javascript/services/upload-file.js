export async function uploadFile(file) {
  const url = `/upload`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ filename: file.name })
  });
  if (!res.ok) {
    console.error(`fetch for /upload URL failed with ${ res.statusText } (${ res.status })`);
    throw new Error('Network error for /upload URL');
  }
  const { presignedUrl } = await res.json();
  console.log(`Obtained presigned URL for ${ file.name }: `, presignedUrl);


  const uploadResponse = await fetch(presignedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
      'Content-Length': file.size
    },
    body: file
  });
  if (!uploadResponse.ok) {
    console.error(`fetch for /upload file failed with ${ res.statusText } (${ res.status })`);
    throw new Error('Network error for /upload file');
  }
  console.log(`Successfully uploaded: File: ${ file.name }, Size: ${ file.size }, Type: ${ file.type }`);
}
