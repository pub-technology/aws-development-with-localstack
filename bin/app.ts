#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import {ApplicationStack} from '../lib/ApplicationStack';

const app = new cdk.App();
new ApplicationStack(app, 'ApplicationStack', {
    env: {
        region: 'us-west-2'
    },
});
