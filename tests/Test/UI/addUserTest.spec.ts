import { test } from '@playwright/test';
import { AddUserSteps } from '../../Steps/addUserSteps';
import { UserFactory } from '../../Factory/userFactory';

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
    const maleUserCreate = UserFactory.createNewUser('Male_Gender');
    await userSteps.fillAllFields(maleUserCreate);
    await userSteps.clickHomeNavigationButton();
    await userSteps.verifyUserCreated(maleUserCreate.name);
    await userSteps.deletePerson(maleUserCreate.name);
  });

  test('Check that user is created with female gender', async () => {
    const femaleUserCreate = UserFactory.createNewUser('Female_Gender');
    await userSteps.fillAllFields(femaleUserCreate);
    await userSteps.clickHomeNavigationButton();
    await userSteps.verifyUserCreated(femaleUserCreate.name);
    await userSteps.deletePerson(femaleUserCreate.name);
  });

  test('Check that user is created with undefined gender', async () => {
    const undefinedUserCreate = UserFactory.createNewUser('Undefined_Gender');
    await userSteps.fillAllFields(undefinedUserCreate);
    await userSteps.clickHomeNavigationButton();
    await userSteps.verifyUserCreated(undefinedUserCreate.name);
    await userSteps.deletePerson(undefinedUserCreate.name);
  });
});

test.describe('Negative Scenario', () => {
  test('Check that user is not created without username and validation message is displayed', async () => {
    const withoutNameCreate = UserFactory.createNewUser('Without_Name');
    await userSteps.fillAllFields(withoutNameCreate);
    await userSteps.userNameValidationMessage('Name is requried');
  });

  test('Check that user is not created without year and validation message is displayed', async () => {
    const withoutYearCreate = UserFactory.createNewUser('Without_Year');
    await userSteps.fillAllFields(withoutYearCreate);
    await userSteps.yearValidationMessage('Year of Birth is requried');
  });

  test('Check that user is not created when user is not an adult and validation message is displayed', async () => {
    const notAdultCreate = UserFactory.createNewUser('Not_Adult');
    await userSteps.fillAllFields(notAdultCreate);
    await userSteps.yearValidationMessage('Not valid Year of Birth is set');
  });
});
