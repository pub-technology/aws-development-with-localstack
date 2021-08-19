import { Stack } from "@aws-cdk/core";

import {generateRelaySafetyCheckSQS} from './relay-safety-check-development';

export const initSQS = (root: Stack) => {
    generateRelaySafetyCheckSQS(root);
}
