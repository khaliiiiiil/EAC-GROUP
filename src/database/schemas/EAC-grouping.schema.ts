import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

export type GroupDocument = Group & Document;

@Schema()
export class Group {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;
  
  @Prop({ required: true })
  designation: string;

  @Prop()
  elements: string[];

  @Prop()
  pilot: string;
}

export const GroupSchema = SchemaFactory.createForClass(Group);