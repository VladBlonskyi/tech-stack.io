import { test } from '@playwright/test';
import {
  validAddressData,
  invalidAddressData,
} from '../../TestData/addAddressData';
import { AddAddressSteps } from '../../Steps/addAddressSteps';

let addAddressSteps: AddAddressSteps;

test.beforeEach(async ({ page }) => {
  addAddressSteps = new AddAddressSteps(page);
  await addAddressSteps.addAddressOpen();
});

test.describe('Add Address Positive Scenario', () => {
  for (const data of validAddressData) {
    test(`Check that Address can be added: ${data.streetAddress}`, async () => {
      await addAddressSteps.fillAddressForm(data);
      await addAddressSteps.deleteAddedAddress(data.streetAddress);
    });
  }
});

test.describe('Add Address Negative Scenario', () => {
  for (const data of invalidAddressData) {
    test(`Check that field ${data.expectedErrorField} is required`, async () => {
      await addAddressSteps.fillAddressForm(data);
      await addAddressSteps.checkExpectedError(
        data.expectedErrorField,
        data.expectedErrorText
      );
    });
  }
});
