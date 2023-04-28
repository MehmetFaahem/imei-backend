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
    required: [true, 'email must be filled'],
    type: String,
    trim: true,
  })
  email: string;

  @Prop({
    required: [true, 'password must be filled'],
    type: String,
    trim: true,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
