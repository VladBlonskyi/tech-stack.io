import { test, expect } from '@playwright/test';
import { UserApiSteps } from '../../Steps/apiSteps';
import { UserFactory } from '../../Factory/userFactory';
import { UserDTO } from '../../DTO/userDTO';

test.describe('Full user flow scenario', () => {
  let userSteps: UserApiSteps;

  test.beforeEach(async ({ request }) => {
    userSteps = new UserApiSteps(request);

    await userSteps.createUser();
  });

  test.afterEach(async () => {
    const deleteResponse = await userSteps.deleteUser();
    expect(deleteResponse.ok()).toBeTruthy();
    expect(deleteResponse.status()).toBe(200);
  });

  test('Get info about user', async () => {
    const response = await userSteps.getUserInfo();
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const user: UserDTO = await response.json();
    expect(user.id).toBe(userSteps.createdUser.id);
    expect(user.name).toBe(userSteps.createdUser.name);
    expect(user.yearOfBirth).toBe(userSteps.createdUser.yearOfBirth);
  });

  test('Update user', async () => {
    const response = await userSteps.updateUser();
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const updatedUser = await response.json();
    const expected = UserFactory.createNewUser('Female_Gender');
    expect(updatedUser.name).toBe(expected.name);
    expect(updatedUser.gender).toBe(expected.gender);
    expect(updatedUser.yearOfBirth).toBe(expected.yearOfBirth);
  });

  test('Get info about all users', async () => {
    const response = await userSteps.getAllUsers();
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const users: UserDTO[] = await response.json();
    expect(Array.isArray(users)).toBe(true);
    const found = users.find(
      (user: UserDTO) => user.id === userSteps.createdUser.id
    );
    expect(found).toBeTruthy();
    expect(found!.id).toBe(userSteps.createdUser.id);
    expect(found!.name).toBe(userSteps.createdUser.name);
    expect(found!.yearOfBirth).toBe(userSteps.createdUser.yearOfBirth);
    expect(found!.gender).toBe(userSteps.createdUser.gender);
  });
});
