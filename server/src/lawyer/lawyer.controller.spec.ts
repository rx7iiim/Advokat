import { Test, TestingModule } from '@nestjs/testing';
import { LawyerController } from './lawyer.controller';
import { LawyerService } from './lawyer.service';

describe('LawyerController', () => {
  let controller: LawyerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LawyerController],
      providers: [LawyerService],
    }).compile();

    controller = module.get<LawyerController>(LawyerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
