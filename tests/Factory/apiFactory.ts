import { GenderAPIEnum } from '../Enums/enumAPI';
import { UserAPIDTO } from '../DTO/apiDTO';

export class UserApiFactory {
  static createNewUserMale(Name: string, YearOfBirth: number): UserAPIDTO {
    return {
      gender: GenderAPIEnum.Male,
      Name,
      YearOfBirth,
    };
  }
  static createNewUserFemale(Name: string, YearOfBirth: number): UserAPIDTO {
    return {
      gender: GenderAPIEnum.Female,
      Name,
      YearOfBirth,
    };
  }
}
