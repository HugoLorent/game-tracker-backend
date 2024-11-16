import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Collection } from '../../collections/entities/collection.entity';
import { Game } from '../../games/entities/game.entity';

@Entity('collections_games')
export class CollectionsGames {
  @PrimaryGeneratedColumn({ name: 'collections_games_id' })
  id: number;

  @Column({ name: 'collections_games_status', nullable: true })
  status: string;

  @Column({ name: 'collections_games_rating', nullable: true })
  rating: number;

  @ManyToOne(() => Collection, (collection) => collection.collectionsGames)
  @JoinColumn({ name: 'collection_id' })
  collection: Collection;

  @ManyToOne(() => Game, (game) => game.collectionsGames)
  @JoinColumn({ name: 'game_id' })
  game: Game;
}
