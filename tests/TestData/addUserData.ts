import { UserGenderDTO, UserInvalidDTO } from '../DTO/addUserDTO';
import { GenderUIEnum } from '../Enums/enumAddUser';

export const TestUsersData = {
  MALE_ADULT: {
    gender: GenderUIEnum.Male,
    name: 'Vladick',
    year: 1995,
  } as UserGenderDTO,

  FEMALE_ADULT: {
    gender: GenderUIEnum.Female,
    name: 'Susana',
    year: 2000,
  } as UserGenderDTO,

  UNDEFINED_GENDER: {
    gender: GenderUIEnum.Undefined,
    name: 'Rockstar',
    year: 1945,
  } as UserGenderDTO,

  WITHOUT_NAME: {
    gender: GenderUIEnum.Male,
    year: 1995,
  } as UserInvalidDTO,

  WITHOUT_YEAR: {
    gender: GenderUIEnum.Male,
    name: 'Vladick',
  } as UserInvalidDTO,

  NOT_ADULT: {
    gender: GenderUIEnum.Male,
    name: 'Vladick',
    year: 2015,
  } as UserGenderDTO,
};
