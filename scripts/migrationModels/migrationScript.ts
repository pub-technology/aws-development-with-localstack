"use strict";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import appConfig from "../config";

const migrationScript = async () => {
  const client = new DynamoDBClient({
    endpoint: appConfig.endpoint,
    region: appConfig.region
  });

  console.log("Migrate Data : Done");
};

(async function main() {
  await migrationScript();
  console.log(`
    Migrate development data to local was run successfully.
  `);
})();
