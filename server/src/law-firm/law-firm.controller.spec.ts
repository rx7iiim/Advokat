import { Test, TestingModule } from '@nestjs/testing';
import { LawFirmController } from './law-firm.controller';
import { LawFirmService } from './law-firm.service';

describe('LawFirmController', () => {
  let controller: LawFirmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LawFirmController],
      providers: [LawFirmService],
    }).compile();

    controller = module.get<LawFirmController>(LawFirmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
