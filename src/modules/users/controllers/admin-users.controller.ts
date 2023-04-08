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
