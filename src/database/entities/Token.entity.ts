import {Entity, Column, PrimaryGeneratedColumn,OneToOne} from "typeorm";
import {Users} from "./Users.entity"

@Entity()
export class Token {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    refreshToken: string

    @OneToOne(() => Users, user => user.token) // specify inverse side as a second parameter
    user: Users;

}