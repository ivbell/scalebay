import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    login: string

    @Column()
    password: string

    @Column({unique: true})
    email: string

    @Column({ default: false })
    confirm: boolean

    @Column()
    confirm_link: string
}
