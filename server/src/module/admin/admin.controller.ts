import { Body, Controller, Get, Param, Request, Post, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuards } from '../auth/guards/jwt.guards'
import { AdminService } from './admin.service'
import { LoginAdminDto } from './dto/admin.dto'

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Post()
    login(@Body() dto: LoginAdminDto) {
        return this.adminService.findAdmin(dto.email, dto.password)
    }

    @UseGuards(JwtAuthGuards)
    @Get('user')
    getAllUser(@Request() req, @Query() query) {
        return this.adminService.findAllUser(+query.take, +query.skip, +req.user.id)
    }
}
