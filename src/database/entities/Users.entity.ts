import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import {Video} from "./Video.entity";
import {Permission} from "./Permission.entity";

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    firstName: string;

    @Column("varchar")
    lastName: string;

    @Column("varchar", { length: 10 })
    login: string;

    @Column("varchar", { length: 10 })
    password: string;

    @OneToMany(type => Video, video => video.users) 
    video: Video[];
    
    @OneToMany(type => Permission, permission => permission.users) 
    permission: Permission[];  

}
