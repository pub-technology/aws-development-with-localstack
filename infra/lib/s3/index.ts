import { Stack } from "@aws-cdk/core";
import { generateScreenShotBucket } from "./screenshot";
import {generateRelaySafetyCheckBucket} from './relay-safety-check-development';

export const initS3Buckets = (root: Stack) => {
  generateScreenShotBucket(root);
  generateRelaySafetyCheckBucket(root);
}
