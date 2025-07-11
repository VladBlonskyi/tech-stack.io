import { AddAddressDTO, AddAddressNegativeTestDTO } from '../DTO/addAddressDTO';

export const validTestData: AddAddressDTO[] = [
  {
    streetAddress: 'Bylachovskogo',
    city: 'Kyiv',
    state: 'Kyiv',
    zipCode: '30209',
  },
  {
    streetAddress: 'Peremoga',
    city: 'Lviv',
    state: 'Lviv',
    zipCode: '10239',
  },
];
export const invalidTestData: AddAddressNegativeTestDTO[] = [
  {
    streetAddress: '',
    city: 'Kyiv',
    state: 'Kyiv',
    zipCode: '70209',
    expectedErrorField: 'streetAddress',
    expectedErrorText: 'Street Address is required',
  },
  {
    streetAddress: 'Bylachovskogo',
    city: '',
    state: 'Kyiv',
    zipCode: '30209',
    expectedErrorField: 'city',
    expectedErrorText: 'City is required',
  },
  {
    streetAddress: 'Bylachovskogo',
    city: 'Kyiv',
    state: '',
    zipCode: '50209',
    expectedErrorField: 'state',
    expectedErrorText: 'State is required',
  },
  {
    streetAddress: 'Bylachovskogo',
    city: 'Kyiv',
    state: 'Kyiv',
    zipCode: '',
    expectedErrorField: 'zipCode',
    expectedErrorText: 'Zip Code is required',
  },
];
