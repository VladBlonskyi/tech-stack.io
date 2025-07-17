import { GenderAPIEnum } from '../Enums/enumAPI';

export class UserAPIDTO {
  gender: GenderAPIEnum;
  Name: string;
  YearOfBirth: number;
}

export class UserResponseDTO {
  id: string;
  name: string;
  yearOfBirth: number;
  gender: number;
  created: string;
}
