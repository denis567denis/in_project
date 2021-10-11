import {connection,dbManager} from "../database/connection/connection.database.connection"

import { Users } from "../database/entities/Users.entity";
import { Video } from "../database/entities/Video.entity";
import { NotFoundError } from "../error/NotFoundError";
import { UnauthorizedError } from "../error/UnauthorizedError";

class UserRepository{
 

  public async findUserByLoginAndPassword(login:string ,password:string):Promise<Users>{
    let user : Users;
     user = await dbManager.findOne(Users,{login}); 
     if (!user) {
			throw new NotFoundError(`No such user`);
		}
     if(password!=user.password){
      throw new UnauthorizedError(`No such user`);
     }
    return user;
  }

  public async getAllUser():Promise<Users[]>{
    return await connection.getRepository(Users)
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.video", "video")
    .leftJoinAndSelect("user.permission", "permission")
    .getMany();
  }


  public async getUserById(userId:number):Promise<Users>{
    return await connection.getRepository(Users)
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.permission","permission")
    .leftJoinAndSelect("user.video", "video")
    .where("user.id = :id", { id:userId})
    .getOne();
  }

  public async saveUser(user:Users):Promise<void>{
    await dbManager.save(user);
  } 

  public async UpdateUser(user:Users):Promise<void>{
    const userRepository = connection.getRepository(Users);
    userRepository.update(user.id,{video:user.video ,permission:user.permission,
      lastName:user.lastName,firstName:user.firstName,
    password:user.password,login:user.password ,rol:user.rol,token:user.token});
  }
  public async deleteUsers(users:Users):Promise<void>{
    const userRepository = connection.getRepository(Users);
    userRepository.delete(users.id);
  }
};
export const userRepository = new UserRepository()
