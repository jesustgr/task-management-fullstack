import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // import typeorm
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', 
      port: 5432,       
      username: 'postgres', // my username
      password: 'ballislife', // my password
      database: 'task_management', 
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Entities path
      synchronize: true, // ONLY FOR DEVELOPMENT
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
