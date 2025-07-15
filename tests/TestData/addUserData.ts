import { UserGenderDTO, UserInvalidDTO } from '../DTO/addUserDTO';
import { GenderUIEnum } from '../Enums/enumAddUser';
import 'dotenv/config';

export const TestUsersData = {
  MALE_ADULT: {
    gender: GenderUIEnum.Male,
    name: process.env.MALE_ADULT_Name,
    year: Number(process.env.MALE_ADULT_YEAR),
  } as UserGenderDTO,

  FEMALE_ADULT: {
    gender: GenderUIEnum.Female,
    name: process.env.FEMALE_ADULT_Name,
    year: Number(process.env.FEMALE_ADULT_YEAR),
  } as UserGenderDTO,

  UNDEFINED_GENDER: {
    gender: GenderUIEnum.Undefined,
    name: process.env.UNDEFINED_GENDER_Name,
    year: Number(process.env.UNDEFINED_GENDER_YEAR),
  } as UserGenderDTO,

  NOT_ADULT: {
    gender: GenderUIEnum.Male,
    name: process.env.NOT_ADULT_Name,
    year: Number(process.env.NOT_ADULT_YEAR),
  } as UserGenderDTO,

  WITHOUT_NAME: {
    gender: GenderUIEnum.Male,
    year: Number(process.env.MALE_ADULT_YEAR),
  } as UserInvalidDTO,

  WITHOUT_YEAR: {
    gender: GenderUIEnum.Male,
    name: process.env.MALE_ADULT_Name,
  } as UserInvalidDTO,
};
