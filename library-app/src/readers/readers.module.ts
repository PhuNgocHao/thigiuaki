import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reader } from './reader.entity.js';
import { ReadersService } from './readers.service.js';
import { ReadersController } from './readers.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Reader])],
  providers: [ReadersService],
  controllers: [ReadersController],
  exports: [TypeOrmModule],
})
export class ReadersModule {}