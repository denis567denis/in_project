import { Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import { validate } from "class-validator";

import { Users } from "../database/entities/Users.entity";

class UserController{
 
  public async getAllUser():Promise<Users[]>{
    return await getRepository(Users)
    .createQueryBuilder("user")
    .getMany();
  }
  
  public async getUserById(userId:number):Promise<Users>{
    return await getRepository(Users)
    .createQueryBuilder("users")
    .where("users.id = :id", { id:userId})
    .getOne();
  }

  public async newUser(user:Users):Promise<void>{
    await getConnection().manager.save(user);
  } 

  public async UpdateUser(user:Users):Promise<void>{
    await getConnection()
    .createQueryBuilder()
    .update(Users)
    .set({ video:user.video ,permission:user.permission,
      lastName:user.lastName,firstName:user.firstName,
    password:user.password,login:user.password ,rol:user.rol})
    .where("id = :id", { id: user.id })
    .execute();
  }
  public async deleteUsers(users:Users):Promise<void>{
    const videoRepository = getRepository(Users);
    videoRepository.delete(users.id);
  }
};
export const userController = new UserController()
