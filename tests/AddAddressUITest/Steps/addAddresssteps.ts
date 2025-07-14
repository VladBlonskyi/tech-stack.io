import { Page, expect } from '@playwright/test';
import { AddAddressDTO } from '../DTO/addAddressDTO';
import { AddAddressPOM } from '../POM/addAddressPOM';

export class AddAddressSteps {
  AddAddressPOM: AddAddressPOM;

  constructor(page: Page) {
    this.AddAddressPOM = new AddAddressPOM(page);
  }

  async addAddressOpen() {
    await this.AddAddressPOM.addAddressPageOpen();
    await this.AddAddressPOM.addAddressPageLocator.waitFor({
      state: 'visible',
    });
  }
  async fillAddressForm(address: AddAddressDTO) {
    await this.AddAddressPOM.fillStreetAddressField(address.streetAddress);
    await this.AddAddressPOM.fillCityField(address.city);
    await this.AddAddressPOM.fillStateField(address.state);
    await this.AddAddressPOM.fillZipCodeField(address.zipCode);
    await this.AddAddressPOM.clickCreateButton();
  }
  async checkExpectedError(field: string, expectedText: string) {
    switch (field) {
      case 'streetAddress':
        await expect(this.AddAddressPOM.getStreetAddressError()).toHaveText(
          expectedText
        );
        break;
      case 'city':
        await expect(this.AddAddressPOM.getCityError()).toHaveText(
          expectedText
        );
        break;
      case 'state':
        await expect(this.AddAddressPOM.getStateError()).toHaveText(
          expectedText
        );
        break;
      case 'zipCode':
        await expect(this.AddAddressPOM.getZipCodeError()).toHaveText(
          expectedText
        );
        break;
      default:
        throw new Error(`Unknown field: ${field}`);
    }
  }
  async deleteAddedAddress(streetName: string) {
    const deleteButton = this.AddAddressPOM.getDeleteButtonByStreet(streetName);
    if (await deleteButton.isVisible()) {
      await deleteButton.click();
      await this.AddAddressPOM.acceptDeleteClick();
    }
  }
}
