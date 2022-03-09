import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import RoleGuard from 'src/auth/guard/role-auth.guard';
import { IRequest } from 'src/auth/interfaces/auth.interface';
import { CommentService } from 'src/comment/comment.service';
import { CreateCommentDto } from 'src/comment/dto/comment.dto';
import { CreatePostDto, ListPostDto } from './dto/post.dto';
import { Post as PostModel } from './models/post.entity';
import { Comment } from '../comment/models/comment.entity';
import { PostService } from './post.service';

@ApiTags('Post')
@UseGuards(RoleGuard(['User', 'Admin']))
@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService,
  ) {}

  @Get()
  findAll(
    @Query('params') params: ListPostDto,
  ): Promise<{ count: number; rows: PostModel[] }> {
    return this.postService.list(params);
  }

  @Post()
  create(
    @Body() createPostDto: CreatePostDto,
    @Req() req: IRequest,
  ): Promise<PostModel> {
    return this.postService.create(createPostDto, req.user.userId);
  }

  @Get(':postId(\\d+)')
  findOne(@Param('postId') postId: number): Promise<PostModel> {
    return this.postService.get(postId);
  }

  @Post(':postId(\\d+)/comments')
  createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Param('postId') postId: number,
    @Req() req: IRequest,
  ): Promise<Comment> {
    return this.commentService.create(
      createCommentDto,
      postId,
      req.user.userId,
    );
  }
}
