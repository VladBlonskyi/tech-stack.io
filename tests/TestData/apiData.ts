import { GenderAPIEnum } from '../Enums/enumAPI';
import { UserAPIDTO } from '../DTO/apiDTO';

export const TestUsersAPI = {
  MALE_ADULT: {
    gender: GenderAPIEnum.Male,
    Name: 'Vladick',
    YearOfBirth: 1995,
  } as UserAPIDTO,

  FEMALE_ADULT: {
    gender: GenderAPIEnum.Female,
    Name: 'Susana',
    YearOfBirth: 2000,
  } as UserAPIDTO,
};
