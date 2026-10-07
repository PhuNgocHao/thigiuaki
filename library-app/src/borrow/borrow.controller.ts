import { Body, Controller, Get, Post } from '@nestjs/common';
import { BorrowService } from './borrow.service.js';
import { BorrowBookDto } from './dto/borrow-book.dto.js';

@Controller('borrow')
export class BorrowController {
  constructor(private readonly service: BorrowService) {}

  @Post()            // POST /borrow
  borrow(@Body() dto: BorrowBookDto) { return this.service.borrow(dto); }

  @Get('books')      // GET /borrow/books
  borrowedBooks() { return this.service.findBorrowedBooks(); }
}