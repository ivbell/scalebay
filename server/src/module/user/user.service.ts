import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { AuthService, UserJwtOutput } from '../auth/auth.service'
import { MailService } from '../mail/mail.service'
import { CreateUserDto } from './dto/create-user.dto'
import { toUser, UserOutput } from './dto/mapper.user'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private readonly mailService: MailService,
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService
    ) {}

    async create(dto: CreateUserDto): Promise<UserJwtOutput | HttpException | UserOutput> {
        const isUniqueLoginAndEmail = await this.uniqueLoginOrEmail(dto.login, dto.email)

        if (!isUniqueLoginAndEmail) {
            return new HttpException('Login or email not unique', HttpStatus.BAD_REQUEST)
        }

        const user = new User()
        const salt = 15
        const hashPass = await bcrypt.hash(dto.password, salt)

        user.login = dto.login
        user.confirm_link = uuid()
        user.email = dto.email
        user.password = hashPass

        await this.mailService.sendConfirmEmail({
            email: user.email,
            name: user.login,
            confirmId: user.confirm_link,
        })

        await this.userRepository.save(user)

        return await this.authService.login(user)
    }

    async uniqueLoginOrEmail(login: string, email: string): Promise<boolean> {
        const userEmail = await this.userRepository.findOne({ email: email })
        const userLogin = await this.userRepository.findOne({ login: login })
        if (userEmail || userLogin) {
            return false
        } else {
            return true
        }
    }

    async findOneByLoginAndPassword(login: string, password: string): Promise<UserOutput> {
        const user = await this.userRepository.findOne({ login })

        if (!user) {
            return null
        }

        const pass = await bcrypt.compare(password, user.password)

        if (user && pass) {
            return toUser(user)
        }
        return null
    }

    async findByEmailAndPassword(email: string, password: string): Promise<UserOutput> {
        const user = await this.userRepository.findOne({ email })

        if (!user) {
            return null
        }

        const pass = await bcrypt.compare(password, user.password)

        if (user && pass) {
            return toUser(user)
        }
        return null
    }

    async findOneUserById(id: number): Promise<UserOutput> {
        const user = await this.userRepository.findOne(id)
        return toUser(user)
    }

    async getUserCount(take: number, skip: number): Promise<any> {
        const takes = take || 10
        const skips = skip || 0
        const [result, total] = await this.userRepository.findAndCount({
            take: takes,
            skip: skips,
        })

        const sendResult: UserOutput[] = []

        await result.map((el) => {
            const user = toUser(el)
            sendResult.push(user)
        })
        return {
            data: sendResult,
            count: total,
        }
    }

    async confirmUser(confirmId: string): Promise<HttpException> {
        const user = await this.userRepository.findOne({ confirm_link: confirmId })
        if (!user) {
            return new HttpException(
                'Где-то, тчо-то сломалось и мы отправим вас домой',
                HttpStatus.BAD_REQUEST
            )
        }

        user.confirm = true

        await this.userRepository.save(user)
        return new HttpException('Учётная запись подтверждена', HttpStatus.OK)
    }
}
