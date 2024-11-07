import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should login', async () => {
    const loginDto = {
      name: 'test',
      password: 'test',
    };
    jest
      .spyOn(mockAuthService, 'login')
      .mockImplementation(() => Promise.resolve({ token: 'token' }));
    const result = await controller.login(loginDto);
    expect(mockAuthService.login).toHaveBeenCalled();
    expect(mockAuthService.login).toHaveBeenCalledWith(loginDto);
    expect(result).toEqual({ token: 'token' });
  });

  it('should throw an error if login fails', async () => {
    const loginDto = {
      name: 'test',
      password: 'test',
    };
    jest.spyOn(mockAuthService, 'login').mockImplementation(() => {
      throw new Error();
    });
    await expect(controller.login(loginDto)).rejects.toThrow();
  });
});
