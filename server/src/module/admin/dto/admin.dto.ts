import { IsEmail } from 'class-validator'

export class LoginAdminDto {
    @IsEmail()
    readonly email: string
    
    readonly password: string
}
