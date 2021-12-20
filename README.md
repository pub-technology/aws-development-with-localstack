# AWS CDK & Localstack (Local Development)

![123](https://user-images.githubusercontent.com/18282144/146704241-769f8c06-8981-411b-a055-3e3649bbc86f.png)

## A few benefits of this approach are
- You can run the lambda function locally
- Don’t impact your team by sharing the same env ( update on the same buckets, same records )
- Debug & Speed up your working
- Don’t need to worry about paying for AWS usage for stupid action 🥰


The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `yarn build`   compile typescript to js
 * `yarn lint`   check code style
 * `yarn destroy`    destroy the current stack
 * `yarn deploy`      deploy this stack to your default AWS account/region
 * `yarn bootstrap`   clean up env


## Install & Setup LocalStack
1. Install Docker if you haven’t already.
   https://docs.docker.com/get-docker/
2. Install AWS CLI. While we won’t be working with “real” AWS
   we will be using it to communicate with our local docker containers.
   https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html

## Install AWS CDK Local

Avoid the mistake when we use `cdk` command maybe it can impact to real environment
This lib provides a thin wrapper script cdklocal for using the AWS CDK library against local APIs provided by LocalStack.
Refer : https://github.com/localstack/aws-cdk-local

```shell
npm install -g aws-cdk-local aws-cdk
```


Or yarn

```shell
yarn global add aws-cdk-local aws-cdk
```

$ cdklocal --version
1.65.5



# Start Localstack & Deploy our services

### Step 1. init create a fake aws credentials - use for our localstack as below ( This is required for our localstack )
```shell
cat ~/.aws/credentials

[default]
aws_access_key_id = test
aws_secret_access_key = test
region = us-west-2     
output = json
```

### Step 2. `cd to localstack` folder and run the command `docker-compose up -d`

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

#### Check your `memcached` was run successfully :check_mark: 

```
# telnet the to port 11211
telnet localhost 11211

# Add a new key to memcache
set Customer_Id 0 900 5
# Type your value ( Enter - A message STORED will be displayed)
00-000-000
STORED
# Recheck by get your key stored 
get Customer_Id
00-000-000
# exit telnet
quit
```

#### Check your `Redis` was run successfully :check_mark: 
Install Redis Client ( Add connection )

#### Windows
Download latest https://github.com/qishibo/AnotherRedisDesktopManager/releases package from https://github.com/qishibo/AnotherRedisDesktopManager/releases [or gitee in China], double click to install.

Or by winget: winget install qishibo.AnotherRedisDesktopManager

#### Mac
Download latest https://github.com/qishibo/AnotherRedisDesktopManager/releases package from release [or gitee in China], double click to install.

Or by brew: brew install --cask another-redis-desktop-manager

 

### Step 3. Deploy our Application Stack

```shell
yarn deploy
```

```markdown
IAM Statement Changes ...
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
    arn:aws:cloudformation:us-west-2:000000000000:stack/ApplicationStack/e67d04e2
```

### Step 4. Quick check our deployment S3 & Dynamo DB Tables
#### DynamoDB
```shell
aws --endpoint-url=http://localhost:4566 dynamodb list-tables

{
    "TableNames": [
        "test-development"
    ]
}

aws --endpoint-url=http://localhost:4566 dynamodb describe-table --table-name test-development
```

## Useful Tools ( How to use it )
| Tool      | Description |
| ----------- | ----------- |
| S3 Viewer (MAC & Win) <br/> https://cyberduck.io/     | ![Screen Shot 2021-10-08 at 17 39 59](https://user-images.githubusercontent.com/78775708/136542800-12649534-6832-46db-84c6-d1f5b9e63d85.png) |
| DynamoDB Viewer (MAC & Win) <br/> https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.settingup.html   |   ![Screen Shot 2021-10-08 at 17 42 30](https://user-images.githubusercontent.com/78775708/136543146-5a52d1a0-a7c1-4eda-b394-83facca1d3d2.png)     |
| SQS Sender   <br/>https://github.com/kobee-tech-stack/sqs-viewer    |
| Redis Viewer (MAC & Win) <br/> https://github.com/qishibo/AnotherRedisDesktopManager   |   ...     |



