import { test } from '@playwright/test';
import { AddUserPage } from './POM/addUserPOM';

test.describe('Positive Scenario', () => {
  test('A user is created when gender is Male', async ({ page }) => {
    const addUserPage = new AddUserPage(page);

    await addUserPage.open();
    await addUserPage.selectGenderDropdown('1');
    await addUserPage.fillUserNameField('VlaDick');
    await addUserPage.fillYearOfBirthField(1995);
    await addUserPage.clickCreateButton();
    await addUserPage.clickHomeNavigationButton();
    await addUserPage.verifyUserCreated('VlaDick');
  });

  test('A user is created when gender is Female', async ({ page }) => {
    const addUserPage = new AddUserPage(page);

    await addUserPage.open();
    await addUserPage.selectGenderDropdown('2');
    await addUserPage.fillUserNameField('Susana');
    await addUserPage.fillYearOfBirthField(2000);
    await addUserPage.clickCreateButton();
    await addUserPage.clickHomeNavigationButton();
    await addUserPage.verifyUserCreated('Susana');
  });

  test('A user is created when gender is Undefined', async ({ page }) => {
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
  test('User is not created without a username and a validation message is displayed', async ({
    page,
  }) => {
    const addUserPage = new AddUserPage(page);

    await addUserPage.open();
    await addUserPage.selectGenderDropdown('1');
    await addUserPage.fillYearOfBirthField(1995);
    await addUserPage.clickCreateButton();
    await addUserPage.userNameValidationMessage('Name is requried');
  });

  test('User is not created without a year and a validation message is displayed', async ({
    page,
  }) => {
    const addUserPage = new AddUserPage(page);

    await addUserPage.open();
    await addUserPage.selectGenderDropdown('2');
    await addUserPage.fillUserNameField('Rockstar');
    await addUserPage.clickCreateButton();
    await addUserPage.yearValidationMessage('Year of Birth is requried');
  });

  test('User is not created if not an adult and a validation message is displayed', async ({
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

test('Add User page is opened', async ({ page }) => {
  const addUserPage = new AddUserPage(page);

  await page.goto('/');
  await addUserPage.clickAddUserNavigationButton();
  await addUserPage.verifyAddUserPageIsOpen();
});
