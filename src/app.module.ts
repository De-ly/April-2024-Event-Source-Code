import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MovieModule } from './movie/movie.module';
import { MongooseModule } from '@nestjs/mongoose';
import { validate } from '../env.validation';
@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
    MovieModule,
    MongooseModule.forRoot(process.env.DATABASE_URL),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
