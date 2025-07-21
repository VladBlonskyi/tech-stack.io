import { test } from '@playwright/test';
import { AddAddressFactory } from '../../Factory/addAddressFactory';
import { AddAddressSteps } from '../../Steps/addAddressSteps';

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

  for (const data of validAddressData) {
    test(`Check that Address can be added: ${data.streetAddress}`, async () => {
      await addAddressSteps.fillAddressForm(data);
      await addAddressSteps.deleteAddedAddress(data.streetAddress);
    });
  }
});

test.describe('Add Address Negative Scenario', () => {
  const invalidAddressData = [
    {
      data: AddAddressFactory.createInvalidAddress(),
      expectedField: 'streetAddress',
      expectedText: 'Street Address is required',
    },
    {
      data: AddAddressFactory.createInvalidCity(),
      expectedField: 'city',
      expectedText: 'City is required',
    },
    {
      data: AddAddressFactory.createInvalidState(),
      expectedField: 'state',
      expectedText: 'State is required',
    },
    {
      data: AddAddressFactory.createInvalidzipCode(),
      expectedField: 'zipCode',
      expectedText: 'Zip Code is required',
    },
  ];

  for (const data of invalidAddressData) {
    test(`Check that field ${data.expectedField} is required`, async () => {
      await addAddressSteps.fillAddressForm(data.data);
      await addAddressSteps.checkExpectedError(
        data.expectedField,
        data.expectedText
      );
    });
  }
});
