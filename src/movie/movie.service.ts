import {
  Injectable,
  InternalServerErrorException,
  Logger,
  Put,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Movie } from './movie.schema';
import { AddMovieDto, PatchMovieDto, UpdateMovieDto } from './movie.dto';
import { MovieModel } from '../models/movie.model';

@Injectable()
export class MovieService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}
  private logger = new Logger('MovieService');
  async getMovies(): Promise<MovieModel[]> {
    try {
      return this.movieModel.find({});
    } catch (err) {
      throw new InternalServerErrorException(
        'ERROR WHILE CONNECTION TO DATABASE',
      );
    }
  }

  async addMovie(addMovieDto: AddMovieDto): Promise<MovieModel> {
    try {
      return this.movieModel.create(addMovieDto);
    } catch {
      this.logger.error('ERROR WHILE CREATING TO DATABASE');
      throw new InternalServerErrorException(
        'ERROR WHILE CREATING TO DATABASE',
      );
    }
  }

  async updateMovie(
    updateMovieDto: UpdateMovieDto,
    movieId: Types.ObjectId,
  ): Promise<MovieModel> {
    try {
      return this.movieModel.findByIdAndUpdate(
        movieId,
        {
          $set: updateMovieDto,
        },
        { new: true },
      );
    } catch {
      this.logger.error('ERROR WHILE UPDATING TO DATABASE');
      throw new InternalServerErrorException(
        'ERROR WHILE UPDATING TO DATABASE',
      );
    }
  }

  async patchMovie(
    patchMovieDto: PatchMovieDto,
    movieId: Types.ObjectId,
  ): Promise<MovieModel> {
    try {
      return this.movieModel.findByIdAndUpdate(
        movieId,
        {
          $set: patchMovieDto,
        },
        { new: true },
      );
    } catch {
      this.logger.error('ERROR WHILE PATCHING TO DATABASE');
      throw new InternalServerErrorException(
        'ERROR WHILE PATCHING TO DATABASE',
      );
    }
  }

  async deleteMovie(movieId: Types.ObjectId): Promise<string> {
    try {
      await this.movieModel.findByIdAndDelete(movieId);
      return 'MOVIE DELETED SUCCESSFULLY';
    } catch {
      this.logger.error('ERROR WHILE DELETING TO DATABASE');
      throw new InternalServerErrorException(
        'ERROR WHILE DELETING TO DATABASE',
      );
    }
  }
}
