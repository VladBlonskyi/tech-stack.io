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
    AddAddressFactory.createNewAddress(
      'Bylachovskogo',
      'Kyiv',
      'Kyiv',
      '03164'
    ),
    AddAddressFactory.createNewAddress('Peremoga', 'Lviv', 'Lviv', '10239'),
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
    AddAddressFactory.createInvalidAddress(
      '',
      'Kyiv',
      'Kyiv',
      '03164',
      'streetAddress',
      'Street Address is required'
    ),
    AddAddressFactory.createInvalidAddress(
      'Bylachovskogo',
      '',
      'Kyiv',
      '30209',
      'city',
      'City is required'
    ),
    AddAddressFactory.createInvalidAddress(
      'Bylachovskogo',
      'Kyiv',
      '',
      '50209',
      'state',
      'State is required'
    ),
    AddAddressFactory.createInvalidAddress(
      'Bylachovskogo',
      'Kyiv',
      'Kyiv',
      '',
      'zipCode',
      'Zip Code is required'
    ),
  ];
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
