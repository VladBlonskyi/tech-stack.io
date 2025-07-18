import { test } from '@playwright/test';
import { AddAddressSteps } from '../../Steps/addAddressSteps';
import { AddAddressFactory } from '../../Factory/addAddressFactory';

let addAddressSteps: AddAddressSteps;

test.beforeEach(async ({ page }) => {
  addAddressSteps = new AddAddressSteps(page);
  await addAddressSteps.addAddressOpen();
});

test.describe('Add Address Positive Scenario', () => {
  const validAddressData = [
    AddAddressFactory.createNewAddress('Kyiv'),
    AddAddressFactory.createNewAddress('Lviv'),
  ];

  validAddressData.forEach((data) => {
    test(`Check that Address can be added: ${data.streetAddress}`, async () => {
      await addAddressSteps.fillAddressForm(data);
      await addAddressSteps.deleteAddedAddress(data.streetAddress);
    });
  });
});

test.describe('Add Address Negative Scenario', () => {
  const invalidAddressData = [
    AddAddressFactory.createInvalidAddress(),
    AddAddressFactory.createInvalidCity(),
    AddAddressFactory.createInvalidState(),
    AddAddressFactory.createInvalidzipCode(),
  ];
  for (const data of invalidAddressData) {
    test(`Check that field ${data.expectedErrorField} is required`, async () => {
      await addAddressSteps.fillAddressForm(data);
      await addAddressSteps.checkExpectedError(
        data.expectedErrorField!,
        data.expectedErrorText!
      );
    });
  }
});
