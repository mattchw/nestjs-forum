import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Post } from './models/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), UserModule],
  exports: [PostService],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
