import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoleStr, RoleType } from 'src/auth/interfaces/auth.interface';

export class ListUserDto {
  @ApiProperty({ required: false, default: 20 })
  take?: number;
  @ApiProperty({
    required: false,
    default: 0,
    description: 'Skip number of rows',
  })
  skip?: number;
  @ApiProperty({ required: false })
  username?: string;
}

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly displayName: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly username: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @ApiProperty({ required: false })
  readonly displayName: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    default: RoleStr[0],
  })
  readonly role: RoleType;

  @IsOptional()
  @ApiProperty({
    required: false,
    default: true,
  })
  readonly isActive: boolean;
}
