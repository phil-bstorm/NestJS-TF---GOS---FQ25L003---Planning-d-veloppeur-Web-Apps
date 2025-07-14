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
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay

    return this.todos;
  }

  async create(body: any) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay

    const newTodo = {
      id: this.todos.length + 1,
      title: body.title || '',
      description: body.description || '',
      complete: false,
    };

    this.todos.push(newTodo);
    return newTodo;
  }

  async getById(id: number) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay

    const todo = this.todos.find((t) => t.id === id);
    return todo;
  }
}
