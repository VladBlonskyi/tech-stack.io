import { test } from '@playwright/test';
import { UserSteps } from './Steps/steps';
import { TestUsers } from './DTO/testDATA';

let userSteps: UserSteps;

test.beforeEach(async ({ page }) => {
  userSteps = new UserSteps(page);
  await userSteps.openMainpage();
});
test.describe('Positive Scenario', () => {
  test('Check that Add User page opens', async () => {
    await userSteps.clickAddUserNavigationButton();
    await userSteps.verifyAddUserPageIsOpen();
  });
  test('Check that user is created with male gender', async () => {
    await userSteps.fillAllFields(TestUsers.MALE_ADULT);
    await userSteps.clickHomeNavigationButton();
    await userSteps.verifyUserCreated('VlaDick');
  });

  test('Check that user is created with female gender', async () => {
    await userSteps.fillAllFields(TestUsers.FEMALE_ADULT);
    await userSteps.clickHomeNavigationButton();
    await userSteps.verifyUserCreated('Susana');
  });

  test('Check that user is created with undefined gender', async () => {
    await userSteps.fillAllFields(TestUsers.UNDEFINED_GENDER);
    await userSteps.clickHomeNavigationButton();
    await userSteps.verifyUserCreated('Rockstar');
  });
});

test.describe('Negative Scenario', () => {
  test('Check that user is not created without username and validation message is displayed', async () => {
    await userSteps.fillAllFields(TestUsers.WITHOUT_NAME);
    await userSteps.userNameValidationMessage('Name is requried');
  });

  test('Check that user is not created without year and validation message is displayed', async () => {
    await userSteps.fillAllFields(TestUsers.WITHOUT_YEAR);
    await userSteps.yearValidationMessage('Year of Birth is requried');
  });

  test('Check that user is not created when user is not an adult and validation message is displayed', async () => {
    await userSteps.fillAllFields(TestUsers.NOT_ADULT);
    await userSteps.yearValidationMessage('Not valid Year of Birth is set');
  });
});
