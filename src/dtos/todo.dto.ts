import { ApiProperty } from '@nestjs/swagger';

export class TodoDto {
  @ApiProperty({ example: 1, description: 'The unique identifier of the todo item' })
  id: number;

  @ApiProperty({ example: 'Buy groceries', description: 'The title of the todo item' })
  title: string;

  @ApiProperty({
    example: 'Milk, Bread, Eggs',
    description: 'The description of the todo item',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    example: true,
    description: 'Indicates whether the todo item is completed',
    default: false,
  })
  completed: boolean;
}
