import { GenderUIEnum } from '../Enums/enumAddUser';

export interface UserGenderDTO {
  gender: GenderUIEnum;
  name: string;
  year: number;
}

export interface UserInvalidDTO {
  gender?: GenderUIEnum;
  name?: string;
  year?: number;
}
