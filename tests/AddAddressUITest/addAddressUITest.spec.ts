import { test, expect, Page } from '@playwright/test';
import { AddAddressPOM } from './POM/addAddressPOM';
import { validTestData, invalidTestData } from './TestData/testDataAdress';

test.describe('Add Address Positive Scenario', () => {
  let addAddressPOM: AddAddressPOM;

  test.beforeEach(async ({ page }) => {
    addAddressPOM = new AddAddressPOM(page);
    await addAddressPOM.addAddressPageOpen();
  });
  test.afterEach(async ({ page }) => {
    await page.goto('/');
    await addAddressPOM.deleteAddress();
  });

  for (const data of validTestData) {
    test(`Add address: ${data.streetAddress}`, async ({}) => {
      await addAddressPOM.fillAddressForm(data);
    });
  }
});

test.describe('Add Address Negative Scenario', () => {
  let addAddressPOM: AddAddressPOM;

  test.beforeEach(async ({ page }) => {
    addAddressPOM = new AddAddressPOM(page);
    await addAddressPOM.addAddressPageOpen();
  });

  for (const data of invalidTestData) {
    test(`Negative Test: missing ${data.expectedErrorField}`, async () => {
      await addAddressPOM.fillAddressForm(data);

      if (data.expectedErrorField === 'streetAddress') {
        expect(await addAddressPOM.getStreetAddressError()).toBe(
          data.expectedErrorText
        );
      }
      if (data.expectedErrorField === 'city') {
        expect(await addAddressPOM.getCityError()).toBe(data.expectedErrorText);
      }
      if (data.expectedErrorField === 'state') {
        expect(await addAddressPOM.getStateError()).toBe(
          data.expectedErrorText
        );
      }
      if (data.expectedErrorField === 'zipCode') {
        expect(await addAddressPOM.getZipCodeError()).toBe(
          data.expectedErrorText
        );
      }
    });
  }
});
