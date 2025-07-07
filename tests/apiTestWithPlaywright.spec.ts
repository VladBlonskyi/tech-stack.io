import { test, expect } from '@playwright/test';

let createdUserId: string;

test.beforeAll(async ({ request }) => {
  const response = await request.post('/api/User', {
    data: {
      name: 'VlaDick',
      yearOfBirth: 1995,
      gender: 1,
    },
  });

  const user = await response.json();
  createdUserId = user.id;
});

test.describe('Full user flow scenario', () => {
  test('Get info about user', async ({ request }) => {
    const response = await request.get(`/api/User/${createdUserId}`);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const user = await response.json();
    console.log(user);
  });

  test('GET info about all users', async ({ request }) => {
    const response = await request.get('/api/User');

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const users = await response.json();
    console.log(users);

    expect(Array.isArray(users)).toBe(true);
  });

  test('Update user', async ({ request }) => {
    const response = await request.put(`/api/User/${createdUserId}`, {
      data: {
        name: 'Susana',
        yearOfBirth: 2000,
        gender: 2,
      },
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const user = await response.json();

    expect(user.name).toBe('Susana');
    expect(user.yearOfBirth).toBe(2000);
    expect(user.gender).toBe(2);
  });

  test('Delete user', async ({ request }) => {
    const response = await request.delete(`/api/User/${createdUserId}`);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });
});
