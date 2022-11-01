import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

import { Category } from './category.entity';

@Injectable()
export class FitnessService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRedis() private readonly client: Redis,
  ) {}

  async findAll(): Promise<Category[]> {
    const cachedCategories = await this.client.get('categories');

    if (cachedCategories) {
      return JSON.parse(cachedCategories);
    }

    const categories = await this.categoriesRepository.find({
      relations: {
        programs: {
          exercises: true,
        },
      },
    });

    await this.client.set('categories', JSON.stringify(categories), 'EX', 10);

    return categories;
  }
}
