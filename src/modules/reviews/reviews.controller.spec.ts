import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from './reviews.service';
import { AdminReviewsController } from './controllers/admin-reviews.controller';

describe('ReviewsController', () => {
  let controller: AdminReviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminReviewsController],
      providers: [ReviewsService],
    }).compile();

    controller = module.get<AdminReviewsController>(AdminReviewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
