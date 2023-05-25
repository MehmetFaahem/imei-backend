import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { AdminUsersController } from './controllers/admin-users.controller';

import { CloudinaryProvider } from '../../common/cloudinary/cloudinary/cloudinary.provider';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AdminUsersController],
  providers: [UsersService, CloudinaryProvider],
  exports: [UsersService, CloudinaryProvider],
})
export class UsersModule {}
