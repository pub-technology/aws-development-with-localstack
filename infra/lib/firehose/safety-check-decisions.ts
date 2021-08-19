import * as s3 from '@aws-cdk/aws-s3';
import { RemovalPolicy, Stack, Size, Duration } from "@aws-cdk/core";
import { CfnDeliveryStream } from "@aws-cdk/aws-kinesisfirehose";
import * as iam from '@aws-cdk/aws-iam';


export const generateSafetyCheckFirehose = (root: Stack) => {
  // S3 bucket that will serve as the destination for our raw compressed data
  const auditLogBucket = new s3.Bucket(root, "safety-check-decisions-bucket", {
    removalPolicy:RemovalPolicy.DESTROY,
    autoDeleteObjects: true,
    bucketName: 'safety-check-decisions-bucket',
    publicReadAccess: true,
  });

  const firehoseRole = new iam.Role(root, 'safety-check-decisions-role', {
    assumedBy: new iam.ServicePrincipal('firehose.amazonaws.com')
  });

  return new CfnDeliveryStream(root, "safety-check-decisions", {
    deliveryStreamName: "safety-check-decisions",
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
      prefix: "logs",
      errorOutputPrefix: 'error-logs',
      roleArn: firehoseRole.roleArn
    },
  });
}
