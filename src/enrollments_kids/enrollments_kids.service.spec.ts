import { Test, TestingModule } from '@nestjs/testing';
import { EnrollmentsKidsService } from './enrollments_kids.service';

describe('EnrollmentsKidsService', () => {
  let service: EnrollmentsKidsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnrollmentsKidsService],
    }).compile();

    service = module.get<EnrollmentsKidsService>(EnrollmentsKidsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
