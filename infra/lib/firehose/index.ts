import { Stack } from "@aws-cdk/core";
import { generateTestFirehose } from "./test-firehose";
import {generateSafetyCheckFirehose} from './safety-check-decisions';

export const initFirehose = (root: Stack) => {
  generateTestFirehose(root);
  generateSafetyCheckFirehose(root);
}
