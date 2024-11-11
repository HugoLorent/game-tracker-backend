import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/user.entity';

@Entity({ name: 'collections' })
export class Collection {
  @PrimaryGeneratedColumn({ name: 'collection_id' })
  id: number;

  @Column('citext', { name: 'collection_name', unique: true })
  name: string;

  @ManyToOne(() => User, (user) => user.collections)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
