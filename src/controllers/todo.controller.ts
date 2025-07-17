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
import {
  TodoCompletionFormDto,
  TodoCreateFormDto,
  TodoUpdateFormDto,
} from 'src/dtos/todo.form.dto';
import {
  todoCompletionFormDtoToEntity,
  todoEntityToTodoDto,
  todoFormDtoToEntity,
  todoUpdateFormDtoToEntity,
} from 'src/mappers/todo.mappers';
import { ConnectedGuard } from 'src/guards/connected.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { RequireRoles } from 'src/guards/require-roles/require-roles.decorator';
import { UserRole } from 'src/shared/enums/user-role.enum';
import { RequireRolesGuard } from 'src/guards/require-roles/require-roles.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns all todo items',
    type: [todoEntityToTodoDto],
  })
  async getAll() {
    const todos = await this.todoService.getAll();
    return todos.map(todoEntityToTodoDto);
  }

  @Post()
  @ApiBearerAuth()
  @RequireRoles(UserRole.Admin, UserRole.Manager)
  @UseGuards(RequireRolesGuard)
  @ApiOperation({ summary: 'Create a new todo item (Admin, Manager only)' })
  @ApiResponse({
    status: 201,
    description: 'Todo item successfully created.',
    type: todoEntityToTodoDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(@Body() body: TodoCreateFormDto) {
    const entity = todoFormDtoToEntity(body);
    const newEntity = await this.todoService.create(entity);
    return todoEntityToTodoDto(newEntity);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(ConnectedGuard)
  @ApiOperation({ summary: 'Get a todo item by ID (connected users only)' })
  @ApiResponse({
    status: 200,
    description: 'Returns the todo item with the specified ID',
    type: todoEntityToTodoDto,
  })
  @ApiResponse({ status: 404, description: 'Todo item not found.' })
  @ApiResponse({ status: 400, description: 'Invalid ID format.' })
  async getById(@Param('id', ParseIntPipe) id: number) {
    const entity = await this.todoService.getById(id);
    return todoEntityToTodoDto(entity);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Update a todo item (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Todo item successfully updated.',
    type: todoEntityToTodoDto,
  })
  @ApiResponse({ status: 404, description: 'Todo item not found.' })
  @ApiResponse({ status: 400, description: 'Invalid ID format.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async updateTodo(@Param('id', ParseIntPipe) id: number, @Body() body: TodoUpdateFormDto) {
    const oldEntity = await this.todoService.getById(id);
    const entity = todoUpdateFormDtoToEntity(body, oldEntity);
    const newEntity = await this.todoService.update(entity);
    return todoEntityToTodoDto(newEntity);
  }

  @Patch(':id/complete')
  @ApiResponse({
    status: 200,
    description: 'Todo item completion status toggled successfully.',
    type: todoEntityToTodoDto,
  })
  @ApiResponse({ status: 404, description: 'Todo item not found.' })
  @ApiResponse({ status: 400, description: 'Invalid ID format.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
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
  @ApiResponse({
    status: 200,
    description: 'Todo item successfully deleted.',
    type: todoEntityToTodoDto,
  })
  @ApiResponse({ status: 404, description: 'Todo item not found.' })
  @ApiResponse({ status: 400, description: 'Invalid ID format.' })
  async deleteTodo(@Param('id', ParseIntPipe) id: number) {
    const entity = await this.todoService.delete(id);
    return todoEntityToTodoDto(entity);
  }
}
