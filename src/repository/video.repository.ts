import {connection,dbManager} from "../database/connection/connection.database.connection"

import {Permission} from "../database/entities/Permission.entity";
import {Video} from "../database/entities/Video.entity";
import { Users } from "../database/entities/Users.entity";
class VideoRepository{
  
  public async getAllVideo():Promise<Video[]>{
    return await connection.getRepository(Video)
    .createQueryBuilder("video")
    .leftJoinAndSelect("video.permission", "permission")
    .getMany();
  }
  public async insertVideo(video:Video):Promise<void>{
       connection
      .createQueryBuilder()
			.insert()
			.into(Video)
			.values(video)
			.execute()
  }
  public async getVideoByPermission(permission:Permission):Promise<Video[]>{
    return await connection.getRepository(Video)
    .createQueryBuilder("video")
    .innerJoin("video.permission", "permission")
    .where("permission.id = :permissionID", { permissionID: permission.id })
    .getMany();
    
  }

  public async getVideoByNameAndByPermission(nameVideo:string,permission:Permission):Promise<Video>{
    return await connection.getRepository(Video)
    .createQueryBuilder("video")
    .innerJoin("video.permission", "permission")
    .where("video.name = :name and permission.id = :permissionID", { name:nameVideo,permissionID: permission.id })
    .getOne();
  }

  public async getVideoByUser(user:Users):Promise<Video[]>{
    return await connection.getRepository(Video)
    .createQueryBuilder("video")
    .leftJoinAndSelect("video.users", "users")
    .where("users.id = :id", { id:user.id})
    .getMany();
  }
  public async getVideoById(videoId:number):Promise<Video>{
    return await connection.getRepository(Video)
    .createQueryBuilder("video")
    .where("video.id = :id", { id:videoId})
    .getOne();
  }
  public async saveVideo(video:Video):Promise<void>{
    await dbManager.save(video);
  } 
  
  public async UpdateVideo(video:Video):Promise<void>{
    await connection
    .createQueryBuilder()
    .update(Video)
    .set({videoName:video.videoName,permission:video.permission})
    .where("id = :id", { id: video.id })
    .execute();
  }

  public async deleteVideo(video:Video):Promise<void>{
    const videoRepository = connection.getRepository(Video);
    videoRepository.delete(video.id);
  } 
};
export const videoRepository = new VideoRepository()
