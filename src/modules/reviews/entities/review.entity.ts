import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type reviewDocument = Review & Document;

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  collection: 'reviews',
})
export class Review {
  @Prop({
    required: [true, 'quality must be provided'],
    type: String,
    trim: true,
  })
  quality: string;

  @Prop({
    required: [true, 'description must be provided'],
    type: String,
    trim: true,
  })
  description: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
