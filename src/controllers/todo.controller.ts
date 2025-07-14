import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
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
}
