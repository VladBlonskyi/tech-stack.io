import { GenderEnum } from '../Enums/enumGender';

export class UserDTO {
  id?: string;
  gender: GenderEnum;
  name: string;
  yearOfBirth: number;
  created?: string;
}
