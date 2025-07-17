import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class TodoCreateFormDto {
  @ApiProperty({
    description: 'The title of the todo item',
    example: 'Buy groceries',
    required: true,
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The description of the todo item',
    example: 'Milk, Bread, Eggs',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Indicates whether the todo item is completed',
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}

export class TodoUpdateFormDto {
  @ApiProperty({
    description: 'The title of the todo item',
    example: 'Buy groceries',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'The description of the todo item',
    example: 'Milk, Bread, Eggs',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string | null;
}

export class TodoCompletionFormDto {
  @ApiProperty({
    description: 'Indicates whether the todo item is completed',
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
