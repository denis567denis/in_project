import { getConnection } from 'typeorm';
import { Video } from '../database/entities/Video.entity';
import { PermissionRepository } from './../repository/permission.repository';

export class PermissionService {
  private permissionRepository: PermissionRepository;

  constructor(){
    this.permissionRepository = getConnection("postgres").getCustomRepository(PermissionRepository);
  }

  protected videoname:string;
  protected video:Video;

  public viewPermission = async () => {
    const permissions = await this.permissionRepository.getPermissionVideo(this.video);
    return permissions;
  } 
 
}