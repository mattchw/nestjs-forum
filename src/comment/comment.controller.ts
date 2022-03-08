import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import RoleGuard from 'src/auth/guard/role-auth.guard';
import { IRequest } from 'src/auth/interfaces/auth.interface';
import { CreateCommentDto, ListCommentDto } from './dto/comment.dto';
import { Comment } from './models/comment.entity';
import { CommentService } from './comment.service';

@ApiTags('Comment')
@UseGuards(RoleGuard(['User', 'Admin']))
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  findAll(
    @Query('params') params: ListCommentDto,
  ): Promise<{ count: number; rows: Comment[] }> {
    return this.commentService.list(params);
  }
}
