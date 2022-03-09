import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

import { RoleStr, RoleType } from '../../auth/interfaces/auth.interface';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  displayName: string;

  @Index({ unique: true })
  @Column({
    unique: true,
  })
  username: string;

  @Column()
  hash: string;

  @Column({
    type: 'enum',
    enum: RoleStr,
    default: RoleStr[0],
  })
  role: RoleType;

  @Column({ default: true })
  isActive: boolean;
}
