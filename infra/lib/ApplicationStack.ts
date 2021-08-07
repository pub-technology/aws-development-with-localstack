import * as cdk from "@aws-cdk/core";
import { initDynamoDB } from "./dynamodb";
import { initS3Buckets } from "./s3";


export class ApplicationStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Dynamo DB initialize
    initDynamoDB(this);

    // S3 Initialize
    initS3Buckets(this);
  }
}
