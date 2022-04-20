import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AdminJwt, AdminOutput } from '../admin/admin.service'
import { UserOutput } from '../user/dto/mapper.user'
import { UserService } from '../user/user.service'

export type UserJWT = {
    id: number
}

export type UserJwtOutput = {
    access_token: string
}

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<UserOutput> {
        const reg = /^.+@.+\..+$/gm
        const isEmail = reg.test(username)

        if (!isEmail) {
            return await this.userService.findOneByLoginAndPassword(username, password)
        }
        return await this.userService.findByEmailAndPassword(username, password)
    }

    async login(user: UserOutput): Promise<UserJwtOutput> {
        const payload: UserJWT = { id: user.id }
        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    async loginAdmin(admin: AdminOutput): Promise<AdminJwt> {
        const payload: UserJWT = { id: admin.id }
        return {
            admin_access_token: this.jwtService.sign(payload),
        }
    }
}
