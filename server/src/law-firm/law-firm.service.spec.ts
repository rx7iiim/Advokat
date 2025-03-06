import { Test, TestingModule } from '@nestjs/testing';
import { LawFirmService } from './law-firm.service';

describe('LawFirmService', () => {
  let service: LawFirmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LawFirmService],
    }).compile();

    service = module.get<LawFirmService>(LawFirmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
