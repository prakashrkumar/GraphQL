import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './model/book.module.js';
import { Model } from 'mongoose';
import { CreateBookInput } from './dto/create-book.input.js';
import { UpdateBookInput } from './dto/update-book.input.js';

@Injectable()
export class BookService {
    constructor(@InjectModel(Book.name) private readonly bookModel: Model<Book>) {}
    async createBook(input :CreateBookInput): Promise<Book> {
        const newBook = new this.bookModel(input);
        return await newBook.save();
    }

   async getAllBooks(): Promise<Book[]> { 
    return await this.bookModel.find().exec();
   }
   async getBookById(id: string): Promise<Book> {
    const book= await this.bookModel.findById(id).exec();
    if(!book){ 
        throw new NotFoundException("Book not found");
    }
    return book;
   }

   async update(input:UpdateBookInput):Promise<Book>{
    const existingBook=await this.bookModel.findById(input._id).exec();
    if(!existingBook){
        throw new NotFoundException("Book not found");
    }
    const { _id, ...updates } = input;
    Object.assign(existingBook,updates);
    return existingBook.save();
   }
async  remove(id:string):Promise<boolean>{
    const result=await this.bookModel.findByIdAndDelete(id)
    if(!result){
        throw new NotFoundException("Book not found");
    }
    return true;
    
}

  
   }