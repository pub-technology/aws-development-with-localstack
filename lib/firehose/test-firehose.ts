import * as s3 from '@aws-cdk/aws-s3';
import {Duration, RemovalPolicy, Size, Stack} from "@aws-cdk/core";
import {CfnDeliveryStream} from "@aws-cdk/aws-kinesisfirehose";
import {Role} from '@aws-cdk/aws-iam';

export const generateTestFirehose = (root: Stack, firehoseRole: Role): CfnDeliveryStream => {
    // S3 bucket that will serve as the destination for our raw compressed data
    const auditLogBucket = new s3.Bucket(root, "test-firehose-s3-bucket", {
        removalPolicy: RemovalPolicy.DESTROY, // REMOVE FOR PRODUCTION
        autoDeleteObjects: true, // REMOVE FOR PRODUCTION,
        bucketName: 'test-firehose-s3',
        publicReadAccess: true,
    });

    return new CfnDeliveryStream(root, "FirehoseStreamToS", {
        deliveryStreamName: "test-firehose-delivery-stream",
        deliveryStreamType: "DirectPut",
        s3DestinationConfiguration: {
            bucketArn: auditLogBucket.bucketArn,
            bufferingHints: {
                sizeInMBs: Size.mebibytes(1).toMebibytes(),
                intervalInSeconds: Duration.seconds(60).toSeconds()
            },
            compressionFormat: 'UNCOMPRESSED',
            encryptionConfiguration: {
                noEncryptionConfig: "NoEncryption"
            },
            prefix: "user-logs",
            errorOutputPrefix: 'user-error-logs',
            roleArn: firehoseRole.roleArn
        },
    });
}
