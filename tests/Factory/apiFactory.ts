import { GenderAPIEnum } from '../Enums/enumAPI';
import { UserAPIDTO } from '../DTO/apiDTO';

export class UserApiFactory {
  static createNewApiUser(type: string): UserAPIDTO {
    switch (type) {
      case 'Male_User':
        return {
          gender: GenderAPIEnum.Male,
          name: 'Vladick',
          yearOfBirth: 1995,
        };
      case 'Female_User':
        return {
          gender: GenderAPIEnum.Female,
          name: 'Susana',
          yearOfBirth: 2000,
        };
      default:
        throw new Error(`Unknown person: ${type}`);
    }
  }
}
