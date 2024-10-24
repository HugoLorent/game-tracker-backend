import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column({ name: 'user_name' })
  name: string;

  @Column({ name: 'user_password_hash' })
  passwordHash: string;
}
