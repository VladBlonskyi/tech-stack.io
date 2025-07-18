import { test } from '@playwright/test';
import { AddUserSteps } from '../../Steps/addUserSteps';
import { UserUiFactory } from '../../Factory/addUserFactory';
import { GenderUIEnum } from '../../Enums/enumAddUser';
import 'dotenv/config';
let userSteps: AddUserSteps;

test.beforeEach(async ({ page }) => {
  userSteps = new AddUserSteps(page);
  await userSteps.openMainpage();
});

test.describe('Positive Scenario', () => {
  const validData = [
    UserUiFactory.createNewUser(
      GenderUIEnum.Male,
      process.env.MALE_ADULT_NAME!,
      Number(process.env.MALE_ADULT_YEAR)
    ),
    UserUiFactory.createNewUser(
      GenderUIEnum.Female,
      process.env.FEMALE_ADULT_NAME!,
      Number(process.env.FEMALE_ADULT_YEAR)
    ),
    UserUiFactory.createNewUser(
      GenderUIEnum.Undefined,
      process.env.UNDEFINED_GENDER_NAME!,
      Number(process.env.UNDEFINED_GENDER_YEAR)
    ),
  ];

  test('Check that Add User page opens', async () => {
    await userSteps.clickAddUserNavigationButton();
    await userSteps.verifyAddUserPageIsOpen();
  });
  test('Check that user is created with male gender', async () => {
    await userSteps.fillAllFields(validData[0]);
    await userSteps.clickHomeNavigationButton();
    await userSteps.verifyUserCreated(validData[0].name);
    await userSteps.deletePerson(validData[0].name);
  });
  test('Check that user is created with female gender', async () => {
    await userSteps.fillAllFields(validData[1]);
    await userSteps.clickHomeNavigationButton();
    await userSteps.verifyUserCreated(validData[1].name);
    await userSteps.deletePerson(validData[1].name);
  });
  test('Check that user is created with undefined gender', async () => {
    await userSteps.fillAllFields(validData[2]);
    await userSteps.clickHomeNavigationButton();
    await userSteps.verifyUserCreated(validData[2].name);
    await userSteps.deletePerson(validData[2].name);
  });
});

test.describe('Negative Scenario', () => {
  const inValidData = [
    UserUiFactory.createNewInvalidUser(
      GenderUIEnum.Female,
      '',
      Number(process.env.FEMALE_ADULT_YEAR)
    ),
    UserUiFactory.createNewInvalidUser(
      GenderUIEnum.Undefined,
      process.env.UNDEFINED_GENDER_NAME!,
      Number('')
    ),
    UserUiFactory.createNewInvalidUser(
      GenderUIEnum.Male,
      process.env.NOT_ADULT_NAME!,
      Number(process.env.NOT_ADULT_YEAR)
    ),
  ];
  test('Check that user is not created without username and validation message is displayed', async () => {
    await userSteps.fillAllFields(inValidData[0]);
    await userSteps.userNameValidationMessage('Name is requried');
  });
  test('Check that user is not created without year and validation message is displayed', async () => {
    await userSteps.fillAllFields(inValidData[1]);
    await userSteps.yearValidationMessage('Year of Birth is requried');
  });
  test('Check that user is not created when user is not an adult and validation message is displayed', async () => {
    await userSteps.fillAllFields(inValidData[2]);
    await userSteps.yearValidationMessage('Not valid Year of Birth is set');
  });
});
