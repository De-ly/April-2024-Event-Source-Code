import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { AddMovieDto, PatchMovieDto, UpdateMovieDto } from './movie.dto';
import { MovieModel } from '../models/movie.model';
import { Types } from 'mongoose';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get()
  async getMovies(): Promise<MovieModel[]> {
    return this.movieService.getMovies();
  }

  @Post()
  async addMovie(@Body() addMovieDto: AddMovieDto): Promise<MovieModel> {
    return this.movieService.addMovie(addMovieDto);
  }

  @Put(':movieId')
  async updateMovie(
    @Body() updateMovieDto: UpdateMovieDto,
    @Param('movieId') movieId: Types.ObjectId,
  ): Promise<MovieModel> {
    return this.movieService.updateMovie(updateMovieDto, movieId);
  }

  @Patch(':movieId')
  async patchMovie(
    @Body() patchMovieDto: PatchMovieDto,
    @Param('movieId') movieId: Types.ObjectId,
  ): Promise<MovieModel> {
    return this.movieService.patchMovie(patchMovieDto, movieId);
  }

  @Delete(':movieId')
  async deleteMovie(
    @Param('movieId') movieId: Types.ObjectId,
  ): Promise<string> {
    return this.movieService.deleteMovie(movieId);
  }
}
