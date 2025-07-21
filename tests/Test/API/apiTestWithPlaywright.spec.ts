import { test, expect } from '@playwright/test';
import { UserDTO } from '../../DTO/userDTO';
import { UserFactory } from '../../Factory/userFactory';

test.describe('Full user flow scenario', () => {
  let createdUser: UserDTO;

  test.beforeEach(async ({ request }) => {
    const userMale = UserFactory.createNewUser('Male_Gender');
    const response = await request.post('/api/User', {
      data: userMale,
    });

    createdUser = await response.json();
  });

  test.afterEach(async ({ request }) => {
    await request.delete(`/api/User/${createdUser.id}`);
  });

  test('Get info about user', async ({ request }) => {
    const response = await request.get(`/api/User/${createdUser.id}`);
    const user: UserDTO = await response.json();

    expect(response.status()).toBe(200);
    expect(user.id).toBe(createdUser.id);
    expect(user.name).toBe(createdUser.name);
    expect(user.yearOfBirth).toBe(createdUser.yearOfBirth);
    expect(user.gender).toBe(createdUser.gender);
    expect(user.created).toBe(createdUser.created);
  });

  test('Update user', async ({ request }) => {
    const userFemale = UserFactory.createNewUser('Female_Gender');
    const response = await request.put(`/api/User/${createdUser.id}`, {
      data: userFemale,
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const user: UserDTO = await response.json();

    expect(user.name).toBe(userFemale.name);
    expect(user.yearOfBirth).toBe(userFemale.yearOfBirth);
    expect(user.gender).toBe(userFemale.gender);
  });

  test('GET info about all users', async ({ request }) => {
    const response = await request.get('/api/User');

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const users: UserDTO[] = await response.json();

    expect(Array.isArray(users)).toBe(true);

    const foundUser = users.find((user) => user.id === createdUser.id);

    expect(foundUser).toBeTruthy();
    expect(foundUser!.name).toBe(createdUser.name);
    expect(foundUser!.yearOfBirth).toBe(createdUser.yearOfBirth);
    expect(foundUser!.gender).toBe(createdUser.gender);
  });
});
