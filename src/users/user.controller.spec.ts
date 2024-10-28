import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findUserById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const user = {
        name: 'test',
        password: 'password',
      };
      jest
        .spyOn(mockUsersService, 'create')
        .mockImplementation(() => Promise.resolve({ id: 1, ...user }));
      const result = await controller.create(user);
      expect(mockUsersService.create).toHaveBeenCalled();
      expect(mockUsersService.create).toHaveBeenCalledWith(user);
      expect(result).toEqual({ id: 1, ...user });
    });

    it('should throw an error if user is not created', async () => {
      const user = {
        name: 'test',
        password: 'password',
      };
      jest.spyOn(mockUsersService, 'create').mockImplementation(() => {
        throw new Error();
      });
      await expect(controller.create(user)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const user = {
        id: 1,
        name: 'test',
        password: 'password',
      };
      jest
        .spyOn(mockUsersService, 'update')
        .mockImplementation(() => Promise.resolve({ id: 1, ...user }));
      const result = await controller.update(1, user);
      expect(mockUsersService.update).toHaveBeenCalled();
      expect(mockUsersService.update).toHaveBeenCalledWith(1, user);
      expect(result).toEqual({ id: 1, ...user });
    });

    it('should throw an error if user is not updated', async () => {
      const user = {
        id: 1,
        name: 'test',
        password: 'password',
      };
      jest.spyOn(mockUsersService, 'update').mockImplementation(() => {
        throw new Error();
      });
      await expect(controller.update(1, user)).rejects.toThrow();
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const user = {
        id: 1,
        name: 'test',
        password: 'password',
      };
      jest
        .spyOn(mockUsersService, 'delete')
        .mockImplementation(() => Promise.resolve({ id: 1, ...user }));
      const result = await controller.delete(1);
      expect(mockUsersService.delete).toHaveBeenCalled();
      expect(mockUsersService.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual({ id: 1, ...user });
    });

    it('should throw an error if user is not deleted', async () => {
      jest.spyOn(mockUsersService, 'delete').mockImplementation(() => {
        throw new Error();
      });
      await expect(controller.delete(1)).rejects.toThrow();
    });
  });

  describe('findUser', () => {
    it('should find a user', async () => {
      const user = {
        id: 1,
        name: 'test',
        password: 'password',
      };
      jest
        .spyOn(mockUsersService, 'findUserById')
        .mockImplementation(() => Promise.resolve({ id: 1, ...user }));
      const result = await controller.findUser(1);
      expect(mockUsersService.findUserById).toHaveBeenCalled();
      expect(mockUsersService.findUserById).toHaveBeenCalledWith(1);
      expect(result).toEqual({ id: 1, ...user });
    });

    it('should throw an error if user is not found', async () => {
      jest.spyOn(mockUsersService, 'findUserById').mockImplementation(() => {
        throw new Error();
      });
      await expect(controller.findUser(1)).rejects.toThrow();
    });
  });
});
