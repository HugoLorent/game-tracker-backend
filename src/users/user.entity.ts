import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column('citext', { name: 'user_name', unique: true })
  name: string;

  @Column({ name: 'user_password_hash' })
  passwordHash: string;
}
