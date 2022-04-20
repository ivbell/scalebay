import { User } from '../entities/user.entity'

export type UserOutput = Omit<User, 'password' | 'confirm_link'>

export const toUser = (user: User): UserOutput => ({
    id: user.id,
    login: user.login,
    email: user.email,
    confirm: user.confirm,
})
