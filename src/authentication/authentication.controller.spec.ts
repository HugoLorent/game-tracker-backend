import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

describe('AuthController', () => {
  let controller: AuthenticationController;

  const mockAuthService = {
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [
        { provide: AuthenticationService, useValue: mockAuthService },
      ],
    }).compile();

    controller = module.get<AuthenticationController>(AuthenticationController);
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
