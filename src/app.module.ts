import { Module } from '@nestjs/common';
import { TodoController } from './controllers/todo.controller';
import { TodoService } from './services/todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      database: 'nestjs_todo',
      username: 'SA',
      password: 'Some4Complex#Password',
      options: {
        encrypt: true,
        trustServerCertificate: true, // Use true for local development
      },
      logging: true,
      synchronize: true,
      entities: [TodoEntity],
    }),
    TypeOrmModule.forFeature([TodoEntity]),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class AppModule {}
