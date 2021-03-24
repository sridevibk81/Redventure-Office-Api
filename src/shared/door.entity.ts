import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {User} from "./user.entity";

@Entity({ name: 'door' })
export class Door {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    doorId: string;

    @ManyToOne(type => User, user => user.doors)
    user: User;

}