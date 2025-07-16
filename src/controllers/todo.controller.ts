import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from '../services/todo.service';
import { TodoCompletionFormDto, TodoFormDto, TodoUpdateFormDto } from 'src/dtos/todo.form.dto';
import {
  todoCompletionFormDtoToEntity,
  todoEntityToTodoDto,
  todoFormDtoToEntity,
  todoUpdateFormDtoToEntity,
} from 'src/mappers/todo.mappers';
import { ConnectedGuard } from 'src/guards/connected.guard';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getAll() {
    const todos = await this.todoService.getAll();
    return todos.map(todoEntityToTodoDto);
  }

  @Post()
  async create(@Body() body: TodoFormDto) {
    const entity = todoFormDtoToEntity(body);
    const newEntity = await this.todoService.create(entity);
    return todoEntityToTodoDto(newEntity);
  }

  @Get(':id')
  @UseGuards(ConnectedGuard)
  async getById(@Param('id', ParseIntPipe) id: number) {
    const entity = await this.todoService.getById(id);
    return todoEntityToTodoDto(entity);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  async updateTodo(@Param('id', ParseIntPipe) id: number, @Body() body: TodoUpdateFormDto) {
    const oldEntity = await this.todoService.getById(id);
    const entity = todoUpdateFormDtoToEntity(body, oldEntity);
    const newEntity = await this.todoService.update(entity);
    return todoEntityToTodoDto(newEntity);
  }

  @Patch(':id/complete')
  async toggleTodoCompletion(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: TodoCompletionFormDto,
  ) {
    const oldEntity = await this.todoService.getById(id);
    const entity = todoCompletionFormDtoToEntity(body, oldEntity);
    const newEntity = await this.todoService.toggleTodoCompletion(entity);
    return todoEntityToTodoDto(newEntity);
  }

  @Delete(':id')
  async deleteTodo(@Param('id', ParseIntPipe) id: number) {
    const entity = await this.todoService.delete(id);
    return todoEntityToTodoDto(entity);
  }
}
