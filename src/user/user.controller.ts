import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import RoleGuard from '../auth/guard/role-auth.guard';
import { CreateUserDto, ListUserDto } from './dto/user.dto';
import { User } from './models/user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@UseGuards(RoleGuard(['Admin']))
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(
    @Query('params') params: ListUserDto,
  ): Promise<{ count: number; rows: User[] }> {
    return this.userService.list(params);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get(':userId(\\d+)')
  findOne(@Param('userId') userId: number): Promise<User> {
    return this.userService.get(userId);
  }

  @Delete(':userId(\\d+)')
  remove(@Param('userId') userId: number): Promise<void> {
    return this.userService.delete(userId);
  }
}
