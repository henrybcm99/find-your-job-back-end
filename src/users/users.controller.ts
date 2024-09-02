import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { user as userModule } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() usersService: userModule) {
    return this.usersService.create(usersService);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.usersService.findOne(email);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() usersService: userModule) {
  //   return this.usersService.update(+id, usersService);
  // }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
