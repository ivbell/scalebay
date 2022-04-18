import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    login: string

    @Column()
    password: string

    @Column()
    email: string

    @Column({ default: false })
    confirm: boolean

    @Column()
    confirm_link: string
}
