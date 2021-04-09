export async function getUploadedFiles() {
  console.log('Retrieving list of uploaded files using HTTP GET /list-files');
  try {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = {
      method: 'GET',
      headers
    };
    const res = await fetch('/list-files', options);
    console.log(`response status text: ${ res.statusText } (${ res.status })`);
    if (res.ok) {
      if (res.headers.get('Content-Type').indexOf('application/json') !== -1) {
        const files = await res.json();
        console.log(`name = ${ files }`);
        return files;
      }
    } else {
      console.error('Request did not complete successfully');
    }
  } catch (e) {
    console.error('Network error!');
  }
}