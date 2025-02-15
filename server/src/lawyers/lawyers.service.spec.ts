import { Test, TestingModule } from '@nestjs/testing';
import { LawyersService } from './lawyers.service';

describe('LawyersService', () => {
  let service: LawyersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LawyersService],
    }).compile();

    service = module.get<LawyersService>(LawyersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
