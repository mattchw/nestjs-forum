import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
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
import { CreatePostDto, ListPostDto, UpdatePostDto } from './dto/post.dto';
import { Post as PostModel } from './models/post.entity';
import { Comment } from '../comment/models/comment.entity';
import { PostService } from './post.service';

@ApiTags('Post')
@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService,
  ) {}

  @Get()
  @UseGuards(RoleGuard(['User', 'Admin']))
  findAll(
    @Query('params') params: ListPostDto,
  ): Promise<{ count: number; rows: PostModel[] }> {
    return this.postService.list(params);
  }

  @Post()
  @UseGuards(RoleGuard(['User', 'Admin']))
  create(
    @Body() createPostDto: CreatePostDto,
    @Req() req: IRequest,
  ): Promise<PostModel> {
    return this.postService.create(createPostDto, req.user.userId);
  }

  @Get(':postId(\\d+)')
  @UseGuards(RoleGuard(['User', 'Admin']))
  findOne(@Param('postId') postId: number): Promise<PostModel> {
    return this.postService.get(postId);
  }

  @Patch(':postId(\\d+)')
  @UseGuards(RoleGuard(['Admin']))
  updateOne(
    @Param('postId') postId: number,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostModel> {
    return this.postService.update(postId, updatePostDto);
  }

  @Post(':postId(\\d+)/comments')
  @UseGuards(RoleGuard(['User', 'Admin']))
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
