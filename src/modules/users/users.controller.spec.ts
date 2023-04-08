import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AdminUsersController } from './controllers/admin-users.controller';

describe('UsersController', () => {
  let controller: AdminUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminUsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<AdminUsersController>(AdminUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
