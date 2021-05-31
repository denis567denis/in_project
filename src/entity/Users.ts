import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";
import {Objects_video} from "./Objects_video";
import {Permission} from "./Permission";

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

    @OneToMany(type => Objects_video, objects_video => objects_video.users) objects_video: Objects[];
    
    @OneToMany(type => Permission, permission => permission.users) permission: Permission[];  

}
