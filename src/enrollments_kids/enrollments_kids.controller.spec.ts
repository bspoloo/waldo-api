import { Test, TestingModule } from '@nestjs/testing';
import { EnrollmentsKidsController } from './enrollments_kids.controller';
import { EnrollmentsKidsService } from './enrollments_kids.service';

describe('EnrollmentsKidsController', () => {
  let controller: EnrollmentsKidsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnrollmentsKidsController],
      providers: [EnrollmentsKidsService],
    }).compile();

    controller = module.get<EnrollmentsKidsController>(EnrollmentsKidsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
