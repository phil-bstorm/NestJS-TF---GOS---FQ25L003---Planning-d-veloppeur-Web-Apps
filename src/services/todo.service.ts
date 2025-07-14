import { Body, Injectable } from '@nestjs/common';

@Injectable()
export class TodoService {
  todos = [
    {
      id: 1,
      title: 'Aller faire les courses',
      description: 'Ramener à manger pour la semaine',
      complete: false,
    },
  ];

  async getAll() {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async operation
    return this.todos;
  }

  async create(body: any) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async operation

    const newTodo = {
      id: this.todos.length + 1,
      title: body.title,
      completed: false,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  async getById(id: number) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async operation

    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new Error('Todo not found');
    }
    return todo;
  }

  async update(id: number, body: any) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async operation

    const existingTodo = this.todos.find((todo) => todo.id === id);
    if (!existingTodo) {
      throw new Error('Todo not found');
    }

    existingTodo.title = body.title || existingTodo.title;

    return existingTodo;
  }

  async delete(id: number) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async operation

    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      throw new Error('Todo not found');
    }

    const deletedTodo = this.todos.splice(index, 1);
    return deletedTodo[0];
  }

  async toggleTodoCompletion(id: number, body: any) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async operation

    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new Error('Todo not found');
    }

    todo.completed = body.completed !== undefined ? body.completed : !todo.completed;

    return todo;
  }
}
