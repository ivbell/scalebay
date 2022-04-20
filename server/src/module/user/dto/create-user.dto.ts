import { IsEmail, IsEmpty, IsString, MinLength } from 'class-validator'

export class CreateUserDto {
    @IsString()
    readonly login: string

    @MinLength(8)
    readonly password: string

    @IsEmail()
    readonly email: string
}
