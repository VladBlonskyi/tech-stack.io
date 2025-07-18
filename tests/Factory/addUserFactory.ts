import { AddUserDTO, AddUserInvalidDTO } from '../DTO/addUserDTO';
import { GenderUIEnum } from '../Enums/enumAddUser';

export class UserUiFactory {
  static createNewUser(
    gender: GenderUIEnum,
    name: string,
    year: number
  ): AddUserDTO {
    return {
      gender,
      name,
      year,
    };
  }
  static createNewInvalidUser(
    gender: GenderUIEnum,
    name: string,
    year: number
  ): AddUserInvalidDTO {
    return {
      gender,
      name,
      year,
    };
  }
}
