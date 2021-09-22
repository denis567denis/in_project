import { getRepository } from "typeorm";
import {getConnection} from "typeorm";

import {Permission} from "../database/entities/Permission.entity";
import {Video} from "../database/entities/Video.entity";
import { Users } from "../database/entities/Users.entity";

class PermissionController{
  
  public async getAllPermission():Promise<Permission[]>{
    return await getRepository(Permission)
    .createQueryBuilder("permission")
    .getMany()
  }

  public async getPermissionById(permissionID:number):Promise<Permission>{
    return await getRepository(Permission)
    .createQueryBuilder("permission")
    .where("permission.id = :id", { id:permissionID})
    .getOne();
  }
  public async getPermissionByVideo(video:Video):Promise<Permission[]>{
    return video.permission;
  }
  public async getPermissionByUser(user:Users):Promise<Permission[]>{
    return user.permission;
  }
  public async newPermission(permission:Permission):Promise<void>{
    await getConnection().manager.save(permission);
  } 
  public async deletePermission(permission:Permission):Promise<void>{
    const permissionRepository = getRepository(Permission);
    permissionRepository.delete(permission.id);
  } 

};
export const permissionController = new PermissionController()