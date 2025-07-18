import { GenderUIEnum } from '../Enums/enumAddUser';

export class AddUserDTO {
  gender: GenderUIEnum;
  name: string;
  year: number;
}

export class AddUserInvalidDTO {
  gender?: GenderUIEnum;
  name?: string;
  year?: number;
}
