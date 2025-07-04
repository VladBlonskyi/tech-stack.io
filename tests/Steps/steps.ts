import { Page } from '@playwright/test';
import { AddUserPage } from '../POM/addUserPOM';

export class UserSteps {
  addUserPage: AddUserPage;

  constructor(public page: Page) {
    this.addUserPage = new AddUserPage(page);
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
}
