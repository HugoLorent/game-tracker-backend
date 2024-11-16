import { Module } from '@nestjs/common';
import { CollectionsGamesService } from './collections-games.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionsGames } from './entities/collections-games.entity';
import { Collection } from '../collections/entities/collection.entity';
import { Game } from '../games/entities/game.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CollectionsGames]),
    TypeOrmModule.forFeature([Collection]),
    TypeOrmModule.forFeature([Game]),
  ],
  providers: [CollectionsGamesService],
  exports: [CollectionsGamesService],
})
export class CollectionsGamesModule {}
