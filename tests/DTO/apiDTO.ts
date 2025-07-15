import { GenderAPIEnum } from '../Enums/enumAPI';

export interface UserAPIDTO {
  gender?: GenderAPIEnum;
  Name?: string;
  YearOfBirth?: number;
}

export interface UserResponseDTO {
  id: string;
  name: string;
  yearOfBirth: number;
  gender: number;
  created: string;
}
