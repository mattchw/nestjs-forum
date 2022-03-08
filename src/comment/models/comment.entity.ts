import { User } from '../../user/models/user.entity';
import { Post } from '../../post/models/post.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  commentId: number;

  @Column()
  content: string;

  @OneToOne(() => Post)
  @JoinColumn()
  post: Post;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
