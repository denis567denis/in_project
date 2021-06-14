import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm";
import {Users} from "./Users.entity"
import {Permission} from "./Permission.entity";

@Entity()
export class Video {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    videoName: string;

    @ManyToOne(type => Users, users => users.video) 
    users: Users; 
    
    @OneToMany(type => Permission, permission => permission.users) 
    permission: Permission[];  
}
