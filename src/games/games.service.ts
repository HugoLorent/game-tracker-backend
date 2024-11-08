import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GamesService {
  private readonly logger = new Logger(GamesService.name);

  constructor(
    @InjectRepository(Game) private gamesRepository: Repository<Game>,
  ) {}

  public async create(createGameDto: CreateGameDto): Promise<Game> {
    try {
      const game = new Game();
      game.name = createGameDto.name;
      game.platform = createGameDto.platform;
      return this.gamesRepository.save(game);
    } catch (error) {
      this.logger.error('Error creating game', error);
      throw error;
    }
  }

  public async findGameById(id: number): Promise<Game> {
    try {
      const game = await this.gamesRepository.findOne({ where: { id } });
      if (!game) {
        throw new NotFoundException('Game not found');
      }
      return game;
    } catch (error) {
      this.logger.error('Error finding game', error);
      throw error;
    }
  }

  public async update(id: number, updateGameDto: UpdateGameDto): Promise<Game> {
    try {
      const game = await this.gamesRepository.findOne({ where: { id } });
      if (!game) {
        throw new NotFoundException('Game not found');
      }
      await this.gamesRepository.update({ id }, updateGameDto);
      return this.gamesRepository.findOne({ where: { id } });
    } catch (error) {
      this.logger.error('Error updating game', error);
      throw error;
    }
  }

  public async delete(id: number): Promise<Game> {
    try {
      const game = await this.gamesRepository.findOne({ where: { id } });
      if (!game) {
        throw new NotFoundException('Game not found');
      }
      return await this.gamesRepository.remove(game);
    } catch (error) {
      this.logger.error('Error deleting game', error);
      throw error;
    }
  }
}
