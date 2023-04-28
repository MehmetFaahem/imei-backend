import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { AdminUsersController } from './controllers/admin-users.controller';
import { JWTService } from 'src/common/services/jwt.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AdminUsersController],
  providers: [UsersService, JWTService],
  exports: [UsersService],
})
export class UsersModule {}
