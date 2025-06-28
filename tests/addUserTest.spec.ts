import { test } from '@playwright/test';
import { AddUserPage } from './POM/addUserPOM';

test.describe('Positive Scenario', () => {
  test('Check if user can create if gender is Male', async ({ page }) => {
    const addUserPage = new AddUserPage(page);

    await addUserPage.open();
    await addUserPage.genderSelectedMenu('1');
    await addUserPage.fillUserNameField('VlaDick');
    await addUserPage.fillYearOfBirthField(1995);
    await addUserPage.createButtonClick();
    await addUserPage.homeButtonClick();
    await addUserPage.userCreateChecker('VlaDick');
  });

  test('Check if user can create if gender is Female', async ({ page }) => {
    const addUserPage = new AddUserPage(page);

    await addUserPage.open();
    await addUserPage.genderSelectedMenu('2');
    await addUserPage.fillUserNameField('Susana');
    await addUserPage.fillYearOfBirthField(2000);
    await addUserPage.createButtonClick();
    await addUserPage.homeButtonClick();
    await addUserPage.userCreateChecker('Susana');
  });

  test('Check if user can create if gender is Undefined', async ({ page }) => {
    const addUserPage = new AddUserPage(page);

    await addUserPage.open();
    await addUserPage.genderSelectedMenu('0');
    await addUserPage.fillUserNameField('Rockstar');
    await addUserPage.fillYearOfBirthField(1945);
    await addUserPage.createButtonClick();
    await addUserPage.homeButtonClick();
    await addUserPage.userCreateChecker('Rockstar');
  });
});

test.describe('Negative Scenario', () => {
  test('Check if user can create without username and validation message is displayed', async ({
    page,
  }) => {
    const addUserPage = new AddUserPage(page);

    await addUserPage.open();
    await addUserPage.genderSelectedMenu('1');
    await addUserPage.fillYearOfBirthField(1995);
    await addUserPage.createButtonClick();
    await addUserPage.nameValidationError('Name is requried');
  });

  test('Check if user can create without Year and validation message is displayed', async ({
    page,
  }) => {
    const addUserPage = new AddUserPage(page);

    await addUserPage.open();
    await addUserPage.genderSelectedMenu('2');
    await addUserPage.fillUserNameField('Rockstar');
    await addUserPage.createButtonClick();
    await addUserPage.yearValidationError('Year of Birth is requried');
  });

  test('Check if user cannot be created if user is not an adult', async ({
    page,
  }) => {
    const addUserPage = new AddUserPage(page);

    await addUserPage.open();
    await addUserPage.genderSelectedMenu('1');
    await addUserPage.fillUserNameField('VlaDick');
    await addUserPage.fillYearOfBirthField(2010);
    await addUserPage.createButtonClick();
    await addUserPage.yearValidationError('Not valid Year of Birth is set');
  });
});
