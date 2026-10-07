import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reader } from './reader.entity.js';

@Injectable()
export class ReadersService {
  constructor(@InjectRepository(Reader) private repo: Repository<Reader>) {}

  create(data: Partial<Reader>) { return this.repo.save(this.repo.create(data)); }
  findAll() { return this.repo.find(); }
}