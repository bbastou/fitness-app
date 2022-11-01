import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { FitnessService } from './fitness/fitness.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: AuthService,
          useValue: {},
        },
        {
          provide: FitnessService,
          useValue: {},
        },
      ],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  describe('app service', () => {
    it('should be defined', () => {
      expect(appService).toBeDefined();
    });
  });
});
