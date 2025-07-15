import { test } from '@playwright/test';
import { AddUserSteps } from '../../Steps/addUserSteps';
import { TestUsersData } from '../../TestData/addUserData';

let userSteps: AddUserSteps;

test.beforeEach(async ({ page }) => {
  userSteps = new AddUserSteps(page);
  await userSteps.openMainpage();
});

test.describe('Positive Scenario', () => {
  test('Check that Add User page opens', async () => {
    await userSteps.clickAddUserNavigationButton();
    await userSteps.verifyAddUserPageIsOpen();
  });
  test('Check that user is created with male gender', async () => {
    await userSteps.fillAllFields(TestUsersData.MALE_ADULT);
    await userSteps.clickHomeNavigationButton();
    await userSteps.verifyUserCreated(TestUsersData.MALE_ADULT.name);
    await userSteps.deletePerson(TestUsersData.MALE_ADULT.name);
  });
  test('Check that user is created with female gender', async () => {
    await userSteps.fillAllFields(TestUsersData.FEMALE_ADULT);
    await userSteps.clickHomeNavigationButton();
    await userSteps.verifyUserCreated(TestUsersData.FEMALE_ADULT.name);
    await userSteps.deletePerson(TestUsersData.FEMALE_ADULT.name);
  });
  test('Check that user is created with undefined gender', async () => {
    await userSteps.fillAllFields(TestUsersData.UNDEFINED_GENDER);
    await userSteps.clickHomeNavigationButton();
    await userSteps.verifyUserCreated(TestUsersData.UNDEFINED_GENDER.name);
    await userSteps.deletePerson(TestUsersData.UNDEFINED_GENDER.name);
  });
});

test.describe('Negative Scenario', () => {
  test('Check that user is not created without username and validation message is displayed', async () => {
    await userSteps.fillAllFields(TestUsersData.WITHOUT_NAME);
    await userSteps.userNameValidationMessage('Name is requried');
  });
  test('Check that user is not created without year and validation message is displayed', async () => {
    await userSteps.fillAllFields(TestUsersData.WITHOUT_YEAR);
    await userSteps.yearValidationMessage('Year of Birth is requried');
  });
  test('Check that user is not created when user is not an adult and validation message is displayed', async () => {
    await userSteps.fillAllFields(TestUsersData.NOT_ADULT);
    await userSteps.yearValidationMessage('Not valid Year of Birth is set');
  });
});
