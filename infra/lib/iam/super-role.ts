import {User, Group, ManagedPolicy, PolicyStatement, Effect} from '@aws-cdk/aws-iam';
import { Stack } from "@aws-cdk/core";

export const generateSuperRole = (root: Stack) => {
  // 👇 Create group
  const group = new Group(root, 'admin-group', {
    managedPolicies: [
      ManagedPolicy.fromAwsManagedPolicyName('*'),
    ],
  });

  // 👇 Create Managed Policy
  const allManagedPolicy = ManagedPolicy.fromAwsManagedPolicyName(
    '*',
  );

  // 👇 Create Permissions Boundary
  const permissionsBoundary = new ManagedPolicy(
    root,
    'admin-role-permissions',
    {
      statements: [
        new PolicyStatement({
          effect: Effect.ALLOW,
          actions: ['*'],
          resources: ['*'],
        }),
      ],
    },
  );

  // 👇 Create User
  const user: User =  new User(root, 'super-role', {
    userName: 'administrator',
    managedPolicies: [allManagedPolicy],
    groups: [group],
    permissionsBoundary,
  });

  console.log('Super Admin : ', user.userArn);
  return user;
}
