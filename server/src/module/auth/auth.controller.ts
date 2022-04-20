import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuards } from './guards/local.guards'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuards)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user)
    }
}
