import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
