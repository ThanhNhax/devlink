import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ require: true })
  name: string;

  @Prop({ require: true, unique: true })
  email: string;

  @Prop()
  age?: number;

  @Prop({ default: Date.now() })
  createAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
