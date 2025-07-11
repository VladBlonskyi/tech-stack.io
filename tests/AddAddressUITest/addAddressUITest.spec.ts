import { test } from '@playwright/test';
import { validTestData, invalidTestData } from './TestData/testDataAdress';
import { AddAddressSteps } from './Steps/addAddresssteps';

let addAddressSteps: AddAddressSteps;

test.beforeEach(async ({ page }) => {
  addAddressSteps = new AddAddressSteps(page);
  await addAddressSteps.addAddressOpen();
});

test.describe('Add Address Positive Scenario', () => {
  for (const data of validTestData) {
    test(`Check that Address can be added: ${data.streetAddress}`, async () => {
      await addAddressSteps.fillAddressForm(data);
      await addAddressSteps.deleteAddedAddress(data.streetAddress);
    });
  }
});

test.describe('Add Address Negative Scenario', () => {
  for (const data of invalidTestData) {
    test(`Check that field ${data.expectedErrorField} is required`, async () => {
      await addAddressSteps.fillAddressForm(data);
      await addAddressSteps.checkExpectedError(
        data.expectedErrorField,
        data.expectedErrorText
      );
    });
  }
});
