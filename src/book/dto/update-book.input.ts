import {CreateBookInput} from "./create-book.input.js";
import {InputType, Field, PartialType,ID} from "@nestjs/graphql"
import {IsNotEmpty } from "class-validator"



@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput){
    @Field(()=>ID)
    @IsNotEmpty()
    _id:string
}