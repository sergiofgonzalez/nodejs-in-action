'use strict';

const jmespath = require('jmespath');
const AWS = require('aws-sdk');
const ec2 = new AWS.EC2({ region: 'us-east-1' });


const amiNamePattern = 'amzn-ami-hvm-2017.09.1.*-x86_64-gp2';

(async () => {
  console.log(`Getting ImageIds for AMI names matching: '${ amiNamePattern }'`);
  try {
    const matchingAMIs = await getAMIsMatching(amiNamePattern);
    console.log(matchingAMIs);
  } catch (err) {
    console.log(`Error: ${ err.message }`);
  }

})();



async function getAMIsMatching(namePattern) {
  return new Promise((resolve, reject) => {
    ec2.describeImages({
      Filters: [{ Name: 'name', Values: [namePattern] }]
    }, (err, data) => {
      if (err) {
        return reject(new Error(err));    
      }
      const amiIds = jmespath.search(data, 'Images[*].ImageId');
      const descriptions = jmespath.search(data, 'Images[*].Description');
      const amis = new Map();
      for (let i = 0; i < amiIds.length; i++) {
        amis.set(amiIds[i], descriptions[i]);
      }
      return resolve(amis);
    });
  });
}



