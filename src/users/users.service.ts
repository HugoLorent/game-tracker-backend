import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private readonly saltRounds = 10;
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  public async findUserById(id: number): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      this.logger.error('Error finding user', error);
      throw error;
    }
  }

  public async findUserByName(name: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({ where: { name } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      this.logger.error('Error finding user', error);
      throw error;
    }
  }

  public async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = new User();
      const passwordHash = await bcrypt.hash(
        createUserDto.password,
        this.saltRounds,
      );
      user.name = createUserDto.name;
      user.passwordHash = passwordHash;
      return this.usersRepository.save(user);
    } catch (error) {
      this.logger.error('Error creating user', error);
      throw error;
    }
  }

  public async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const toUpdate = await this.usersRepository.findOne({ where: { id } });
      if (!toUpdate) {
        throw new NotFoundException('User not found');
      }

      if (updateUserDto.name) {
        toUpdate.name = updateUserDto.name;
      }
      if (updateUserDto.password) {
        const passwordHash = await bcrypt.hash(
          updateUserDto.password,
          this.saltRounds,
        );
        toUpdate.passwordHash = passwordHash;
      }
      return await this.usersRepository.save(toUpdate);
    } catch (error) {
      this.logger.error('Error updating user', error);
      throw error;
    }
  }

  public async delete(id: number): Promise<User> {
    try {
      const toDelete = await this.usersRepository.findOne({ where: { id } });
      if (!toDelete) {
        throw new NotFoundException('User not found');
      }
      return await this.usersRepository.remove(toDelete);
    } catch (error) {
      this.logger.error('Error deleting user', error);
      throw error;
    }
  }
}
