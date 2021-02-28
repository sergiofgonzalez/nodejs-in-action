import superagent from 'superagent';


export async function getMyPublicIpAddress() {
  try {
    const res = await superagent
      .get('https://api64.ipify.org')
      .query('format=json');

    return res?.body?.ip;
  } catch (err) {
    console.error(`ERROR: getMyPublicIpAddress: ${ err.message }`);
    throw new Error('Could not obtain my public IP address');
  }

}