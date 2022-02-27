import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import RoleGuard from 'src/auth/guard/role-auth.guard';
import { IRequest } from 'src/auth/interfaces/auth.interface';
import { CreatePostDto, ListPostDto } from './dto/post.dto';
import { Post as PostModel } from './models/post.entity';
import { PostService } from './post.service';

@ApiTags('Post')
@UseGuards(RoleGuard(['User', 'Admin']))
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll(
    @Query('params') params: ListPostDto,
  ): Promise<{ count: number; rows: PostModel[] }> {
    return this.postService.list(params);
  }

  @Post()
  create(
    @Body() createPostDto: CreatePostDto,
    @Req() req: IRequest
  ): Promise<PostModel> {
    return this.postService.create(createPostDto, req.user.userId);
  }
}
