import * as superagent from 'superagent';

export async function getMyPublicIpAddress(): Promise<string> {
  try {
    const res = await superagent
    .get('https://api64.ipify.org')
    .query('format=json');

    const ipAddress = res.body.ip;
    console.log(`INFO: getMyPublicIpAddress: your ip address is ${ ipAddress }`);
    return ipAddress;
  } catch (err) {
    console.error(`ERROR: getMyPublicIpAddress: ${ (err as Error).message }`);
    throw err;
  }
}
