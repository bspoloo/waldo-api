import { Test, TestingModule } from '@nestjs/testing';
import { HistoryKidsController } from './history_kids.controller';
import { HistoryKidsService } from './history_kids.service';

describe('HistoryKidsController', () => {
  let controller: HistoryKidsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoryKidsController],
      providers: [HistoryKidsService],
    }).compile();

    controller = module.get<HistoryKidsController>(HistoryKidsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
