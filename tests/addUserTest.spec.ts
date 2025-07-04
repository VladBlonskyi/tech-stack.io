import { test } from '@playwright/test';
import { AddUserPage } from './POM/addUserPOM';
import { UserSteps } from './Steps/steps';

test.describe('Positive Scenario', () => {
  test('Check that Add User page opens', async ({ page }) => {
    const addUserPage = new AddUserPage(page);

    await page.goto('/');
    await addUserPage.clickAddUserNavigationButton();
    await addUserPage.verifyAddUserPageIsOpen();
  });

  test('Check that user is created with male gender', async ({ page }) => {
    const addUserPage = new AddUserPage(page);
    const userSteps = new UserSteps(page);

    await addUserPage.open();
    await userSteps.fillAllFields('1', 'VlaDick', 1995);
    await addUserPage.clickHomeNavigationButton();
    await addUserPage.verifyUserCreated('VlaDick');
  });

  test('Check that user is created with female gender', async ({ page }) => {
    const addUserPage = new AddUserPage(page);
    const userSteps = new UserSteps(page);

    await addUserPage.open();
    await userSteps.fillAllFields('2', 'Susana', 2000);
    await addUserPage.clickHomeNavigationButton();
    await addUserPage.verifyUserCreated('Susana');
  });

  test('Check that user is created with undefined gender', async ({ page }) => {
    const addUserPage = new AddUserPage(page);
    const userSteps = new UserSteps(page);

    await addUserPage.open();
    await userSteps.fillAllFields('0', 'Rockstar', 1945);
    await addUserPage.clickHomeNavigationButton();
    await addUserPage.verifyUserCreated('Rockstar');
  });
});

test.describe('Negative Scenario', () => {
  test('Check that user is not created without username and validation message is displayed', async ({
    page,
  }) => {
    const addUserPage = new AddUserPage(page);
    const userSteps = new UserSteps(page);

    await addUserPage.open();
    await userSteps.fillAllFields('1', undefined, 1995);
    await addUserPage.userNameValidationMessage('Name is requried');
  });

  test('Check that user is not created without year and validation message is displayed', async ({
    page,
  }) => {
    const addUserPage = new AddUserPage(page);
    const userSteps = new UserSteps(page);

    await addUserPage.open();
    await userSteps.fillAllFields('1', 'Vladick', undefined);
    await addUserPage.clickCreateButton();
    await addUserPage.yearValidationMessage('Year of Birth is requried');
  });

  test('Check that user is not created when user is not an adult and validation message is displayed', async ({
    page,
  }) => {
    const addUserPage = new AddUserPage(page);
    const userSteps = new UserSteps(page);

    await addUserPage.open();
    await userSteps.fillAllFields('1', 'Vladick', 2015);
    await addUserPage.clickCreateButton();
    await addUserPage.yearValidationMessage('Not valid Year of Birth is set');
  });
});
