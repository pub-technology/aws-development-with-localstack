import * as s3 from '@aws-cdk/aws-s3';
import { Stack } from '@aws-cdk/core';

export const generateScreenShotBucket = (root: Stack): s3.Bucket => {
    return new s3.Bucket(root, 'screen-shot', {
        bucketName: 'screenshot',
        // https://docs.aws.amazon.com/AmazonS3/latest/userguide/serv-side-encryption.html
        encryption: s3.BucketEncryption.S3_MANAGED,
        versioned: false,
    });
}
