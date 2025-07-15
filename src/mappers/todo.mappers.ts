import { TodoDto } from 'src/dtos/todo.dto';
import { TodoCompletionFormDto, TodoFormDto, TodoUpdateFormDto } from 'src/dtos/todo.form.dto';
import { TodoEntity } from 'src/entities/todo.entity';

// DTO -> Entité
export function todoFormDtoToEntity(dto: TodoFormDto): TodoEntity {
  const entity = new TodoEntity();
  entity.title = dto.title;
  if (dto.description !== undefined) {
    entity.description = dto.description;
  }

  if (dto.completed !== undefined) {
    entity.completed = dto.completed;
  }
  return entity;
}

export function todoUpdateFormDtoToEntity(dto: TodoUpdateFormDto, entity: TodoEntity): TodoEntity {
  if (dto.title !== undefined) {
    entity.title = dto.title;
  }
  if (dto.description !== undefined) {
    entity.description = dto.description;
  }
  return entity;
}

export function todoCompletionFormDtoToEntity(
  dto: TodoCompletionFormDto,
  entity: TodoEntity,
): TodoEntity {
  if (dto?.completed !== undefined) {
    entity.completed = dto.completed;
  } else {
    entity.completed = !entity.completed;
  }

  return entity;
}

// Entité ->  DTO
export function todoEntityToTodoDto(entity: TodoEntity): TodoDto {
  return {
    id: entity.id,
    title: entity.title,
    description: entity.description,
    completed: entity.completed,
  };
}
