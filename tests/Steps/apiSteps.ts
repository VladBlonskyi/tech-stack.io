import { APIRequestContext, APIResponse } from '@playwright/test';
import { UserDTO } from '../DTO/userDTO';
import { UserFactory } from '../Factory/userFactory';

export class UserApiSteps {
  readonly request: APIRequestContext;
  createdUser: UserDTO;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createUser(): Promise<UserDTO> {
    const userMale = UserFactory.createNewUser('Male_Gender');
    const response = await this.request.post('/api/User', { data: userMale });
    this.createdUser = await response.json();
    return this.createdUser;
  }

  async deleteUser(userId: string) {
    return await this.request.delete(`/api/User/${userId}`);
  }

  async getUserInfo(userId: string): Promise<APIResponse> {
    return await this.request.get(`/api/User/${userId}`);
  }

  async updateUser(userType: UserDTO): Promise<APIResponse> {
    return await this.request.put(`/api/User/${this.createdUser.id}`, {
      data: userType,
    });
  }

  async getAllUsers(): Promise<APIResponse> {
    return await this.request.get('/api/User');
  }
}
