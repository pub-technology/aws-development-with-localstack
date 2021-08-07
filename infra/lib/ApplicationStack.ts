import * as sns from "@aws-cdk/aws-sns";
import * as subs from "@aws-cdk/aws-sns-subscriptions";
import * as sqs from "@aws-cdk/aws-sqs";
import * as cdk from "@aws-cdk/core";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import { GlobalSecondaryIndexProps, StreamViewType } from "@aws-cdk/aws-dynamodb/lib/table";
import { createStandardGSI } from "../utils/createGlobalSecondaryIndex";


export class ApplicationStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, 'SampleAppQueue', {
      visibilityTimeout: cdk.Duration.seconds(300)
    });

    const topic = new sns.Topic(this, 'SampleAppTopic');
    topic.addSubscription(new subs.SqsSubscription(queue));

    const table = new dynamodb.Table(this, 'Table', {
      tableName: 'test-development',
      // partition key & sort key
      partitionKey: { name: 'pk', type: dynamodb.AttributeType.STRING },
      sortKey: {name : 'sk', type: dynamodb.AttributeType.STRING},
      // ProvisionedThroughput
      readCapacity: 5,
      writeCapacity: 5,
      // StreamSpecification
      stream: StreamViewType.NEW_AND_OLD_IMAGES,
    });

    const pk2Sk2Index: GlobalSecondaryIndexProps = createStandardGSI('pk2-sk2-index', 'pk2', 'sk2');
    const pk3Sk3Index: GlobalSecondaryIndexProps = createStandardGSI('pk3-sk3-index', 'pk3', 'sk3');
    const pk4Sk4Index: GlobalSecondaryIndexProps = createStandardGSI('pk4-sk4-index', 'pk4', 'sk4');

    table.addGlobalSecondaryIndex(pk2Sk2Index);
    table.addGlobalSecondaryIndex(pk3Sk3Index);
    table.addGlobalSecondaryIndex(pk4Sk4Index);
  }
}
