import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';


@Schema()
@ObjectType()

export class Book {
    @Field(()=>ID)
  declare readonly  _id: string;

    @Prop({required:true})
    @Field()
    title:string;

    @Prop()
    @Field({nullable:true})
    description?: string;

    @Prop({required:true})
    @Field()
    author:string;

     
}

export const BookSchema=SchemaFactory.createForClass(Book)