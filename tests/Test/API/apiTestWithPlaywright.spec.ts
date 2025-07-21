import { test, expect } from '@playwright/test';
import { UserApiSteps } from '../../Steps/apiSteps';

test.describe('Full user flow scenario', () => {
  let userSteps: UserApiSteps;

  test.beforeEach(async ({ request }) => {
    userSteps = new UserApiSteps(request);
    await userSteps.createUser();
  });

  test.afterEach(async ({}) => {
    await userSteps.deleteUser();
  });

  test('Get info about user', async ({}) => {
    await userSteps.getUserInfo();
  });

  test('Update user', async ({}) => {
    await userSteps.updateUser();
  });

  test('GET info about all users', async ({}) => {
    await userSteps.getInfoAboutUsers();
  });
});
