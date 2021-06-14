import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import {Users} from "./Users.entity"
import {Video} from "./Video.entity"

@Entity()
export class Permission {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    mayWatch: string;

    @ManyToOne(type => Users, users => users.permission) 
    users: Users;

    @ManyToOne(type => Video, video => video.permission) 
    video: Video;
}
