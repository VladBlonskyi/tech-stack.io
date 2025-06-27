import { Locator, Page, expect } from '@playwright/test';

export class AddUserPage {
  genderSelect: Locator;
  userNameField: Locator;
  yearOfBirthField: Locator;
  createButton: Locator;
  homeButton: Locator;
  userCreate: Locator;

  constructor(public page: Page) {
    this.page = page;
    this.genderSelect = page.locator('[data-testid="select-Gender"]');
    this.userNameField = page.locator('[data-testid="input-UserName"]');
    this.yearOfBirthField = page.locator('[data-testid="input-YearOfBirth"]');
    this.createButton = page.locator('[data-testid="button-Create"]');
    this.homeButton = page.locator('a:has-text("Home")');
    this.userCreate = page.locator('[data-testid="td-UserName"]');
  }

  async open() {
    await this.page.goto('/Forms/AddUser');
  }
  async genderSelectedMenu(value: string) {
    await this.genderSelect.selectOption(value);
  }
  async fillUserNameField(text: string) {
    await this.userNameField.fill(text);
  }
  async fillYearOfBirthField(year: number) {
    await this.yearOfBirthField.fill(year.toString());
  }
  async createButtonClick() {
    await this.createButton.click();
  }
  async homeButtonClick() {
    await this.homeButton.click();
  }
  async userCreateChecker(username: string) {
    await expect(this.userCreate.filter({ hasText: username })).toBeVisible();
  }
}
