import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReadersService } from './readers.service.js';
import { Reader } from './reader.entity.js';

@Controller('readers')
export class ReadersController {
  constructor(private readonly service: ReadersService) {}

  @Post() create(@Body() body: Partial<Reader>) { return this.service.create(body); }
  @Get() findAll() { return this.service.findAll(); }
}