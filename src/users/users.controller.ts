import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../guards/decorators/public.decorator';
import { AuthorizationGuard } from '../guards/authorization.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthorizationGuard)
  @Get(':userId')
  public async findUser(@Param('userId') id: number): Promise<User> {
    try {
      return await this.usersService.findUserById(id);
    } catch (error) {
      throw error;
    }
  }

  @Public()
  @Post()
  public async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthorizationGuard)
  @Patch(':userId')
  public async update(
    @Param('userId') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    try {
      return await this.usersService.update(id, updateUserDto);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthorizationGuard)
  @Delete(':userId')
  public async delete(@Param('userId') id: number): Promise<User> {
    try {
      return await this.usersService.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
