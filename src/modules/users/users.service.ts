import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, userDocument } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<userDocument>,
  ) {}

  public async create(createUserDto: CreateUserDto) {
    const newUser = await this.userModel.create({ ...createUserDto });
    await newUser.save();
    return newUser;
  }

  async findAllByAdmin() {
    const users = await this.userModel
      .find({})
      .sort({ created_at: -1 })
      .select(['name', 'phone', 'email', 'password']);
    return users;
  }

  async findAllByPublic() {
    const users = await this.userModel
      .find({})
      .sort({ created_at: -1 })
      .select(['name', 'phone', 'email', 'password']);
    return users;
  }

  async findOneByAdmin(id: string) {
    const user = await this.userModel
      .findOne({ _id: id })
      .select(['name', 'phone', 'email', 'password']);

    if (!user) throw new BadRequestException('Invalid ID');
    return user;
  }

  async findOneByPublic(id: string) {
    const user = await this.userModel
      .findOne({ _id: id })
      .select(['name', 'phone', 'email', 'password']);

    if (!user) throw new BadRequestException('Invalid ID');
    return user;
  }

  async updateByAdmin(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<userDocument> {
    const user = await this.userModel
      .findOne({ _id: id })
      .select(['name', 'phone', 'email', 'password']);

    if (!user) throw new BadRequestException('Invalid ID');

    Object.keys(updateUserDto).forEach((key) => {
      user[key] = updateUserDto[key];
    });

    await user.save();

    return user;
  }

  async removeByAdmin(id: string) {
    const user = await this.userModel
      .findOneAndRemove({ _id: id })
      .select(['_id']);

    if (!user) throw new BadRequestException('Invalid ID');
    return user;
  }
}
