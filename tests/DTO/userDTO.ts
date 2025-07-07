import { Gender } from '../enums/enums';

export interface UserDTO {
  gender?: Gender;
  name?: string;
  year?: number;
}
