import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // import typeorm
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './tasks/task.module'; // Import TaskModule

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', 
      port: 5432, // postgres default
      username: 'postgres', // postgres default
      password: 'ballislife', // my password
      database: 'task_management', // my database
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Entities path
      synchronize: true, // ONLY FOR DEVELOPMENT
    }),
    TaskModule, // Add TaskModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
