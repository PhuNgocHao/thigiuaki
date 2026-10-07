import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { BorrowedRecord } from '../borrow/borrowed-record.entity.js';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @OneToMany(() => BorrowedRecord, (r) => r.book)
  records: Relation<BorrowedRecord>[];
}