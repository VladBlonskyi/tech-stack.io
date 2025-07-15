import { UserGenderDTO, UserInvalidDTO } from '../DTO/addUserDTO';
import { GenderUIEnum } from '../Enums/enumAddUser';
import 'dotenv/config';

export const TestUsersData = {
  MALE_ADULT: {
    gender: GenderUIEnum.Male,
    name: process.env.name1,
    year: Number(process.env.year1),
  } as UserGenderDTO,

  FEMALE_ADULT: {
    gender: GenderUIEnum.Female,
    name: process.env.name2,
    year: Number(process.env.year2),
  } as UserGenderDTO,

  UNDEFINED_GENDER: {
    gender: GenderUIEnum.Undefined,
    name: process.env.name3,
    year: Number(process.env.year3),
  } as UserGenderDTO,

  NOT_ADULT: {
    gender: GenderUIEnum.Male,
    name: process.env.name4,
    year: Number(process.env.year4),
  } as UserGenderDTO,

  WITHOUT_NAME: {
    gender: GenderUIEnum.Male,
    year: Number(process.env.year1),
  } as UserInvalidDTO,

  WITHOUT_YEAR: {
    gender: GenderUIEnum.Male,
    name: process.env.name1,
  } as UserInvalidDTO,
};
