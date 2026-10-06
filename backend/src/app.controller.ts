import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('users')
export class AppController {

  private users = [
    {
      id: 1,
      name: 'Linh',
      email: 'linh@gmail.com',
    },
    {
      id: 2,
      name: 'Nam',
      email: 'nam@gmail.com',
    },
  ];

  @Get()
  getUsers() {
    return this.users;
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.users.find(
      user => user.id === Number(id)
    );
  }

  @Post()
  createUser(@Body() body: any) {
    const newUser = {
      id: this.users.length + 1,
      name: body.name,
      email: body.email,
    };

    this.users.push(newUser);

    return newUser;
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    const user = this.users.find(
      user => user.id === Number(id)
    );

    if (!user) {
      return {
        message: 'User not found',
      };
    }

    user.name = body.name;
    user.email = body.email;

    return user;
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    const index = this.users.findIndex(
      user => user.id === Number(id)
    );

    if (index === -1) {
      return {
        message: 'User not found',
      };
    }

    const deletedUser = this.users.splice(index, 1);

    return {
      message: 'User deleted',
      user: deletedUser[0],
    };
  }
  
}