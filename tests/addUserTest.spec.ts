import { test } from '@playwright/test';
import { AddUserPage } from './POM/addUserPOM';

test('Form submitted successfully. User was added.', async ({ page }) => {
  const addUserPage = new AddUserPage(page);

  await addUserPage.open();
  await addUserPage.genderSelectedMenu('1');
  await addUserPage.fillUserNameField('VlaDick');
  await addUserPage.fillYearOfBirthField(1995);
  await addUserPage.createButtonClick();
  await addUserPage.homeButtonClick();
  await addUserPage.userCreateChecker('VlaDick');
});
