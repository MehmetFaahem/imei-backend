import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, userDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JWTService } from 'src/common/services/jwt.service';
import { CreateCartedProdutsDto } from './dto/create-user-carted.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<userDocument>,
    private jwtService: JWTService,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.userModel.create(createUserDto);
    newUser.password = await this.hashPassword(createUserDto.password);
    await newUser.save();
    return newUser;
  }

  public async addCartedProducts(createDto: CreateCartedProdutsDto) {
    const exists = await this.userModel
      .findOne({
        _id: createDto.user_id,
      })
      .select('_id');
    if (!exists) throw new BadRequestException('Invalid user id.');
    await this.userModel.updateOne(
      { _id: exists._id },
      {
        $addToSet: {
          carted: {
            name: createDto.name,
            company: createDto.company,
            category: createDto.category,
            price: createDto.price,
            quantity: createDto.quantity,
          },
        },
      },
    );
    return exists;
  }

  public async removeCartedProducts(name: string) {
    const exists = await this.userModel.findOne({
      'carted.name': name,
    });
    if (!exists) throw new BadRequestException('Invalid user id.');
    await this.userModel.updateOne(
      { _id: exists._id },
      {
        $pull: {
          carted: {
            name: name,
          },
        },
      },
    );
    return exists;
  }

  public async loginUser(dto: LoginUserDto) {
    const user: User = await this.userModel.findOne({ name: dto.name });
    if (!user)
      throw new BadGatewayException('User not found with the provided email');
    const passMatch = await this.comparePassword(dto.password, user.password);
    if (!passMatch)
      throw new BadRequestException("Your password didn't matched!");
    const accessToken = await this.jwtService.genAccessToken({
      name: user.name,
      phone: user.phone,
    });
    const refreshToken = await this.jwtService.genRefreshToken(user.phone);
    return {
      accessToken,
      refreshToken,
    };
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
  private async comparePassword(
    comparePassword: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(comparePassword, hash);
  }

  async findAllByAdmin() {
    const users = await this.userModel
      .find({})
      .sort({ created_at: -1 })
      .select(['name', 'phone', 'email', 'password', 'carted']);
    return users;
  }

  async findAllByPublic() {
    const users = await this.userModel
      .find({})
      .sort({ created_at: -1 })
      .select(['name', 'phone', 'email', 'password', 'carted']);
    return users;
  }

  async findOneByAdmin(id: string) {
    const user = await this.userModel
      .findOne({ _id: id })
      .select(['name', 'phone', 'email', 'password', 'carted']);

    if (!user) throw new BadRequestException('Invalid ID');
    return user;
  }

  async findOneByPublic(id: string) {
    const user = await this.userModel
      .findOne({ _id: id })
      .select(['name', 'phone', 'email', 'password', 'carted']);

    if (!user) throw new BadRequestException('Invalid ID');
    return user;
  }

  async updateByAdmin(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<userDocument> {
    const user = await this.userModel
      .findOne({ _id: id })
      .select(['name', 'phone', 'email', 'password', 'carted']);

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
