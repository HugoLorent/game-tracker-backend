import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GAME_PLATFORM } from '../interfaces/games.interface';
import { CollectionsGames } from '../../collections-games/entities/collections-games.entity';

@Entity({ name: 'games' })
export class Game {
  @PrimaryGeneratedColumn({ name: 'game_id' })
  id: number;

  @Column('citext', { name: 'game_name', unique: true })
  name: string;

  @Column({ name: 'game_platform' })
  platform: GAME_PLATFORM;

  @OneToMany(
    () => CollectionsGames,
    (collectionsGames) => collectionsGames.game,
  )
  collectionsGames?: CollectionsGames[];
}
