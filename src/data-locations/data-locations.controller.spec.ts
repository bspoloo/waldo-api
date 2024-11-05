import { Test, TestingModule } from '@nestjs/testing';
import { DataLocationsController } from './data-locations.controller';
import { DataLocationsService } from './data-locations.service';

describe('DataLocationsController', () => {
  let controller: DataLocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataLocationsController],
      providers: [DataLocationsService],
    }).compile();

    controller = module.get<DataLocationsController>(DataLocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
