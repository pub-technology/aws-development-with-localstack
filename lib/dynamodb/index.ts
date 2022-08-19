import { generateTestDevelopmentTable } from './test-development';
import { Stack } from '@aws-cdk/core';

export const initDynamoDB = (root: Stack): void => {
  // Test Development Table
  generateTestDevelopmentTable(root);
};
