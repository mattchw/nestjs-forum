import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ListCommentDto {
  @ApiProperty({ required: false, default: 20 })
  take?: number;
  @ApiProperty({
    required: false,
    default: 0,
    description: 'Skip number of rows',
  })
  skip?: number;
}

export class CreateCommentDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly content: string;
}
