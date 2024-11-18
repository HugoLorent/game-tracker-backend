import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Collection } from '../collections/entities/collection.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column('citext', { name: 'user_name', unique: true })
  name: string;

  @Exclude()
  @Column({ name: 'user_password_hash' })
  passwordHash: string;

  @OneToMany(() => Collection, (collection) => collection.user)
  collections?: Collection[];
}
