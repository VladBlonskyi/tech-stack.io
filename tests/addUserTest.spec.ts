import { test } from '@playwright/test';
import { AddUserPage } from './POM/addUserPOM';

test.describe('Positive Scenario', () => {
  test('Check that Add User page opens', async ({ page }) => {
    const addUserPage = new AddUserPage(page);

    await page.goto('/');
    await addUserPage.clickAddUserNavigationButton();
    await addUserPage.verifyAddUserPageIsOpen();
  });

  test('Check that user is created with male gender', async ({ page }) => {
    const addUserPage = new AddUserPage(page);

    await addUserPage.open();
    await addUserPage.selectGenderDropdown('1');
    await addUserPage.fillUserNameField('VlaDick');
    await addUserPage.fillYearOfBirthField(1995);
    await addUserPage.clickCreateButton();
    await addUserPage.clickHomeNavigationButton();
    await addUserPage.verifyUserCreated('VlaDick');
  });

  test('Check that user is created with female gender', async ({ page }) => {
    const addUserPage = new AddUserPage(page);

    await addUserPage.open();
    await addUserPage.selectGenderDropdown('2');
    await addUserPage.fillUserNameField('Susana');
    await addUserPage.fillYearOfBirthField(2000);
    await addUserPage.clickCreateButton();
    await addUserPage.clickHomeNavigationButton();
    await addUserPage.verifyUserCreated('Susana');
  });

  test('Check that user is created with undefined gender', async ({ page }) => {
    const addUserPage = new AddUserPage(page);

    await addUserPage.open();
    await addUserPage.selectGenderDropdown('0');
    await addUserPage.fillUserNameField('Rockstar');
    await addUserPage.fillYearOfBirthField(1945);
    await addUserPage.clickCreateButton();
    await addUserPage.clickHomeNavigationButton();
    await addUserPage.verifyUserCreated('Rockstar');
  });
});

test.describe('Negative Scenario', () => {
  test('Check that user is not created without username and validation message is displayed', async ({
    page,
  }) => {
    const addUserPage = new AddUserPage(page);

    await addUserPage.open();
    await addUserPage.selectGenderDropdown('1');
    await addUserPage.fillYearOfBirthField(1995);
    await addUserPage.clickCreateButton();
    await addUserPage.userNameValidationMessage('Name is requried');
  });

  test('Check that user is not created without year and validation message is displayed', async ({
    page,
  }) => {
    const addUserPage = new AddUserPage(page);

    await addUserPage.open();
    await addUserPage.selectGenderDropdown('2');
    await addUserPage.fillUserNameField('Rockstar');
    await addUserPage.clickCreateButton();
    await addUserPage.yearValidationMessage('Year of Birth is requried');
  });

  test('Check that user is not created when user is not an adult and validation message is displayed', async ({
    page,
  }) => {
    const addUserPage = new AddUserPage(page);

    await addUserPage.open();
    await addUserPage.selectGenderDropdown('1');
    await addUserPage.fillUserNameField('VlaDick');
    await addUserPage.fillYearOfBirthField(2010);
    await addUserPage.clickCreateButton();
    await addUserPage.yearValidationMessage('Not valid Year of Birth is set');
  });
});
