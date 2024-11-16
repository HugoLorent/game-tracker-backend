import { Module } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CollectionsController } from './collections.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection } from './entities/collection.entity';
import { UsersModule } from '../users/users.module';
import { CollectionsGamesModule } from '../collections-games/collections-games.module';
import { GamesModule } from '../games/games.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Collection]),
    UsersModule,
    GamesModule,
    CollectionsGamesModule,
  ],
  controllers: [CollectionsController],
  providers: [CollectionsService],
  exports: [CollectionsService],
})
export class CollectionsModule {}
