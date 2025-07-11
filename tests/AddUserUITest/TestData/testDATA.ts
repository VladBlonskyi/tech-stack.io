import { UserDTO, UserDTOInvalid } from '../DTO/userDTO';
import { Gender } from '../Enums/enums';

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
    year: 1995,
  } as UserDTOInvalid,

  WITHOUT_YEAR: {
    gender: Gender.Male,
    name: 'Vladick',
  } as UserDTOInvalid,

  NOT_ADULT: {
    gender: Gender.Male,
    name: 'Vladick',
    year: 2015,
  } as UserDTO,
};
