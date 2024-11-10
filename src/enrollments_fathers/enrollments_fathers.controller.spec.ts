import { Test, TestingModule } from '@nestjs/testing';
import { EnrollmentsFathersController } from './enrollments_fathers.controller';
import { EnrollmentsFathersService } from './enrollments_fathers.service';

describe('EnrollmentsFathersController', () => {
  let controller: EnrollmentsFathersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnrollmentsFathersController],
      providers: [EnrollmentsFathersService],
    }).compile();

    controller = module.get<EnrollmentsFathersController>(EnrollmentsFathersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
