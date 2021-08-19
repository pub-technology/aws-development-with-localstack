import * as sqs from '@aws-cdk/aws-sqs';
import { RemovalPolicy, Stack } from "@aws-cdk/core";

export const generateRelaySafetyCheckSQS = (root: Stack) => {
// 👇 create queue
    return new sqs.Queue(root, 'relay-safety-check-sqs', {
        queueName: 'relay-safety-check-development',
        encryption: sqs.QueueEncryption.UNENCRYPTED,
        fifo: false,
        removalPolicy: RemovalPolicy.DESTROY
    });
}
