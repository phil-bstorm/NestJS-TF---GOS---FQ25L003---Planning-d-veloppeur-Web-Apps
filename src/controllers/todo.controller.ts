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
} from '@nestjs/common';
import { TodoService } from '../services/todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getAll() {
    return this.todoService.getAll();
  }

  @Post()
  async create(@Body() body: any) {
    return this.todoService.create(body);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.getById(id);
  }

  @Put(':id')
  async updateTodo(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.todoService.update(id, body);
  }

  @Patch(':id/complete')
  async toggleTodoCompletion(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.todoService.toggleTodoCompletion(id, body);
  }

  @Delete(':id')
  async deleteTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.delete(id);
  }
}
