import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TodoController } from './controllers/todo.controller';
import { TodoService } from './services/todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';
import { UserEntity } from './entities/user.entity';
import { AuthController } from './controllers/auth.controller';
import { UserService } from './services/user.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LoggingMiddleware } from './middlewares/logging.middleware';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserController } from './controllers/user.controller';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    // import des .env
    ConfigModule.forRoot({ envFilePath: ['.env.dev', '.env'] }),
    // configuration pour le token JWT
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    // configuration TypeORM pour la connexion DB
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      options: {
        encrypt: true,
        trustServerCertificate: true, // Use true for local development
      },
      logging: true,
      synchronize: true,
      entities: [TodoEntity, UserEntity],
    }),
    TypeOrmModule.forFeature([TodoEntity, UserEntity]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    NestjsFormDataModule,
  ],
  controllers: [TodoController, AuthController, UserController],
  providers: [TodoService, UserService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
    consumer.apply(AuthMiddleware).forRoutes('*');

    // '*' pour tous les routes, ou ['route1', 'route2']
  }
}
