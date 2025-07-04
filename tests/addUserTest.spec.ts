import { test } from '@playwright/test';
import { UserSteps } from './Steps/steps';

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
    await userSteps.fillAllFields('1', 'VlaDick', 1995);
    await userSteps.clickHomeNavigationButton();
    await userSteps.verifyUserCreated('VlaDick');
  });

  test('Check that user is created with female gender', async () => {
    await userSteps.fillAllFields('2', 'Susana', 2000);
    await userSteps.clickHomeNavigationButton();
    await userSteps.verifyUserCreated('Susana');
  });

  test('Check that user is created with undefined gender', async () => {
    await userSteps.fillAllFields('0', 'Rockstar', 1945);
    await userSteps.clickHomeNavigationButton();
    await userSteps.verifyUserCreated('Rockstar');
  });
});

test.describe('Negative Scenario', () => {
  test('Check that user is not created without username and validation message is displayed', async () => {
    await userSteps.fillAllFields('1', undefined, 1995);
    await userSteps.userNameValidationMessage('Name is requried');
  });

  test('Check that user is not created without year and validation message is displayed', async () => {
    await userSteps.fillAllFields('1', 'Vladick', undefined);
    await userSteps.yearValidationMessage('Year of Birth is requried');
  });

  test('Check that user is not created when user is not an adult and validation message is displayed', async () => {
    await userSteps.fillAllFields('1', 'Vlad', 2015);
    await userSteps.yearValidationMessage('Not valid Year of Birth is set');
  });
});
