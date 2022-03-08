import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentModule } from 'src/comment/comment.module';
import { UserModule } from 'src/user/user.module';
import { Post } from './models/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    UserModule,
    forwardRef(() => CommentModule),
  ],
  exports: [PostService],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
