import { GenderAPIEnum } from '../Enums/enumAPI';

export class UserAPIDTO {
  id?: string;
  gender: GenderAPIEnum;
  name: string;
  yearOfBirth: number;
  created?: string;
}
