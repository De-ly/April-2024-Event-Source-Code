import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema()
export class Movie {
  @Prop({ type: SchemaTypes.String, required: true })
  title: string;

  @Prop({ type: SchemaTypes.String, required: true })
  genre: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
