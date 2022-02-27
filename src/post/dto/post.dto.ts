import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ListPostDto {
  @ApiProperty({ required: false, default: 20 })
  take?: number;
  @ApiProperty({
    required: false,
    default: 0,
    description: 'Skip number of rows',
  })
  skip?: number;
  @ApiProperty({ required: false })
  title?: string;
}

export class CreatePostDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly category: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly title: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly content: string;
}