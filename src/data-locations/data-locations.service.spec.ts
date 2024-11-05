import { Test, TestingModule } from '@nestjs/testing';
import { DataLocationsService } from './data-locations.service';

describe('DataLocationsService', () => {
  let service: DataLocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataLocationsService],
    }).compile();

    service = module.get<DataLocationsService>(DataLocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
