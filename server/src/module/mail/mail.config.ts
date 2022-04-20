import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter'
import { ConfigService } from '@nestjs/config'

export const getMailConfig = async (configService: ConfigService): Promise<any> => {
    const transport = configService.get<string>('mail.transport')

    const mailFromName = configService.get<string>('mail.name')
    const mailFromAddress = configService.get<string>('mail.from')

    return {
        transport,
        defaults: {
            from: `"${mailFromName}" <${mailFromAddress}>`,
        },
        template: {
            adapter: new EjsAdapter(),
            dir: __dirname + '/templates',
            options: {
                strict: false,
            },
        },
    }
}
