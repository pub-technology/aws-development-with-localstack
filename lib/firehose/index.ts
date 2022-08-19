import {Stack} from "@aws-cdk/core";
import {generateTestFirehose} from "./test-firehose";
import * as iam from "@aws-cdk/aws-iam";

export const initFirehose = (root: Stack): void => {
    const safetyCheckFirehoseRole = new iam.Role(root, 'safety-check-firehose-role', {
        assumedBy: new iam.ServicePrincipal('firehose.amazonaws.com')
    });

    generateTestFirehose(root, safetyCheckFirehoseRole);
}
