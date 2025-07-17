export class AddAddressDTO {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}

export class AddAddressNegativeDTO extends AddAddressDTO {
  expectedErrorField!: 'streetAddress' | 'city' | 'state' | 'zipCode';
  expectedErrorText!: string;
}
