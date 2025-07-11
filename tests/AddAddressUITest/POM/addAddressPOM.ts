import { Page, Locator } from '@playwright/test';

export class AddAddressPOM {
  readonly page: Page;
  readonly streetAddressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipCodeInput: Locator;
  readonly createButton: Locator;
  readonly streetAddressError: Locator;
  readonly cityError: Locator;
  readonly stateError: Locator;
  readonly zipCodeError: Locator;
  readonly acceptDelete: Locator;
  readonly addAddressPageLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.streetAddressInput = page.getByTestId('input-StreetAddress');
    this.cityInput = page.getByTestId('input-City');
    this.stateInput = page.getByTestId('input-State');
    this.zipCodeInput = page.getByTestId('input-ZipCode');
    this.createButton = page.getByTestId('button-Create');
    this.streetAddressError = page.getByText('Street Address is required');
    this.cityError = page.getByText('City is required');
    this.stateError = page.getByText('State is required');
    this.zipCodeError = page.getByText('Zip Code is required');
    this.acceptDelete = page.getByTestId('button-Yes');
    this.addAddressPageLocator = page.locator("//h1[text()='Add Address']");
  }
  async addAddressPageOpen() {
    await this.page.goto('/Forms/AddAddress');
  }
  async fillStreetAddressField(name: string) {
    await this.streetAddressInput.fill(name);
  }
  async fillCityField(name: string) {
    await this.cityInput.fill(name);
  }
  async fillStateField(name: string) {
    await this.stateInput.fill(name);
  }
  async fillZipCodeField(name: string) {
    await this.zipCodeInput.fill(name);
  }
  async clickCreateButton() {
    await this.createButton.click();
  }
  getStreetAddressError() {
    return this.streetAddressError;
  }
  getCityError() {
    return this.cityError;
  }
  getStateError() {
    return this.stateError;
  }
  getZipCodeError() {
    return this.zipCodeError;
  }
  getDeleteButtonByStreet(streetName: string) {
    return this.page
      .locator(`tr:has-text("${streetName}")`)
      .getByTestId('button-Delete');
  }
  async acceptDeleteClick() {
    await this.acceptDelete.click();
  }
}
