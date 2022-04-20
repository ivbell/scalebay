import { forwardRef, Module } from '@nestjs/common'
import { AdminService } from './admin.service'
import { AdminController } from './admin.controller'
import { Admin } from './entities/admin.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../auth/auth.module'
import { UserModule } from '../user/user.module'

@Module({
    imports: [
        TypeOrmModule.forFeature([Admin]),
        forwardRef(() => AuthModule),
        forwardRef(() => UserModule),
    ],
    controllers: [AdminController],
    providers: [AdminService],
    exports: [AdminService],
})
export class AdminModule {}
