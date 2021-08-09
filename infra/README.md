# Welcome to your CDK TypeScript project!

You should explore the contents of this project. It demonstrates a CDK app with an instance of a stack (`SampleAppStack`)
which contains an Amazon SQS queue that is subscribed to an Amazon SNS topic.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

#init create a fake aws credentials - use for our localstack
```shell
cat ~/.aws/credentials

[localstack]
aws_access_key_id = test
aws_secret_access_key = test
region = us-west-2     
output = json
```

cd to localstack folder and run the command `docker-compose up -d`

#### Open browser check our service `http://localhost:4566/health`
```json
{
  "services": {
    "dynamodbstreams": "running", 
    "firehose": "running", 
    "kinesis": "running", 
    "s3": "running", 
    "ses": "running", 
    "sns": "running", 
    "sqs": "running", 
    "dynamodb": "running"
  }, "features": {"persistence": "initialized", "initScripts": "initialized"}
}
```

#### We will try to run deploy with our profile
`cdklocal deploy --profile localstack`
```markdown
IAM Statement Changes
┌───┬───────────────────────┬────────┬─────────────────┬───────────────────────────┬───────────────────────────────────────────────────────┐
│   │ Resource              │ Effect │ Action          │ Principal                 │ Condition                                             │
├───┼───────────────────────┼────────┼─────────────────┼───────────────────────────┼───────────────────────────────────────────────────────┤
│ + │ ${SampleAppQueue.Arn} │ Allow  │ sqs:SendMessage │ Service:sns.amazonaws.com │ "ArnEquals": {                                        │
│   │                       │        │                 │                           │   "aws:SourceArn": "${SampleAppTopic}"                │
│   │                       │        │                 │                           │ }                                                     │
└───┴───────────────────────┴────────┴─────────────────┴───────────────────────────┴───────────────────────────────────────────────────────┘
(NOTE: There may be security-related changes not in this list. See https://github.com/aws/aws-cdk/issues/1299)

Do you wish to deploy these changes (y/n)?

#### Type `y` and see our stack

ApplicationStack: deploying...
ApplicationStack: creating CloudFormation changeset...


✅  ApplicationStack

Stack ARN:
    arn:aws:cloudformation:us-east-1:000000000000:stack/ApplicationStack/e67d04e2
```

#### Recheck again with our sns created
aws --endpoint-url=http://localhost:4566 sns list-topics
```

Output
```json
{
    "Topics": [
        {
            "TopicArn": "arn:aws:sns:us-east-1:000000000000:topic-d7ce6939"
        }
    ]
}
```

### Destroy our stack
```shell
(base) haithai@FVFY201CHV2H infra % cdklocal destroy
Are you sure you want to delete: ApplicationStack (y/n)? y
ApplicationStack: destroying...

✅  ApplicationStack: destroyed

aws --endpoint-url=http://localhost:4566 sns list-topics

{
    "Topics": []
}

```

### How to verify our Dynamo DB Table setup
```shell

aws --endpoint-url=http://localhost:4566 dynamodb list-tables

{
    "TableNames": [
        "test-development"
    ]
}

aws --endpoint-url=http://localhost:4566 dynamodb describe-table --table-name test-development > test-development.json
```


### How to verify our S3 Bucket setup
#### Test make sure can upload a file to your S3.

```shell
aws --endpoint-url=http://localhost:4566 s3 cp temp/text-test.txt s3://screen-shot
```
> upload: temp/text-test.txt to s3://screen-shot/text-test.txt  

#### You can verify using the below command S3 bucket contains files
```shell
aws --endpoint-url=http://localhost:4566 s3 ls s3://screen-shot
```
> 2021-08-07 23:47:17          5 text-test.txt

### How to verify our Firehose  setup
aws --endpoint-url=http://localhost:4566 firehose list-delivery-streams

(base) haithai@FVFY201CHV2H iam % aws --endpoint-url=http://localhost:4566 iam create-role --role-name super-role --assume-role-policy-document file://$PWD/super-role.json
{
"Role": {
"Path": "/",
"RoleName": "super-role",
"RoleId": "yjgfjgufwd7yi66ypql8",
"Arn": "arn:aws:iam::000000000000:role/super-role",
"CreateDate": "2021-08-08T16:41:15.560000+00:00",
"AssumeRolePolicyDocument": {
"Version": "2012-10-17",
"Statement": [
{
"Sid": "Stmt1572416334166",
"Action": "*",
"Effect": "Allow",
"Resource": "*"
}
]
},
"MaxSessionDuration": 3600
}
}



```markdown
IAM Statement Changes
┌───┬────────────────────────────────────────────────────────────────┬────────┬───────────────────────────────────────┬───────────────────────────────────────────────────────────────────┬───────────┐
│   │ Resource                                                       │ Effect │ Action                                │ Principal                                                         │ Condition │
├───┼────────────────────────────────────────────────────────────────┼────────┼───────────────────────────────────────┼───────────────────────────────────────────────────────────────────┼───────────┤
│ + │ ${Custom::S3AutoDeleteObjectsCustomResourceProvider/Role.Arn}  │ Allow  │ sts:AssumeRole                        │ Service:lambda.amazonaws.com                                      │           │
├───┼────────────────────────────────────────────────────────────────┼────────┼───────────────────────────────────────┼───────────────────────────────────────────────────────────────────┼───────────┤
│ + │ ${firehoseRole.Arn}                                            │ Allow  │ sts:AssumeRole                        │ Service:firehose.amazonaws.com                                    │           │
├───┼────────────────────────────────────────────────────────────────┼────────┼───────────────────────────────────────┼───────────────────────────────────────────────────────────────────┼───────────┤
│ + │ ${test-firehose-s3-bucket.Arn}                                 │ Allow  │ s3:DeleteObject*                      │ AWS:${Custom::S3AutoDeleteObjectsCustomResourceProvider/Role.Arn} │           │
│   │ ${test-firehose-s3-bucket.Arn}/*                               │        │ s3:GetBucket*                         │                                                                   │           │
│   │                                                                │        │ s3:List*                              │                                                                   │           │
├───┼────────────────────────────────────────────────────────────────┼────────┼───────────────────────────────────────┼───────────────────────────────────────────────────────────────────┼───────────┤
│ + │ ${test-firehose-s3-bucket.Arn}/*                               │ Allow  │ s3:GetObject                          │ AWS:*                                                             │           │
└───┴────────────────────────────────────────────────────────────────┴────────┴───────────────────────────────────────┴───────────────────────────────────────────────────────────────────┴───────────┘
IAM Policy Changes
┌───┬───────────────────────────────────────────────────────────┬──────────────────────────────────────────────────────────────────────────────────────────────┐
│   │ Resource                                                  │ Managed Policy ARN                                                                           │
├───┼───────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────┤
│ + │ ${Custom::S3AutoDeleteObjectsCustomResourceProvider/Role} │ {"Fn::Sub":"arn:${AWS::Partition}:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"} │
└───┴───────────────────────────────────────────────────────────┴──────────────────────────────────────────────────────────────────────────────────────────────┘
(NOTE: There may be security-related changes not in this list. See https://github.com/aws/aws-cdk/issues/1299)

```

aws --endpoint-url=http://localhost:4566 s3api get-bucket-policy --bucket test-firehose-s3


aws --endpoint-url=http://localhost:4566 firehose list-delivery-streams

aws --endpoint-url=http://localhost:4566 firehose describe-delivery-stream --delivery-stream-name test-firehose-delivery-stream3
