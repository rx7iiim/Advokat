import { Test, TestingModule } from '@nestjs/testing';
import { LawyerService } from './lawyer.service';

describe('LawyerService', () => {
  let service: LawyerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LawyerService],
    }).compile();

    service = module.get<LawyerService>(LawyerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
