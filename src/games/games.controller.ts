import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Controller('games')
export class GamesController {
  private readonly logger = new Logger(GamesController.name);

  constructor(private readonly gamesService: GamesService) {}

  @Post()
  public async create(@Body() createGameDto: CreateGameDto): Promise<Game> {
    try {
      return this.gamesService.create(createGameDto);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  public async findGame(@Param('id') id: number): Promise<Game> {
    try {
      return await this.gamesService.findGameById(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  public async update(
    @Param('id') id: number,
    @Body() updateGameDto: UpdateGameDto,
  ): Promise<Game> {
    try {
      return await this.gamesService.update(id, updateGameDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  public async remove(@Param('id') id: number): Promise<Game> {
    try {
      return await this.gamesService.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
