import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module.js';
import { ReadersModule } from './readers/readers.module.js';
import { BorrowModule } from './borrow/borrow.module.js';
import { Book } from './books/book.entity.js';
import { Reader } from './readers/reader.entity.js';
import { BorrowedRecord } from './borrow/borrowed-record.entity.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: 'mysql',
        host: cfg.get<string>('DB_HOST'),
        port: Number(cfg.get('DB_PORT')),
        username: cfg.get<string>('DB_USER'),
        password: cfg.get<string>('DB_PASS'),
        database: cfg.get<string>('DB_NAME'),
        ssl: { rejectUnauthorized: false },
        entities: [Book, Reader, BorrowedRecord],
        synchronize: true,
      }),
    }),
    BooksModule,
    ReadersModule,
    BorrowModule,
  ],
})
export class AppModule {}