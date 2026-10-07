import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowedRecord } from './borrowed-record.entity.js';
import { Book } from '../books/book.entity.js';
import { Reader } from '../readers/reader.entity.js';
import { BorrowService } from './borrow.service.js';
import { BorrowController } from './borrow.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([BorrowedRecord, Book, Reader])],
  providers: [BorrowService],
  controllers: [BorrowController],
})
export class BorrowModule {}