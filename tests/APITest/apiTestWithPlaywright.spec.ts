import { test, expect } from '@playwright/test';
import { TestUsersAPI } from './DTOAPI/testDataApi';
import { UserDTOResponse } from './DTOAPI/dtoAPIResponse';

test.describe('Full user flow scenario', () => {
  let createdUser: UserDTOResponse;

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
    const user: UserDTOResponse = await response.json();

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
    const user: UserDTOResponse = await response.json();

    expect(user.name).toBe(TestUsersAPI.FEMALE_ADULT.Name);
    expect(user.yearOfBirth).toBe(TestUsersAPI.FEMALE_ADULT.YearOfBirth);
    expect(user.gender).toBe(TestUsersAPI.FEMALE_ADULT.gender);
  });

  test('GET info about all users', async ({ request }) => {
    const response = await request.get('/api/User');

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const users: UserDTOResponse[] = await response.json();

    expect(Array.isArray(users)).toBe(true);

    const foundUser = users.find((user) => user.id === createdUser.id);

    expect(foundUser).toBeTruthy();
    expect(foundUser!.name).toBe(createdUser.name);
    expect(foundUser!.yearOfBirth).toBe(createdUser.yearOfBirth);
    expect(foundUser!.gender).toBe(createdUser.gender);
  });
});
