import { GenderEnum } from '../Enums/enumGender';
import { UserDTO } from '../DTO/userDTO';
import 'dotenv/config';

export class UserApiFactory {
  static createNewApiUser(type: string): UserDTO {
    switch (type) {
      case 'Male_User':
        return {
          gender: GenderEnum.Male,
          name: process.env.MALE_ADULT_NAME!,
          yearOfBirth: Number(process.env.MALE_ADULT_YEAR),
        };
      case 'Female_User':
        return {
          gender: GenderEnum.Female,
          name: process.env.FEMALE_ADULT_NAME!,
          yearOfBirth: Number(process.env.FEMALE_ADULT_YEAR),
        };
      default:
        throw new Error(`Unknown person: ${type}`);
    }
  }
}
