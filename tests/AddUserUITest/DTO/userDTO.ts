import { Gender } from '../Enums/enums';

export interface UserDTO {
  gender: Gender;
  name: string;
  year: number;
}

export interface UserDTOInvalid {
  gender?: Gender;
  name?: string;
  year?: number;
}
