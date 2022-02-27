import { User } from '../../user/models/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  postId: number;

  @Column()
  category: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
