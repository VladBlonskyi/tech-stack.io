import { test, expect } from '@playwright/test';
import { UserApiSteps } from '../../Steps/apiSteps';
import { UserFactory } from '../../Factory/userFactory';
import { UserDTO } from '../../DTO/userDTO';

test.describe('Full user flow scenario', () => {
  let userSteps: UserApiSteps;
  let user: UserDTO;

  test.beforeEach(async ({ request }) => {
    userSteps = new UserApiSteps(request);
    console.log(user);
    user = await userSteps.createUser();
  });

  test.afterEach(async () => {
    const deleteResponse = await userSteps.deleteUser(user.id!);

    expect(deleteResponse.ok()).toBeTruthy();
    expect(deleteResponse.status()).toBe(200);
  });

  test('Get info about user', async () => {
    const response = await userSteps.getUserInfo(user.id!);
    const json: UserDTO = await response.json();

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(json.id).toBe(user.id);
    expect(json.name).toBe(user.name);
    expect(json.yearOfBirth).toBe(user.yearOfBirth);
  });

  test('Update user', async () => {
    const userFemale = UserFactory.createNewUser('Female_Gender');
    const response = await userSteps.updateUser(userFemale);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const updatedUser: UserDTO = await response.json();

    expect(updatedUser.name).toBe(userFemale.name);
    expect(updatedUser.gender).toBe(userFemale.gender);
    expect(updatedUser.yearOfBirth).toBe(userFemale.yearOfBirth);
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
