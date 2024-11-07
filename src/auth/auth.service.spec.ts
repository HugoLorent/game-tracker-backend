import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;

  const mockUserService = {
    findUserByName: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should login', async () => {
    const loginDto = {
      name: 'test',
      password: 'test',
    };

    jest
      .spyOn(mockUserService, 'findUserByName')
      .mockImplementation(() => Promise.resolve({ id: 1, name: 'test' }));
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementation(() => Promise.resolve(true));
    jest
      .spyOn(mockJwtService, 'signAsync')
      .mockImplementation(() => Promise.resolve('token'));

    const result = await service.login(loginDto);
    expect(result).toEqual({ access_token: 'token' });
  });

  it('should throw an error if user is not found', async () => {
    jest
      .spyOn(mockUserService, 'findUserByName')
      .mockImplementation(() => Promise.resolve(null));
    await expect(
      service.login({ name: 'test', password: 'test' }),
    ).rejects.toThrow(new NotFoundException('User not found'));
  });

  it('should throw an error if password is incorrect', async () => {
    jest
      .spyOn(mockUserService, 'findUserByName')
      .mockImplementation(() => Promise.resolve({ id: 1, name: 'test' }));
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementation(() => Promise.resolve(false));
    await expect(
      service.login({ name: 'test', password: 'test' }),
    ).rejects.toThrow(new UnauthorizedException('Invalid credentials'));
  });
});
