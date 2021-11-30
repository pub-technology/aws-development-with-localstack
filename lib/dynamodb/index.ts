import { generateTestDevelopmentTable } from './test-development';
import { Stack } from '@aws-cdk/core';


export const initDynamoDB = (root: Stack) => {
  // Test Development Table
  generateTestDevelopmentTable(root);
};
