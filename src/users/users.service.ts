import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly saltRounds = 10;
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  public async create(name: string, password: string): Promise<User> {
    try {
      if (!name || !password) {
        throw new BadRequestException('Name and password are required');
      }
      const user = new User();
      const passwordHash = await bcrypt.hash(password, this.saltRounds);
      user.name = name;
      user.passwordHash = passwordHash;
      return this.usersRepository.save(user);
    } catch (error) {
      this.logger.error('Error creating user', error);
      throw error;
    }
  }
}
