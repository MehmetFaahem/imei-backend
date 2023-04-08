import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type userDocument = User & Document;

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  collection: 'users',
})
export class User {
  @Prop({
    required: [true, 'name must be filled'],
    type: String,
    trim: true,
  })
  name: string;

  @Prop({
    required: [true, 'phone must be filled'],
    type: String,
    trim: true,
  })
  phone: string;

  @Prop({
    required: [true, 'gender must be filled'],
    type: String,
    trim: true,
  })
  gender: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
