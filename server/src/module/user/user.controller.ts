import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common'
import { JwtAuthGuards } from '../auth/guards/jwt.guards'
import { CreateUserDto } from './dto/create-user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto)
    }

    @UseGuards(JwtAuthGuards)
    @Get()
    getUser(@Request() req) {
        return this.userService.findOneUserById(+req.user.id)
    }

    @Get('/confirm/:id')
    confirmUser(@Param('id') id: string) {
        return this.userService.confirmUser(id)
    }
}
