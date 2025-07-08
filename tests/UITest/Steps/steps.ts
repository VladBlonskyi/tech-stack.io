import { Page, expect } from '@playwright/test';
import { AddUserPage } from '../POM/addUserPOM';
import { UserDTO } from '../DTO/userDTO';

export class UserSteps {
  addUserPage: AddUserPage;

  constructor(public page: Page) {
    this.addUserPage = new AddUserPage(page);
  }

  async openMainpage() {
    await this.addUserPage.open();
    await this.addUserPage.addUserPageLocator.waitFor({ state: 'visible' });
  }

  async fillAllFields(user: UserDTO) {
    if (user.gender) {
      await this.addUserPage.selectGenderDropdown(user.gender);
    }
    if (user.name) {
      await this.addUserPage.fillUserNameField(user.name);
    }
    if (user.year) {
      await this.addUserPage.fillYearOfBirthField(user.year);
    }
    await this.addUserPage.clickCreateButton();
  }
  async clickHomeNavigationButton() {
    await this.addUserPage.clickHomeNavigationButton();
    await this.addUserPage.homePageLocator.waitFor({ state: 'visible' });
  }
  async clickAddUserNavigationButton() {
    await this.addUserPage.clickAddUserNavigationButton();
    await expect(this.addUserPage.createButtonLocator).toBeVisible();
  }
  async verifyAddUserPageIsOpen() {
    await this.addUserPage.verifyAddUserPageIsOpen();
    await expect(this.page).toHaveURL(
      'https://traineeautomation.azurewebsites.net/Forms/AddUser'
    );
  }
  async verifyUserCreated(username: string) {
    await this.addUserPage.verifyUserCreated(username);
  }
  async userNameValidationMessage(text: string) {
    await this.addUserPage.userNameValidationMessage(text);
  }
  async yearValidationMessage(text: string) {
    await this.addUserPage.yearValidationMessage(text);
  }
}
