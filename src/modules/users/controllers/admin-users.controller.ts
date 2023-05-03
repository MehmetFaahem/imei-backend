import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from '../dto/login-user.dto';
import { CreateCartedProdutsDto } from '../dto/create-user-carted.dto';

@ApiTags('User')
@ApiResponse({
  status: 201,
  description: 'User has been successfully created.',
})
@ApiResponse({
  status: 404,
  description: 'Something Went Wrong',
})
@Controller('users')
export class AdminUsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create User' })
  @Post('/')
  @ApiBody({
    type: CreateUserDto,
  })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return {
      message: 'User Created Successfully',
      data: user,
    };
  }

  @ApiOperation({ summary: 'User login' })
  @ApiBody({
    type: LoginUserDto,
  })
  @Post('/login')
  async loginUser(@Body() dto: LoginUserDto) {
    const data = await this.usersService.loginUser(dto);
    return {
      message: 'User logged successfully',
      data: data,
    };
  }

  @ApiOperation({ summary: 'Add Carted Produts' })
  @ApiBody({
    type: CreateCartedProdutsDto,
  })
  @ApiResponse({
    status: 201,
    description: 'product has been successfully added.',
  })
  @Post('/carted')
  async addCartedProducts(@Body() createDto: CreateCartedProdutsDto) {
    const ourService = await this.usersService.addCartedProducts(createDto);
    return {
      message: 'carted successfully',
      data: ourService,
    };
  }

  @ApiOperation({ summary: 'Remove Carted Produts' })
  @ApiResponse({
    status: 201,
    description: 'product has been successfully removed',
  })
  @Delete('/carted/:name')
  async removeCartedProducts(@Param('name') name: string) {
    const ourService = await this.usersService.removeCartedProducts(name);
    return {
      message: 'removed successfully',
      data: ourService,
    };
  }

  @Get('/')
  async findAll() {
    const users = await this.usersService.findAllByAdmin();
    return {
      message: 'Users Fetched Successfully',
      data: users,
    };
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOneByAdmin(id);
    return {
      message: 'Users Fetched Successfully',
      data: user,
    };
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.updateByAdmin(id, updateUserDto);
    return {
      message: 'User Updated Successfully',
      data: user,
    };
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const user = await this.usersService.removeByAdmin(id);
    return {
      message: 'User Removed Successfully',
      data: user,
    };
  }
}
