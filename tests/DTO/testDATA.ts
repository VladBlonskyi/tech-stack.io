import { UserDTO } from './userDTO';
import { Gender } from '../enums/enums';

export const TestUsers = {
  MALE_ADULT: {
    gender: Gender.Male,
    name: 'Vladick',
    year: 1995,
  } as UserDTO,

  FEMALE_ADULT: {
    gender: Gender.Female,
    name: 'Susana',
    year: 2000,
  } as UserDTO,

  UNDEFINED_GENDER: {
    gender: Gender.Undefined,
    name: 'Rockstar',
    year: 1945,
  } as UserDTO,

  WITHOUT_NAME: {
    gender: Gender.Male,
    name: undefined,
    year: 1995,
  } as UserDTO,

  WITHOUT_YEAR: {
    gender: Gender.Male,
    name: 'Vladick',
    year: undefined,
  } as UserDTO,

  NOT_ADULT: {
    gender: Gender.Male,
    name: 'Vladick',
    year: 2015,
  } as UserDTO,
};
