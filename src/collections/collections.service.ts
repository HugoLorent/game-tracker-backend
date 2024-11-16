import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from './entities/collection.entity';
import { UsersService } from '../users/users.service';
import { CollectionsGamesService } from '../collections-games/collections-games.service';
import { AddGamesToCollectionDto } from './dto/add-games-to-collection.dto';
import { GamesService } from '../games/games.service';
import { Game } from '../games/entities/game.entity';
import { CollectionsGames } from '../collections-games/entities/collections-games.entity';

@Injectable()
export class CollectionsService {
  private readonly logger = new Logger(CollectionsService.name);

  constructor(
    @InjectRepository(Collection)
    private readonly collectionsRepository: Repository<Collection>,
    private readonly usersService: UsersService,
    private readonly gamesService: GamesService,
    private readonly collectionsGamesService: CollectionsGamesService,
  ) {}

  public async create(
    userId: number,
    createCollectionDto: CreateCollectionDto,
  ): Promise<Collection> {
    try {
      const collection = new Collection();
      collection.name = createCollectionDto.name;
      collection.user = await this.usersService.findUserById(userId);
      return this.collectionsRepository.save(collection);
    } catch (error) {
      this.logger.error('Error creating collection', error);
      throw error;
    }
  }

  public async findAll(userId: number): Promise<Collection[]> {
    try {
      return this.collectionsRepository.find({
        where: { user: { id: userId } },
      });
    } catch (error) {
      this.logger.error('Error finding collections', error);
      throw error;
    }
  }

  public async findOne(collectionId: number): Promise<Collection> {
    try {
      const collection = await this.collectionsRepository.findOne({
        where: { id: collectionId },
      });
      if (!collection) {
        throw new NotFoundException('Collection not found');
      }
      return collection;
    } catch (error) {
      this.logger.error('Error finding collection', error);
      throw error;
    }
  }

  public async update(
    collectionId: number,
    updateCollectionDto: UpdateCollectionDto,
  ): Promise<Collection> {
    try {
      const collection = await this.collectionsRepository.findOne({
        where: { id: collectionId },
      });
      if (!collection) {
        throw new NotFoundException('Collection not found');
      }
      await this.collectionsRepository.update(
        { id: collectionId },
        updateCollectionDto,
      );
      return this.collectionsRepository.findOne({
        where: { id: collectionId },
      });
    } catch (error) {
      this.logger.error('Error updating collection', error);
      throw error;
    }
  }

  public async remove(collectionId: number): Promise<Collection> {
    try {
      const collection = await this.collectionsRepository.findOne({
        where: { id: collectionId },
      });
      if (!collection) {
        throw new NotFoundException('Collection not found');
      }
      return this.collectionsRepository.remove(collection);
    } catch (error) {
      this.logger.error('Error removing collection', error);
      throw error;
    }
  }

  public async addGamesToCollection(
    collectionId: number,
    addGamesToCollectionDto: AddGamesToCollectionDto,
  ): Promise<void> {
    try {
      const collection = await this.collectionsRepository.findOne({
        where: { id: collectionId },
      });
      if (!collection) {
        throw new NotFoundException('Collection not found');
      }

      const games: Game[] = [];
      for (const gameId of addGamesToCollectionDto.gamesIds) {
        const game = await this.gamesService.findGameById(gameId);
        games.push(game);
      }

      for (const game of games) {
        const collectionGame = new CollectionsGames();
        collectionGame.game = game;
        collectionGame.collection = collection;
        await this.collectionsGamesService.create(collection.id, game.id);
      }
    } catch (error) {
      this.logger.error('Error adding games to collection', error);
      throw error;
    }
  }
}
