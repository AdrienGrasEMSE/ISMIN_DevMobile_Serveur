import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import type { Book } from './Book';
import { BookDto } from './Book.dto';
import { BookService } from './book.service';

@Controller('/books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  createBook(@Body() bookDto: BookDto): Book {
    this.bookService.addBook({
      isbn:   bookDto.isbn,
      author: bookDto.author,
      title:  bookDto.title,
      date:   bookDto.date,
    });
    return this.bookService.getBook(bookDto.isbn);
  }


  @Get()
  getBooks(@Query('author') author: string): Book[] {
    if (author) {
      return this.bookService.getBooksOf(author);
    }
    return this.bookService.getAllBooks();
  }


  @Delete()
  deleteAllBook(): void {
    this.bookService.removeAll();
  }


  @Get(':isbn')
  getBook(@Param('isbn') isbn: string): Book {
    return this.bookService.getBook(isbn);
  }


  @Delete(':isbn')
  deleteBook(@Param('isbn') isbn: string): void {
    this.bookService.remove(isbn);
  }


  @Post('search')
  @HttpCode(200)
  searchBooks(@Body() { term }: { term: string }): Book[] {
    return this.bookService.search(term);
  }
}
