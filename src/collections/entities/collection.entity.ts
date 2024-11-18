import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/user.entity';
import { CollectionsGames } from '../../collections-games/entities/collections-games.entity';

@Entity({ name: 'collections' })
export class Collection {
  @PrimaryGeneratedColumn({ name: 'collection_id' })
  id: number;

  @Column({ name: 'collection_name' })
  name: string;

  @ManyToOne(() => User, (user) => user.collections)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(
    () => CollectionsGames,
    (collectionsGames) => collectionsGames.collection,
  )
  collectionsGames?: CollectionsGames[];
}
