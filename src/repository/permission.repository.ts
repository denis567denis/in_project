import {connection,dbManager} from "../database/connection/connection.database.connection"

import {Permission} from "../database/entities/Permission.entity";
import {Video} from "../database/entities/Video.entity";
import { Users } from "../database/entities/Users.entity";

class PermissionRepository{
  
  public async getAllPermission():Promise<Permission[]>{
    return await connection.getRepository(Permission)
    .createQueryBuilder("permission")
    .getMany()
  }

  public async getPermissionById(permissionID:number):Promise<Permission>{
    return await connection.getRepository(Permission)
    .createQueryBuilder("permission")
    .where("permission.id = :id", { id:permissionID})
    .getOne();
  }
  
  public async getPermissionByUser(user:Users):Promise<Permission[]>{
   return connection.getRepository(Permission)
    .createQueryBuilder("permission")
    .leftJoinAndSelect("permission.users", "users")
    .leftJoinAndSelect("permission.video","video")
    .where("users.id = :id", { id:user.id})
    .getMany();
  }
  public async savePermission(permission:Permission):Promise<void>{
    await dbManager.save(permission);
  } 
  public async deletePermission(permission:Permission):Promise<void>{
    const permissionRepository = connection.getRepository(Permission);
    permissionRepository.delete(permission.id);
  } 

};
export const permissionRepository = new PermissionRepository()