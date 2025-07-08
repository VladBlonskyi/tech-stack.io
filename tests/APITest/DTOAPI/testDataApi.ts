import { GenderAPI } from '../EnumAPI/enumAPI';
import { UserDTOAPI } from './dtoAPI';

export const TestUsersAPI = {
  MALE_ADULT: {
    gender: GenderAPI.Male,
    Name: 'Vladick',
    YearOfBirth: 1995,
  } as UserDTOAPI,

  FEMALE_ADULT: {
    gender: GenderAPI.Female,
    Name: 'Susana',
    YearOfBirth: 2000,
  } as UserDTOAPI,
};
