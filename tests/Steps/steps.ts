import { Page, expect } from '@playwright/test';
import { AddUserPage } from '../POM/addUserPOM';

export enum Gender {
  Undefined = '0',
  Male = '1',
  Female = '2',
}

export class UserSteps {
  addUserPage: AddUserPage;

  constructor(public page: Page) {
    this.addUserPage = new AddUserPage(page);
  }

  async openMainpage() {
    await this.addUserPage.open();
    await this.addUserPage.addUserPageLocator.waitFor({ state: 'visible' });
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
