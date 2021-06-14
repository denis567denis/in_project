import { EntityRepository, AbstractRepository } from "typeorm";
import { Video } from "../database/entities/Video.entity";
import { Permission } from "../database/entities/Permission.entity";
import { Users } from "../database/entities/Users.entity";

@EntityRepository(Video)
export class VideoRepository extends AbstractRepository<Video> {

    createAndSave(users: Users,videoName: string, permission: Permission[],) {
        const video = new Video();
        video.videoName = videoName;
        video.permission = permission;
        video.users=users;
        return this.manager.save(video);
    }

    findByName(videoName: string) {
        return this.repository.find({videoName});
    }

    getVideoPermissionUsers(users: Users,permission: Permission[]){
        return this.repository.find({users,permission});
    }

    getVideoUserMayWatch(permission: Permission[]){
        return this.repository.find({permission});
    }
}