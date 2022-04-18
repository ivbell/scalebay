import { IsEmail, IsEmpty, IsString, MinLength } from 'class-validator'

export class CreateUserDto {
    @IsEmpty()
    @IsString()
    readonly login: string

    @IsEmpty()
    @MinLength(8)
    readonly password: string

    @IsEmpty()
    @IsEmail()
    readonly email: string
}
