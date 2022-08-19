import {Stack} from "@aws-cdk/core";

import { generateSimpleSQS } from "./simple-sqs-development";

export const initSQS = (root: Stack): void => {
    generateSimpleSQS(root);
}
