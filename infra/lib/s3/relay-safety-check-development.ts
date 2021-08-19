import * as s3 from '@aws-cdk/aws-s3';

export const generateRelaySafetyCheckBucket = (root: any) => {
    return new s3.Bucket(root, 'relay-safety-check-bucket', {
        bucketName: 'relay-safety-check-development',
        // https://docs.aws.amazon.com/AmazonS3/latest/userguide/serv-side-encryption.html
        encryption: s3.BucketEncryption.S3_MANAGED,
        versioned: false,
    });
}
