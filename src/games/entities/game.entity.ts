import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { GAME_PLATFORM } from '../interfaces/games.interface';

@Entity({ name: 'games' })
export class Game {
  @PrimaryGeneratedColumn({ name: 'game_id' })
  id: number;

  @Column('citext', { name: 'game_name', unique: true })
  name: string;

  @Column({ name: 'game_platform' })
  platform: GAME_PLATFORM;
}
