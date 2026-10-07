import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity.js';
import { BooksService } from './books.service.js';
import { BooksController } from './books.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [BooksService],
  controllers: [BooksController],
  exports: [TypeOrmModule],
})
export class BooksModule {}