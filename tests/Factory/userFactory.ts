import { UserDTO } from '../DTO/userDTO';
import { GenderEnum } from '../Enums/enumGender';
import 'dotenv/config';

export class UserFactory {
  static createNewUser(type: string): UserDTO {
    switch (type) {
      case 'Male_Gender':
        return {
          gender: GenderEnum.Male,
          name: process.env.MALE_ADULT_NAME!,
          yearOfBirth: Number(process.env.MALE_ADULT_YEAR),
        };
      case 'Female_Gender':
        return {
          gender: GenderEnum.Female,
          name: process.env.FEMALE_ADULT_NAME!,
          yearOfBirth: Number(process.env.FEMALE_ADULT_YEAR),
        };
      case 'Undefined_Gender':
        return {
          gender: GenderEnum.Undefined,
          name: process.env.UNDEFINED_GENDER_NAME!,
          yearOfBirth: Number(process.env.UNDEFINED_GENDER_YEAR),
        };
      case 'Without_Name':
        return {
          gender: GenderEnum.Female,
          name: '',
          yearOfBirth: Number(process.env.FEMALE_ADULT_YEAR),
        };
      case 'Without_Year':
        return {
          gender: GenderEnum.Undefined,
          name: process.env.UNDEFINED_GENDER_NAME!,
          yearOfBirth: Number(''),
        };
      case 'Not_Adult':
        return {
          gender: GenderEnum.Male,
          name: process.env.NOT_ADULT_NAME!,
          yearOfBirth: Number(process.env.NOT_ADULT_YEAR),
        };
      default:
        throw new Error(`Unknown person: ${type}`);
    }
  }
}
