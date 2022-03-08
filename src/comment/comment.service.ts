import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { PostService } from 'src/post/post.service';
import { FindConditions, Like, Repository } from 'typeorm';
import { Comment } from './models/comment.entity';
import { CreateCommentDto, ListCommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    private postService: PostService,
    private userService: UserService,
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
    postId: number,
    userId: number,
  ): Promise<Comment> {
    const post = await this.postService.get(postId);
    const user = await this.userService.get(userId);

    const newComment = await this.commentsRepository.create({
      ...createCommentDto,
      post,
      user,
    });

    this.commentsRepository.save(newComment);

    return newComment;
  }

  async list(
    params?: ListCommentDto,
  ): Promise<{ count: number; rows: Comment[] }> {
    const where: FindConditions<Comment> = {};
    let take = 20;
    let skip = 0;
    if (params) {
      if (params.take) {
        take = params.take;
      }
      if (params.skip) {
        skip = params.skip;
      }
    }
    const [posts, count] = await this.commentsRepository.findAndCount({
      take,
      skip,
      where,
    });
    return {
      count,
      rows: posts,
    };
  }
}
