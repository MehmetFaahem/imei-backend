import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type userDocument = User & Document;

@Schema()
export class CartedProducts {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  company: string;

  @Prop({ type: String })
  category: string;

  @Prop({ type: String })
  price: string;

  @Prop({ type: Number })
  quantity: number;
}
const CartedProductsSchema = SchemaFactory.createForClass(CartedProducts);

@Schema()
export class FavouredProducts {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  company: string;

  @Prop({ type: String })
  category: string;

  @Prop({ type: String })
  price: string;

  @Prop({ type: Number })
  rating: number;

  @Prop({ type: String })
  indication: string;

  @Prop({ type: String })
  pharmacology: string;
}
const FavouredProductsSchema = SchemaFactory.createForClass(FavouredProducts);

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

  @Prop({
    required: [false, 'projects should not be empty'],
    type: [CartedProductsSchema],
    default: [],
  })
  carted: CartedProducts[];

  @Prop({
    required: [false, 'projects should not be empty'],
    type: [CartedProductsSchema],
    default: [],
  })
  favourites: FavouredProducts[];
}

export const UserSchema = SchemaFactory.createForClass(User);
