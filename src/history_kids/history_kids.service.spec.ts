import { Test, TestingModule } from '@nestjs/testing';
import { HistoryKidsService } from './history_kids.service';

describe('HistoryKidsService', () => {
  let service: HistoryKidsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoryKidsService],
    }).compile();

    service = module.get<HistoryKidsService>(HistoryKidsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
