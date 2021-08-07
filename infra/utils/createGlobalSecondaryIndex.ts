import { AttributeType, ProjectionType, GlobalSecondaryIndexProps } from "@aws-cdk/aws-dynamodb";

/**
 * Default pk & sk is attr type is STRING & read/write capacity is 5.
 * @param indexName
 * @param pkName
 * @param skName
 */
export const createStandardGSI = (indexName: string, pkName: string, skName: string) : GlobalSecondaryIndexProps => {
  return {
    indexName,
    partitionKey: { name: pkName, type: AttributeType.STRING },
    sortKey: { name: skName, type: AttributeType.STRING },
    projectionType: ProjectionType.ALL,
    readCapacity: 5,
    writeCapacity: 5,
  };
}
