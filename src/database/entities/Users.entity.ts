import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable} from "typeorm";
import {Video} from "./Video.entity";
import {Permission} from "./Permission.entity";
import bcrypt from "bcryptjs";

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    firstName: string;

    @Column("varchar")
    lastName: string;

    @Column("varchar", { length: 8 })
    login: string;

    @Column("varchar", { length: 8 })
    password: string;

    @Column("varchar")
    rol: string;


    @ManyToMany(() => Permission)
    @JoinTable()
    permission: Permission[];

    @ManyToMany(() => Video)
    @JoinTable()
    video: Video[];

    
}
