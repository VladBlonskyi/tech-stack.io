import { AddUserDTO } from '../DTO/addUserDTO';
import { GenderUIEnum } from '../Enums/enumAddUser';
import 'dotenv/config';

export class UserUiFactory {
  static createNewUser(type: string): AddUserDTO {
    switch (type) {
      case 'Male_Gender':
        return {
          gender: GenderUIEnum.Male,
          name: process.env.MALE_ADULT_NAME,
          year: Number(process.env.MALE_ADULT_YEAR),
        };
      case 'Female_Gender':
        return {
          gender: GenderUIEnum.Female,
          name: process.env.FEMALE_ADULT_NAME,
          year: Number(process.env.FEMALE_ADULT_YEAR),
        };
      case 'Undefined_Gender':
        return {
          gender: GenderUIEnum.Undefined,
          name: process.env.UNDEFINED_GENDER_NAME,
          year: Number(process.env.UNDEFINED_GENDER_YEAR),
        };
      case 'Without_Name':
        return {
          gender: GenderUIEnum.Female,
          name: '',
          year: Number(process.env.FEMALE_ADULT_YEAR),
        };
      case 'Without_Year':
        return {
          gender: GenderUIEnum.Undefined,
          name: process.env.UNDEFINED_GENDER_NAME,
          year: Number(''),
        };
      case 'Not_Adult':
        return {
          gender: GenderUIEnum.Male,
          name: process.env.NOT_ADULT_NAME,
          year: Number(process.env.NOT_ADULT_YEAR),
        };
      default:
        throw new Error(`Unknown person: ${type}`);
    }
  }
}
