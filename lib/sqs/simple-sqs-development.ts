import * as sqs from '@aws-cdk/aws-sqs';
import {RemovalPolicy, Stack} from "@aws-cdk/core";

export const generateSimpleSQS = (root: Stack) => {
// 👇 create queue
    return new sqs.Queue(root, 'simple-sqs', {
        queueName: 'simple-sqs-development',
        encryption: sqs.QueueEncryption.UNENCRYPTED,
        fifo: false,
        removalPolicy: RemovalPolicy.DESTROY
    });
}
