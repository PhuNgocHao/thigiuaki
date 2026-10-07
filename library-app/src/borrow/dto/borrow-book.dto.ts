import { IsInt, IsOptional, Min } from 'class-validator';

export class BorrowBookDto {
  @IsInt() readerId: number;
  @IsInt() bookId: number;

  @IsOptional() @IsInt() @Min(1)
  days?: number; // số ngày mượn, mặc định 14
}