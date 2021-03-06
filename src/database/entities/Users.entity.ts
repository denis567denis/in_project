import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable ,JoinColumn,OneToOne} from "typeorm";
import {Video} from "./Video.entity";
import {Permission} from "./Permission.entity";
import {Token} from "./Token.entity"
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
    permission: Permission[] | null;;

    @ManyToMany(() => Video)
    @JoinTable()
    video: Video[] | null;;

    @OneToOne(() => Token, token => token.user) 
    @JoinTable()
    token: Token | null;;

    
}
