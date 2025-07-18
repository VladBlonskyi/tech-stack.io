import { AddAddressDTO, AddAddressNegativeDTO } from '../DTO/addAddressDTO';

export class AddAddressFactory {
  static createNewAddress(
    streetAddress: string,
    city: string,
    state: string,
    zipCode: string
  ): AddAddressDTO {
    return {
      streetAddress,
      city,
      state,
      zipCode,
    };
  }
  static createInvalidAddress(
    streetAddress: string,
    city: string,
    state: string,
    zipCode: string,
    expectedErrorField: 'streetAddress' | 'city' | 'state' | 'zipCode',
    expectedErrorText: string
  ): AddAddressNegativeDTO {
    return {
      streetAddress,
      city,
      state,
      zipCode,
      expectedErrorField,
      expectedErrorText,
    };
  }
}
