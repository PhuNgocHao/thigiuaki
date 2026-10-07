import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { BorrowedRecord } from './borrowed-record.entity.js';
import { Book } from '../books/book.entity.js';
import { Reader } from '../readers/reader.entity.js';
import { BorrowBookDto } from './dto/borrow-book.dto.js';

@Injectable()
export class BorrowService {
  constructor(
    @InjectRepository(BorrowedRecord) private recordRepo: Repository<BorrowedRecord>,
    @InjectRepository(Book) private bookRepo: Repository<Book>,
    @InjectRepository(Reader) private readerRepo: Repository<Reader>,
  ) {}

  async borrow(dto: BorrowBookDto) {
    const reader = await this.readerRepo.findOneBy({ id: dto.readerId });
    if (!reader) throw new NotFoundException('Không tìm thấy độc giả');

    const book = await this.bookRepo.findOneBy({ id: dto.bookId });
    if (!book) throw new NotFoundException('Không tìm thấy sách');

    const active = await this.recordRepo.findOne({
      where: { book: { id: book.id }, returnDate: IsNull() },
    });
    if (active) throw new BadRequestException('Sách này đang được mượn');

    const borrowDate = new Date();
    const dueDate = new Date(borrowDate);
    dueDate.setDate(dueDate.getDate() + (dto.days ?? 14));

    const record = this.recordRepo.create({
      book, reader, borrowDate, dueDate, returnDate: null,
    });
    return this.recordRepo.save(record);
  }

  async findBorrowedBooks() {
    const records = await this.recordRepo.find({
      where: { returnDate: IsNull() },
      relations: { book: true, reader: true },
      order: { borrowDate: 'DESC' },
    });

    return records.map((r) => ({
      bookId: r.book.id,
      title: r.book.title,
      author: r.book.author,
      borrowDate: r.borrowDate,
      readerName: r.reader.name,
      dueDate: r.dueDate,
    }));
  }
}