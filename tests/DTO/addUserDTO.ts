import { GenderUIEnum } from '../Enums/enumAddUser';

export class UserGenderDTO {
  gender: GenderUIEnum;
  name: string;
  year: number;
}

export class UserInvalidDTO {
  gender?: GenderUIEnum;
  name?: string;
  year?: number;
}
