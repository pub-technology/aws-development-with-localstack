import { Stack } from "@aws-cdk/core";
import { generateTestFirehose } from "./test-firehose";

export const initFirehose = (root: Stack) => {
  generateTestFirehose(root);
}
