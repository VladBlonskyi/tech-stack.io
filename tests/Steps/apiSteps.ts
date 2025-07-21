import { APIRequestContext, expect } from '@playwright/test';
import { UserDTO } from '../DTO/userDTO';
import { UserFactory } from '../Factory/userFactory';

export class UserApiSteps {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  createdUser: UserDTO;

  async createUser() {
    const userMale = UserFactory.createNewUser('Male_Gender');
    const response = await this.request.post('/api/User', {
      data: userMale,
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    this.createdUser = await response.json();
    return this.createdUser;
  }

  async deleteUser() {
    await this.request.delete(`/api/User/${this.createdUser.id}`);
  }

  async getUserInfo() {
    const response = await this.request.get(`/api/User/${this.createdUser.id}`);
    const user: UserDTO = await response.json();

    expect(response.status()).toBe(200);
    expect(user.id).toBe(this.createdUser.id);
    expect(user.name).toBe(this.createdUser.name);
    expect(user.yearOfBirth).toBe(this.createdUser.yearOfBirth);
    expect(user.gender).toBe(this.createdUser.gender);
    expect(user.created).toBe(this.createdUser.created);
  }

  async updateUser() {
    const userFemale = UserFactory.createNewUser('Female_Gender');
    const response = await this.request.put(
      `/api/User/${this.createdUser.id}`,
      {
        data: userFemale,
      }
    );
    const user: UserDTO = await response.json();

    expect(response.status()).toBe(200);
    expect(user.name).toBe(userFemale.name);
    expect(user.yearOfBirth).toBe(userFemale.yearOfBirth);
    expect(user.gender).toBe(userFemale.gender);
  }

  async getInfoAboutUsers() {
    const response = await this.request.get('/api/User');

    expect(response.status()).toBe(200);
    const users: UserDTO[] = await response.json();
    const foundUser = users.find((user) => user.id === this.createdUser.id);

    expect(Array.isArray(users)).toBe(true);

    expect(foundUser).toBeTruthy();
    expect(foundUser!.name).toBe(this.createdUser.name);
    expect(foundUser!.yearOfBirth).toBe(this.createdUser.yearOfBirth);
    expect(foundUser!.gender).toBe(this.createdUser.gender);
  }
}
