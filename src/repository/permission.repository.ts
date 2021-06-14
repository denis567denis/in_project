import { EntityRepository, AbstractRepository } from "typeorm";
import { Permission } from "../database/entities/Permission.entity";
import { Users } from "../database/entities/Users.entity";
import { Video } from "../database/entities/Video.entity";

@EntityRepository(Permission)
export class PermissionRepository extends AbstractRepository<Permission> {

    createAndSave(mayWatch: string, users: Users, video: Video) {
        const permission = new Permission();
        permission.mayWatch=mayWatch;
        permission.users=users;
        permission.video=video;
        return this.manager.save(permission);
    }

    findByPermission(users: Users ,video: Video) {
        return this.repository.findOne({users,video});
    }

    getPermissionVideo(video: Video){
        return this.repository.find({video});
    }

    getPermissionUser(users: Users){
        return this.repository.find({users});
    }

}