import { Page } from '@playwright/test';
import { AddUserPage } from '../POM/addUserPOM';

export class UserSteps {
  addUserPage: AddUserPage;

  constructor(public page: Page) {
    this.addUserPage = new AddUserPage(page);
  }

  async openMainpage() {
    await this.addUserPage.open();
  }

  async fillAllFields(gender?: string, name?: string, year?: number) {
    if (gender) {
      await this.addUserPage.selectGenderDropdown(gender);
    }
    if (name) {
      await this.addUserPage.fillUserNameField(name);
    }
    if (year) {
      await this.addUserPage.fillYearOfBirthField(year);
    }
    await this.addUserPage.clickCreateButton();
  }
  async clickHomeNavigationButton() {
    await this.addUserPage.clickHomeNavigationButton();
  }
  async clickAddUserNavigationButton() {
    await this.addUserPage.clickAddUserNavigationButton();
  }
  async verifyAddUserPageIsOpen() {
    await this.addUserPage.verifyAddUserPageIsOpen();
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
