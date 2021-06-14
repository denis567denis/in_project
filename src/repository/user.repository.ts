import { EntityRepository, AbstractRepository, getConnection } from "typeorm";
import { Users } from "../database/entities/Users.entity";
import {Video} from "../database/entities/Video.entity"

@EntityRepository(Users)
export class UsersRepository extends AbstractRepository<Users> {

    createAndSave(firstName: string, lastName: string) {
        const user = new Users();
        user.firstName = firstName;
        user.lastName = lastName;
        return this.manager.save(user);
    }

    findVideoByName(login: string ,firstName: string, lastName: string) {
        const video = getConnection()
        .createQueryBuilder()
        .select("Video")
        .from(Users, "user")
        .where("user.login = :logins and user.firstNames=:firstName and user.lastName=:lastNames" , 
        { logins : login ,firstNames:firstName,lastNames:lastName,})
        .getMany();
        return video;
    }

    getAllUser() {
        const users =  getConnection()
        .createQueryBuilder()
        .select("Users")
        .from(Users, "User")
        .getMany();
        return users;
    }

    getUser(login: string ,firstName: string, lastName: string) {
        const user = getConnection()
        .createQueryBuilder()
        .select("Users")
        .from(Users, "user")
        .where("user.login = :logins and user.firstNames=:firstName and user.lastName=:lastNames" , 
        { logins : login ,firstNames:firstName,lastNames:lastName,})
        .getOne();
        return user;
    }

}