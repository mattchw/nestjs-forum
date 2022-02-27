import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { FindConditions, Like, Repository } from 'typeorm';
import { CreatePostDto, ListPostDto } from './dto/post.dto';
import { Post } from './models/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    private userService: UserService,
  ) { }

  async create(createPostDto: CreatePostDto, userId: number): Promise<Post> {
    const user = await this.userService.get(userId);
    const newPost = await this.postsRepository.create({
      ...createPostDto,
      user,
    });

    this.postsRepository.save(newPost);

    return newPost;
  }

  async list(params?: ListPostDto): Promise<{ count: number; rows: Post[] }> {
    const where: FindConditions<Post> = {};
    let take = 20;
    let skip = 0;
    if (params) {
      if (params.take) {
        take = params.take;
      }
      if (params.skip) {
        skip = params.skip;
      }
      if (params.title) {
        where.title = Like(`%${params.title}%`);
      }
    }
    const [posts, count] = await this.postsRepository.findAndCount({
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