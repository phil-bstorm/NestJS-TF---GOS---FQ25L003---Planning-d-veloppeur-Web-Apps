import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from 'src/entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async getAll() {
    return this.todoRepository.find();
  }

  async create(body: TodoEntity) {
    return this.todoRepository.save(body);
  }

  async getById(id: number) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new Error('Todo not found');
    }
    return todo;
  }

  async update(body: TodoEntity) {
    return await this.todoRepository.save(body);
  }

  async delete(id: number) {
    const existingTodo = await this.todoRepository.findOne({ where: { id } });
    if (!existingTodo) {
      throw new Error('Todo not found');
    }

    await this.todoRepository.remove(existingTodo);
    return existingTodo;
  }

  async toggleTodoCompletion(body: TodoEntity) {
    return await this.todoRepository.save(body);
  }
}
