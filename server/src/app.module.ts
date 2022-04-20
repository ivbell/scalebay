import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import configuration from './config/configuration'
import { AdminModule } from './module/admin/admin.module'
import { AuthModule } from './module/auth/auth.module'
import { UserModule } from './module/user/user.module'
import { MailModule } from './module/mail/mail.module'
import { MailerModule } from '@nestjs-modules/mailer'
import { getMailConfig } from './module/mail/mail.config'

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `${process.cwd()}/src/config/env/.env`,
            load: [configuration],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('database.host'),
                port: +configService.get<number>('database.port'),
                username: configService.get<string>('database.username'),
                password: configService.get<string>('database.password'),
                database: configService.get<string>('database.name'),
                synchronize: true,
                autoLoadEntities: true,
            }),
            inject: [ConfigService],
        }),
        UserModule,
        AuthModule,
        AdminModule,
        MailModule,
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getMailConfig,
        }),
    ],
})
export class AppModule {}
