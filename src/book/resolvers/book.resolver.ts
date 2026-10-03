import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookService } from '../book.service.js';
import { Book } from '../model/book.module.js';
import { CreateBookInput } from '../dto/create-book.input.js';
import { UpdateBookInput } from '../dto/update-book.input.js';

@Resolver()
export class BookResolver {
  constructor(private readonly bookService:BookService) {} 
  @Query(() => [Book],{name:'getAllBooks'})
  async findAll(){
    return this.bookService.getAllBooks()
  }


   @Query(() => Book,{name:'getBookById'})
  async findOne(@Args('id',{type:()=>String})id:string){
    return this.bookService.getBookById(id)
  }

  @Mutation(() => Book)
  async createBook(@Args('input') input: CreateBookInput) {
    return this.bookService.createBook(input);
  }

  @Mutation(()=>Book)
  async  updateBook(@Args('input') input: UpdateBookInput){
    return this.bookService.update(input)
}

 @Mutation(()=>Boolean)
  async  deleteBook(@Args('id', {type:()=>String}) id:string){
    return this.bookService.remove(id)
}
}
