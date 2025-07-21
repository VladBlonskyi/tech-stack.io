import { Page, expect } from '@playwright/test';
import { AddUserPOM } from '../POM/addUserPOM';
import { UserDTO } from '../DTO/userDTO';

export class AddUserSteps {
  addUserPage: AddUserPOM;

  constructor(page: Page) {
    this.addUserPage = new AddUserPOM(page);
  }

  async openMainpage() {
    await this.addUserPage.open();
    await this.addUserPage.addUserPageLocator.waitFor({ state: 'visible' });
  }
  async fillAllFields(user: UserDTO) {
    if (user.gender) {
      await this.addUserPage.selectGenderDropdown(user.gender.toString());
    }
    if (user.name) {
      await this.addUserPage.fillUserNameField(user.name);
    }
    if (user.yearOfBirth) {
      await this.addUserPage.fillYearOfBirthField(user.yearOfBirth);
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
    await this.addUserPage.verifyUrlIsAddUserPage();
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
  async deletePerson(name: string) {
    const deleteButton = this.addUserPage.getDeleteButtonByName(name);
    if (await deleteButton.isVisible()) {
      await deleteButton.click();
      await this.addUserPage.acceptDeleteClick();
    }
  }
}
