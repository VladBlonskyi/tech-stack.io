export interface AddAddressDTO {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  expectedErrorField?: 'streetAddress' | 'city' | 'state' | 'zipCode';
  expectedErrorText?: string;
}
