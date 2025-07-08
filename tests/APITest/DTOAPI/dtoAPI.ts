import { GenderAPI } from '../EnumAPI/enumAPI';

export interface UserDTOAPI {
  gender?: GenderAPI;
  Name?: string;
  YearOfBirth?: number;
}
