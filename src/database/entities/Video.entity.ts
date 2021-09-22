import {Entity, Column, PrimaryGeneratedColumn, ManyToMany,JoinTable} from "typeorm";
import {Users} from "./Users.entity"
import {Permission} from "./Permission.entity";

@Entity()
export class Video {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    videoName: string;

    @ManyToMany(() => Permission)
    @JoinTable()
    permission: Permission[];

    @ManyToMany(() => Users)
    users: Users[];

}
