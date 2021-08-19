import * as dynamodb from "@aws-cdk/aws-dynamodb";
import { GlobalSecondaryIndexProps, StreamViewType } from "@aws-cdk/aws-dynamodb/lib/table";
import { createStandardGSI } from "../../utils/createGlobalSecondaryIndex";
import { Stack } from "@aws-cdk/core"

export const generateGlobalSafetyCheckDevelopment = (root: Stack) => {
    const safetyCheckTable = new dynamodb.Table(root, 'GlobalSafetyCheck-development', {
        tableName: 'GlobalSafetyCheck-development',
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

    safetyCheckTable.addGlobalSecondaryIndex(pk2Sk2Index);
    safetyCheckTable.addGlobalSecondaryIndex(pk3Sk3Index);
    safetyCheckTable.addGlobalSecondaryIndex(pk4Sk4Index);

    return safetyCheckTable;
}
