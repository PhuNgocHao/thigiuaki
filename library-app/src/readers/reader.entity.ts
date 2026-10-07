import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BorrowedRecord } from '../borrow/borrowed-record.entity.js';

@Entity('readers')
export class Reader {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @OneToMany(() => BorrowedRecord, (r) => r.reader)
  records: BorrowedRecord[];
}