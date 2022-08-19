import {Stack} from "@aws-cdk/core";
import {generateScreenShotBucket} from "./screenshot";

export const initS3Buckets = (root: Stack): void => {
    generateScreenShotBucket(root);
}
