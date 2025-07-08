import { test, expect } from '@playwright/test';
import { TestUsersAPI } from './DTOAPI/testDataApi';

let createdUserId: string;

test.beforeAll(async ({ request }) => {
  const response = await request.post('/api/User', {
    data: TestUsersAPI.MALE_ADULT,
  });

  const user = await response.json();
  createdUserId = user.id;
});
test.afterAll(async ({ request }) => {
  await request.delete(`/api/User/${createdUserId}`);
});

test.describe('Full user flow scenario', () => {
  test('Get info about user', async ({ request }) => {
    const response = await request.get(`/api/User/${createdUserId}`);

    const user = await response.json();
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });

  test('Update user', async ({ request }) => {
    const response = await request.put(`/api/User/${createdUserId}`, {
      data: TestUsersAPI.FEMALE_ADULT,
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const user = await response.json();

    expect(user.name).toBe(TestUsersAPI.FEMALE_ADULT.Name);
    expect(user.yearOfBirth).toBe(TestUsersAPI.FEMALE_ADULT.YearOfBirth);
    expect(user.gender).toBe(TestUsersAPI.FEMALE_ADULT.gender);
  });

  test('GET info about all users', async ({ request }) => {
    const response = await request.get('/api/User');

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const users = await response.json();

    expect(Array.isArray(users)).toBe(true);
  });
});
