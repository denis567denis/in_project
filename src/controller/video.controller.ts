import { Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";

import {Video} from "../database/entities/Video.entity";
import{Permission} from "../database/entities/Permission.entity"
import {Users} from "../database/entities/Users.entity";
class VideoController{
  
  public async getAllVideo():Promise<Video[]>{
    return await getRepository(Video)
    .createQueryBuilder("video")
    .getMany();
  }
  
  public async getVideoByPermission(permission:Permission):Promise<Video[]>{
    return permission.video;
  }
  public async getVideoByUser(user:Users):Promise<Video[]>{
    return user.video;
  }
  public async getVideoById(videoId:number):Promise<Video>{
    return await getRepository(Video)
    .createQueryBuilder("video")
    .where("video.id = :id", { id:videoId})
    .getOne();
  }
  public async newVideo(video:Video):Promise<void>{
    await getConnection().manager.save(video);
  } 
  
  public async UpdateVideo(video:Video):Promise<void>{
    await getConnection()
    .createQueryBuilder()
    .update(Video)
    .set({videoName:video.videoName,permission:video.permission})
    .where("id = :id", { id: video.id })
    .execute();
  }

  public async deleteVideo(video:Video):Promise<void>{
    const videoRepository = getRepository(Video);
    videoRepository.delete(video.id);
  } 
      /*
      static deleteVideo = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;
      
        const videoRepository = getRepository(Video);
        let video: Video;
        try {
          video = await videoRepository.findOneOrFail(id);
        } catch (error) {
          res.status(404).send("User not found");
          return;
        }
        videoRepository.delete(id);
      
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
      };

*/
};
export const videoController = new VideoController()
