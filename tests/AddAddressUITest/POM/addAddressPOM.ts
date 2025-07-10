import { Page, Locator, expect } from '@playwright/test';
import { AddAddressDTO } from '../DTO/addAddressDTO';

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
  readonly deleteFirstAddress: Locator;
  readonly deleteSecondAddress: Locator;
  readonly acceptDelete: Locator;

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
    this.deleteFirstAddress = page
      .locator('tr:has-text("Bylachovskogo")')
      .getByTestId('button-Delete');
    this.deleteSecondAddress = page
      .locator('tr:has-text("Peremoga")')
      .getByTestId('button-Delete');
    this.acceptDelete = page.getByTestId('button-Yes');
  }
  async addAddressPageOpen() {
    await this.page.goto('/Forms/AddAddress');
  }
  async fillAddressForm(address: AddAddressDTO) {
    await this.streetAddressInput.fill(address.streetAddress);
    await this.cityInput.fill(address.city);
    await this.stateInput.fill(address.state);
    await this.zipCodeInput.fill(address.zipCode);
    await this.createButton.click();
  }
  async deleteAddress() {
    if (await this.deleteFirstAddress.isVisible()) {
      await this.deleteFirstAddress.click();
      await this.acceptDelete.click();
    }
    if (await this.deleteSecondAddress.isVisible()) {
      await this.deleteSecondAddress.click();
      await this.acceptDelete.click();
    }
  }
  async getStreetAddressError() {
    await expect(this.streetAddressError).toHaveText(
      'Street Address is required'
    );
  }
  async getCityError() {
    await expect(this.cityError).toHaveText('City is required');
  }
  async getStateError() {
    await expect(this.stateError).toHaveText('State is required');
  }
  async getZipCodeError() {
    await expect(this.zipCodeError).toHaveText('Zip Code is required');
  }

  async checkExpectedError(field: string, expectedText: string) {
    switch (field) {
      case 'streetAddress':
        await expect(this.streetAddressError).toHaveText(expectedText);
        break;
      case 'city':
        await expect(this.cityError).toHaveText(expectedText);
        break;
      case 'state':
        await expect(this.stateError).toHaveText(expectedText);
        break;
      case 'zipCode':
        await expect(this.zipCodeError).toHaveText(expectedText);
        break;
      default:
        throw new Error(`Unknown field: ${field}`);
    }
  }
}
