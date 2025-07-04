import { Locator, Page, expect } from '@playwright/test';

export class AddUserPage {
  genderSelectLocator: Locator;
  userNameFieldLocator: Locator;
  yearOfBirthFieldLocator: Locator;
  createButtonLocator: Locator;
  homeButtonLocator: Locator;
  userCreateLocator: Locator;
  nameErrorLocator: Locator;
  yearErrorLocator: Locator;
  addUserPageLocator: Locator;
  addUserButtonLocator: Locator;
  homePageLocator: Locator;

  constructor(public page: Page) {
    this.page = page;
    this.genderSelectLocator = page.getByTestId('select-Gender');
    this.userNameFieldLocator = page.getByTestId('input-UserName');
    this.yearOfBirthFieldLocator = page.getByTestId('input-YearOfBirth');
    this.createButtonLocator = page.getByTestId('button-Create');
    this.homeButtonLocator = page.locator(
      "//ul[@class='navbar-nav flex-grow-1']/child::li[1]"
    );
    this.addUserButtonLocator = page.locator(
      "//ul[@class='navbar-nav flex-grow-1']/child::li[2]"
    );
    this.userCreateLocator = page.getByTestId('td-UserName');
    this.nameErrorLocator = page.locator(
      "//span/span[text()='Name is too short' or text()='Name is requried']"
    );
    this.yearErrorLocator = page.locator(
      "//span/span[@id='inputYearOfBirth-error']"
    );
    this.addUserPageLocator = page.locator("//h1[text()='Add User']");
    this.homePageLocator = page.locator("//h1[text()='Users and Addresses']");
  }

  async open() {
    await this.page.goto('/Forms/AddUser');
  }
  async selectGenderDropdown(value: string) {
    await this.genderSelectLocator.selectOption(value);
  }
  async fillUserNameField(text: string) {
    await this.userNameFieldLocator.fill(text);
  }
  async fillYearOfBirthField(year: number) {
    await this.yearOfBirthFieldLocator.fill(year.toString());
  }
  async clickCreateButton() {
    await this.createButtonLocator.click();
  }
  async clickHomeNavigationButton() {
    await this.homeButtonLocator.click();
  }
  async clickAddUserNavigationButton() {
    await this.addUserButtonLocator.click();
  }
  async verifyAddUserPageIsOpen() {
    await expect(this.addUserPageLocator).toBeVisible();
  }
  async verifyUserCreated(username: string) {
    await expect(
      this.userCreateLocator.filter({ hasText: username })
    ).toBeVisible();
  }
  async userNameValidationMessage(text: string) {
    await expect(this.nameErrorLocator).toHaveText(text);
  }
  async yearValidationMessage(text: string) {
    await expect(this.yearErrorLocator).toHaveText(text);
  }
}
