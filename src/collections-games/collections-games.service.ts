import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CollectionsGames } from './entities/collections-games.entity';
import { Repository } from 'typeorm';
import { Collection } from '../collections/entities/collection.entity';
import { Game } from '../games/entities/game.entity';

@Injectable()
export class CollectionsGamesService {
  private readonly logger = new Logger(CollectionsGamesService.name);

  constructor(
    @InjectRepository(CollectionsGames)
    private collectionsGamesRepository: Repository<CollectionsGames>,
    @InjectRepository(Collection)
    private collectionsRepository: Repository<Collection>,
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
  ) {}

  public async create(collectionId: number, gameId: number): Promise<void> {
    const collectionsGames = new CollectionsGames();
    collectionsGames.collection = await this.collectionsRepository.findOne({
      where: { id: collectionId },
    });
    collectionsGames.game = await this.gamesRepository.findOne({
      where: { id: gameId },
    });
    await this.collectionsGamesRepository.save(collectionsGames);
  }
}
