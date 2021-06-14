import { getConnection } from 'typeorm';
import { Video } from '../database/entities/Video.entity';
import { VideoRepository } from './../repository/video.repository';

export class VideoService {
  private videoRepository: VideoRepository;

  constructor(){
    this.videoRepository = getConnection("postgres").getCustomRepository(VideoRepository);
  }

  protected videoname:string;
  protected video:Video;

  public viewVideoName = async () => {
    const AllVideoName = await this.videoRepository.findByName(this.videoname);
    return AllVideoName;
  } 
 
}