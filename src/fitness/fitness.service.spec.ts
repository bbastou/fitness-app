import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getRedisToken } from '@liaoliaots/nestjs-redis';

import { FitnessService } from './fitness.service';
import { Category } from './category.entity';

describe('FitnessService', () => {
  let service: FitnessService;
  let get: jest.Mock;
  let set: jest.Mock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FitnessService,
        {
          provide: getRepositoryToken(Category),
          useValue: {},
        },
        {
          provide: getRedisToken('default'),
          useValue: {
            get,
            set,
          },
        },
      ],
    }).compile();

    service = module.get<FitnessService>(FitnessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
