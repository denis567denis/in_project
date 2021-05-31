import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";
import {Users} from "./Users"
import {Objects_video} from "./Objects_video"

@Entity()
export class Permission {

    @PrimaryGeneratedColumn("int")
    id: number;

    @Column("varchar")
    may_watch: string;

    @ManyToOne(type => Users, users => users.permission) users: Users; 
    @ManyToOne(type => Objects_video, objects_video => objects_video.permission) objects_video: Objects_video;
}
