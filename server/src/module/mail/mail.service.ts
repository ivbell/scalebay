import { MailerService } from '@nestjs-modules/mailer'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ConfirmEmailDTO } from './mail.dto'

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService
    ) {}
    async sendConfirmEmail(dto: ConfirmEmailDTO) {
        const url = this.configService.get<string>('front_url')
        const urlConfirmAddress = `${url}/confirm/user/${dto.confirmId}`

        return await this.mailerService
            .sendMail({
                to: dto.email,
                subject: 'Подтверждение регистрации',
                template: 'confirmReg',
                context: {
                    id: dto.confirmId,
                    username: dto.name,
                    urlConfirmAddress: urlConfirmAddress,
                },
            })
            .catch((e) => {
                throw new HttpException(
                    `Ошибка работы почты: ${e}`,
                    HttpStatus.UNPROCESSABLE_ENTITY
                )
            })
    }
}
