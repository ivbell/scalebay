import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'
import { AuthService } from '../auth/auth.service'
import { UserService } from '../user/user.service'
import { toAdmin } from './dto/admin.mapper'
import { Admin } from './entities/admin.entity'

export type AdminJwt = {
    admin_access_token: string
}

export type AdminOutput = Omit<Admin, 'password'>

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private adminRepository: Repository<Admin>,
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService
    ) {}

    async findAdmin(login: string, password: string): Promise<AdminJwt> {
        const admin = await this.adminRepository.findOne({ email: login })
        if (!admin) {
            return null
        }

        const pass = await bcrypt.compare(password, admin.password)

        if (admin && pass) {
            return this.authService.loginAdmin(toAdmin(admin))
        }

        return null
    }

    async findAllUser(take: number, skip: number, id: number): Promise<any> {
        const admin = await this.adminRepository.findOne(id)
        if (!admin) {
            return new HttpException('Нет доступа', HttpStatus.BAD_REQUEST)
        }
        return this.userService.getUserCount(take, skip)
    }
}
