import { APIRequestContext } from '@playwright/test';
import { UserDTO } from '../DTO/userDTO';
import { UserFactory } from '../Factory/userFactory';

export class UserApiSteps {
  readonly request: APIRequestContext;
  createdUser: UserDTO;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createUser() {
    const userMale = UserFactory.createNewUser('Male_Gender');
    const response = await this.request.post('/api/User', { data: userMale });
    this.createdUser = await response.json();
    return response;
  }

  async deleteUser() {
    return await this.request.delete(`/api/User/${this.createdUser.id}`);
  }

  async getUserInfo() {
    return await this.request.get(`/api/User/${this.createdUser.id}`);
  }

  async updateUser() {
    const userFemale = UserFactory.createNewUser('Female_Gender');
    return await this.request.put(`/api/User/${this.createdUser.id}`, {
      data: userFemale,
    });
  }

  async getAllUsers() {
    return await this.request.get('/api/User');
  }
}
