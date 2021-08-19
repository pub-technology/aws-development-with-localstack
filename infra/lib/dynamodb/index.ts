import { generateTestDevelopmentTable } from "./test-development";
import { Stack } from "@aws-cdk/core";
import {generateGlobalSafetyCheckDevelopment} from './global-safety-check-development';

export const initDynamoDB = (root: Stack) => {
  // Test Development Table
  generateTestDevelopmentTable(root);
  generateGlobalSafetyCheckDevelopment(root);
}
