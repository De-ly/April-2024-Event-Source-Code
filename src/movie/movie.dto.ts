import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  genre: string;
}

export class UpdateMovieDto extends AddMovieDto {}

export class PatchMovieDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  genre: string;
}
