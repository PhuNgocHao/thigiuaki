import { Body, Controller, Get, Post } from '@nestjs/common';
import { BooksService } from './books.service.js';
import { Book } from './book.entity.js';

@Controller('books')
export class BooksController {
  constructor(private readonly service: BooksService) {}

  @Post() create(@Body() body: Partial<Book>) { return this.service.create(body); }
  @Get() findAll() { return this.service.findAll(); }
}