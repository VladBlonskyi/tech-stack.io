import { test } from '@playwright/test';
import { AddUserSteps } from '../../Steps/addUserSteps';
import { UserUiFactory } from '../../Factory/addUserFactory';

let userSteps: AddUserSteps;

test.beforeEach(async ({ page }) => {
  userSteps = new AddUserSteps(page);
  await userSteps.openMainpage();
});

test.describe('Positive Scenario', () => {
  const maleUserCreate = UserUiFactory.createNewUser('Male_Gender');
  const femaleUserCreate = UserUiFactory.createNewUser('Female_Gender');
  const undefinedUserCreate = UserUiFactory.createNewUser('Undefined_Gender');
  test('Check that Add User page opens', async () => {
    await userSteps.clickAddUserNavigationButton();
    await userSteps.verifyAddUserPageIsOpen();
  });
  test('Check that user is created with male gender', async () => {
    await userSteps.fillAllFields(maleUserCreate);
    await userSteps.clickHomeNavigationButton();
    await userSteps.verifyUserCreated(maleUserCreate.name!);
    await userSteps.deletePerson(maleUserCreate.name!);
  });
  test('Check that user is created with female gender', async () => {
    await userSteps.fillAllFields(femaleUserCreate);
    await userSteps.clickHomeNavigationButton();
    await userSteps.verifyUserCreated(femaleUserCreate.name!);
    await userSteps.deletePerson(femaleUserCreate.name!);
  });
  test('Check that user is created with undefined gender', async () => {
    await userSteps.fillAllFields(undefinedUserCreate);
    await userSteps.clickHomeNavigationButton();
    await userSteps.verifyUserCreated(undefinedUserCreate.name!);
    await userSteps.deletePerson(undefinedUserCreate.name!);
  });
});

test.describe('Negative Scenario', () => {
  const withoutNameCreate = UserUiFactory.createNewUser('Without_Name');
  const withoutYearCreate = UserUiFactory.createNewUser('Without_Year');
  const notAdultCreate = UserUiFactory.createNewUser('Not_Adult');
  test('Check that user is not created without username and validation message is displayed', async () => {
    await userSteps.fillAllFields(withoutNameCreate);
    await userSteps.userNameValidationMessage('Name is requried');
  });
  test('Check that user is not created without year and validation message is displayed', async () => {
    await userSteps.fillAllFields(withoutYearCreate);
    await userSteps.yearValidationMessage('Year of Birth is requried');
  });
  test('Check that user is not created when user is not an adult and validation message is displayed', async () => {
    await userSteps.fillAllFields(notAdultCreate);
    await userSteps.yearValidationMessage('Not valid Year of Birth is set');
  });
});
