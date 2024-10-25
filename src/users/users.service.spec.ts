import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersService', () => {
  let service: UsersService;

  const mockUserRepository = {
    save: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
      ],
    })
      .setLogger({
        log: () => {},
        error: () => {},
        warn: () => {},
        debug: () => {},
        verbose: () => {},
      })
      .compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const user: User = {
        id: 1,
        name: 'test',
        passwordHash: 'hashedPassword',
      };

      jest
        .spyOn(bcrypt, 'hash')
        .mockImplementation(() => Promise.resolve('hashedPassword'));
      jest.spyOn(mockUserRepository, 'save').mockResolvedValue(user);

      const result = await service.create({
        name: 'test',
        password: 'password',
      } as CreateUserDto);
      expect(mockUserRepository.save).toHaveBeenCalled();
      expect(mockUserRepository.save).toHaveBeenCalledWith({
        name: 'test',
        passwordHash: 'hashedPassword',
      });
      expect(result).toEqual(user);
    });

    it('should throw an error if name or password are not provided', async () => {
      await expect(
        service.create({ name: '', password: '' } as CreateUserDto),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('findUser', () => {
    it('should find a user by id', async () => {
      const user: User = {
        id: 1,
        name: 'test',
        passwordHash: 'hashedPassword',
      };
      jest.spyOn(mockUserRepository, 'findOne').mockResolvedValue(user);
      const result = await service.findUser(1);
      expect(mockUserRepository.findOne).toHaveBeenCalled();
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(user);
    });

    it('should throw an error if user is not found', async () => {
      jest.spyOn(mockUserRepository, 'findOne').mockResolvedValue(null);
      await expect(service.findUser(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const user: User = {
        id: 1,
        name: 'test',
        passwordHash: 'hashedPassword',
      };
      jest.spyOn(mockUserRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(mockUserRepository, 'save').mockResolvedValue(user);
      const result = await service.update(1, { name: 'test2' });
      expect(mockUserRepository.findOne).toHaveBeenCalled();
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(mockUserRepository.save).toHaveBeenCalled();
      expect(mockUserRepository.save).toHaveBeenCalledWith({
        id: 1,
        name: 'test2',
        passwordHash: 'hashedPassword',
      });
      expect(result).toEqual(user);
    });

    it('should throw an error if user is not found', async () => {
      jest.spyOn(mockUserRepository, 'findOne').mockResolvedValue(null);
      await expect(service.update(1, { name: 'test2' })).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw an error if no properties are not provided', async () => {
      await expect(service.update(1, {} as UpdateUserDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const user: User = {
        id: 1,
        name: 'test',
        passwordHash: 'hashedPassword',
      };
      jest.spyOn(mockUserRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(mockUserRepository, 'remove').mockResolvedValue(user);
      const result = await service.delete(1);
      expect(mockUserRepository.findOne).toHaveBeenCalled();
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(mockUserRepository.remove).toHaveBeenCalled();
      expect(mockUserRepository.remove).toHaveBeenCalledWith(user);
      expect(result).toEqual(user);
    });

    it('should throw an error if user is not found', async () => {
      jest.spyOn(mockUserRepository, 'findOne').mockResolvedValue(null);
      await expect(service.delete(1)).rejects.toThrow(NotFoundException);
    });
  });
});
