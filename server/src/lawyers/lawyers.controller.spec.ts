import { Test, TestingModule } from '@nestjs/testing';
import { LawyersController } from './lawyers.controller';
import { LawyersService } from './lawyers.service';

describe('LawyersController', () => {
  let controller: LawyersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LawyersController],
      providers: [LawyersService],
    }).compile();

    controller = module.get<LawyersController>(LawyersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
