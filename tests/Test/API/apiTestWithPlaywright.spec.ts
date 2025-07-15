import { test, expect } from '@playwright/test';
import { UserResponseDTO } from '../../DTO/apiDTO';
import { TestUsersAPI } from '../../TestData/apiData';

test.describe('Full user flow scenario', () => {
  let createdUser: UserResponseDTO;

  test.beforeEach(async ({ request }) => {
    const response = await request.post('/api/User', {
      data: TestUsersAPI.MALE_ADULT,
    });

    createdUser = await response.json();
  });

  test.afterEach(async ({ request }) => {
    await request.delete(`/api/User/${createdUser.id}`);
  });

  test('Get info about user', async ({ request }) => {
    const response = await request.get(`/api/User/${createdUser.id}`);
    const user: UserResponseDTO = await response.json();

    expect(response.status()).toBe(200);
    expect(user.id).toBe(createdUser.id);
    expect(user.name).toBe(createdUser.name);
    expect(user.yearOfBirth).toBe(createdUser.yearOfBirth);
    expect(user.gender).toBe(createdUser.gender);
    expect(user.created).toBe(createdUser.created);
  });

  test('Update user', async ({ request }) => {
    const response = await request.put(`/api/User/${createdUser.id}`, {
      data: TestUsersAPI.FEMALE_ADULT,
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const user: UserResponseDTO = await response.json();

    expect(user.name).toBe(TestUsersAPI.FEMALE_ADULT.Name);
    expect(user.yearOfBirth).toBe(TestUsersAPI.FEMALE_ADULT.YearOfBirth);
    expect(user.gender).toBe(TestUsersAPI.FEMALE_ADULT.gender);
  });

  test('GET info about all users', async ({ request }) => {
    const response = await request.get('/api/User');

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const users: UserResponseDTO[] = await response.json();

    expect(Array.isArray(users)).toBe(true);

    const foundUser = users.find((user) => user.id === createdUser.id);

    expect(foundUser).toBeTruthy();
    expect(foundUser!.name).toBe(createdUser.name);
    expect(foundUser!.yearOfBirth).toBe(createdUser.yearOfBirth);
    expect(foundUser!.gender).toBe(createdUser.gender);
  });
});
