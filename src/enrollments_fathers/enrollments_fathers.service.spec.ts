import { Test, TestingModule } from '@nestjs/testing';
import { EnrollmentsFathersService } from './enrollments_fathers.service';

describe('EnrollmentsFathersService', () => {
  let service: EnrollmentsFathersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnrollmentsFathersService],
    }).compile();

    service = module.get<EnrollmentsFathersService>(EnrollmentsFathersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
