import {Entity, Column, PrimaryGeneratedColumn,ManyToMany} from "typeorm";
import {Users} from "./Users.entity"
import {Video} from "./Video.entity"

@Entity()
export class Permission {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    mayWatch: string;

    @ManyToMany(() => Video)
    video: Video[];

    @ManyToMany(() => Users)
    users: Users[];

 
}
