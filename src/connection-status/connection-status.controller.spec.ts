import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionStatusController } from './connection-status.controller';
import { ConnectionStatusService } from './connection-status.service';

describe('ConnectionStatusController', () => {
  let controller: ConnectionStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConnectionStatusController],
      providers: [ConnectionStatusService],
    }).compile();

    controller = module.get<ConnectionStatusController>(ConnectionStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
