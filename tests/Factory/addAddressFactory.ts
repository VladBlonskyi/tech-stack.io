import { AddAddressDTO } from '../DTO/addAddressDTO';

export class AddAddressFactory {
  static createNewAddress(city: string): AddAddressDTO {
    switch (city) {
      case 'Kyiv':
        return {
          streetAddress: 'Bylachovskogo',
          city: 'Kyiv',
          state: 'KV',
          zipCode: '03164',
        };
      case 'Lviv':
        return {
          streetAddress: 'Peremogy',
          city: 'Lviv',
          state: 'LV',
          zipCode: '15756',
        };
      default:
        throw new Error(`Unknown city: ${city}`);
    }
  }
  static createNewAddressUSA(): AddAddressDTO {
    return {
      streetAddress: 'Union',
      city: 'Washington',
      state: 'WH',
      zipCode: '15756',
    };
  }

  static createInvalidAddress(): AddAddressDTO {
    return {
      streetAddress: '',
      city: 'Kyiv',
      state: 'Kyiv',
      zipCode: '03164',
      expectedErrorField: 'streetAddress',
      expectedErrorText: 'Street Address is required',
    };
  }
  static createInvalidCity(): AddAddressDTO {
    return {
      streetAddress: 'Bylachovskogo',
      city: '',
      state: 'Kyiv',
      zipCode: '03164',
      expectedErrorField: 'city',
      expectedErrorText: 'City is required',
    };
  }
  static createInvalidState(): AddAddressDTO {
    return {
      streetAddress: 'Bylachovskogo',
      city: 'Kyiv',
      state: '',
      zipCode: '03164',
      expectedErrorField: 'state',
      expectedErrorText: 'State is required',
    };
  }
  static createInvalidzipCode(): AddAddressDTO {
    return {
      streetAddress: 'Bylachovskogo',
      city: 'Kyiv',
      state: 'Kyiv',
      zipCode: '',
      expectedErrorField: 'zipCode',
      expectedErrorText: 'Zip Code is required',
    };
  }
}
