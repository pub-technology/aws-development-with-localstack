'use strict';

import {DynamoDBClient} from "@aws-sdk/client-dynamodb";

import seedAppConfig from "./config";

const seedData = async () => {
    const client = new DynamoDBClient({
        endpoint: seedAppConfig.endpoint,
        region: seedAppConfig.region
    });
    console.log('Seed Data : Done');
}

(async function main() {
    await seedData();
    console.log(`
    Seed global data was run successfully.
  `);
})();
