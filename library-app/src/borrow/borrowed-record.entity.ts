import * as typeorm from 'typeorm';
import { Book } from '../books/book.entity.js';
import { Reader } from '../readers/reader.entity.js';

@typeorm.Entity('borrowed_records')
export class BorrowedRecord {
  @typeorm.PrimaryGeneratedColumn()
  id: number;

  @typeorm.ManyToOne(() => Book, (b) => b.records, { nullable: false })
  book: typeorm.Relation<Book>;

  @typeorm.ManyToOne(() => Reader, (r) => r.records, { nullable: false })
  reader: typeorm.Relation<Reader>;

  @typeorm.Column({ type: 'datetime' })
  borrowDate: Date;

  @typeorm.Column({ type: 'datetime' })
  dueDate: Date;

  @typeorm.Column({ type: 'datetime', nullable: true })
  returnDate: Date | null;
}