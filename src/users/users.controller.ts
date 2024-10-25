import { Body, Controller, Logger, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async register(
    @Body('name') name: string,
    @Body('password') password: string,
  ) {
    try {
      await this.usersService.create(name, password);
    } catch (error) {
      throw error;
    }
  }
}
