import { GenderAPIEnum } from '../Enums/enumAPI';
import { UserAPIDTO } from '../DTO/apiDTO';

export class ApiFactory {
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
