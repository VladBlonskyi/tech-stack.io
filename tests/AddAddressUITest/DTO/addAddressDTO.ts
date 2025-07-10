export interface AddAddressDTO {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface AddAddressNegativeTestDTO extends AddAddressDTO {
  expectedErrorField: 'streetAddress' | 'city' | 'state' | 'zipCode';
  expectedErrorText: string;
}
