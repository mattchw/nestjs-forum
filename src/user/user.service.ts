import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Like, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, ListUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './models/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hash = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await this.usersRepository.create({
      ...createUserDto,
      hash,
    });

    await this.usersRepository.save(newUser);

    return newUser;
  }

  async list(params?: ListUserDto): Promise<{ count: number; rows: User[] }> {
    const where: FindConditions<User> = {};
    let take = 20;
    let skip = 0;
    if (params) {
      if (params.take) {
        take = params.take;
      }
      if (params.skip) {
        skip = params.skip;
      }
      if (params.username) {
        where.username = Like(`%${params.username}%`);
      }
    }
    const [users, count] = await this.usersRepository.findAndCount({
      take,
      skip,
      where,
    });
    return {
      count,
      rows: users,
    };
  }

  async get(userId: number): Promise<User> {
    const user = await this.usersRepository.findOne(userId);
    if (user === null) {
      throw new NotFoundException(`User with id: ${user} not found`);
    }
    return user;
  }

  async getByUsername(username: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        username,
      },
    });
    return user;
  }

  async update(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.get(userId);
    await this.usersRepository.update(user.userId, updateUserDto);
    const updatedUser = await this.get(userId);
    return updatedUser;
  }

  async delete(userId: number): Promise<void> {
    await this.usersRepository.delete(userId);
  }
}
