#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkBastionInfraStack } from '../lib/cdk-bastion-infra-stack';
import { getMyPublicIpAddress } from './get-my-public-ip-address';


async function run() {

  const myPublicIp = await getMyPublicIpAddress();

  const app = new cdk.App({
    context: {
      adminPublicIpAddress: `${ myPublicIp }/32`
    }
  });

  new CdkBastionInfraStack(app, 'CdkBastionInfraStack', {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION
    }
  });
}

run()
  .then(() => console.log('CdkBastionInfraStack completed!'))
  .catch((err) => console.error(`ERROR: CdkBastionInfraStack failed:`, (err as Error).message));
