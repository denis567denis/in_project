import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";
import {Users} from "./Users"
import {Permission} from "./Permission";

@Entity()
export class Objects_video {

    @PrimaryGeneratedColumn("int")
    id: number;

    @Column("varchar")
    name_video: string;

    @ManyToOne(type => Users, users => users.objects) users: Users; 
    @OneToMany(type => Permission, permission => permission.users) permission: Permission[];  
}
