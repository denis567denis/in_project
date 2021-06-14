import { getConnection } from 'typeorm';
import { UsersRepository } from './../repository/user.repository';

export class UsersService {
  private usersRepository: UsersRepository;

  constructor(){
    this.usersRepository = getConnection("postgres").getCustomRepository(UsersRepository);
  }

  protected login:string;
  protected firstName:string;
  protected lastName:string;

  public view = async () => {
    const video = await this.usersRepository.findVideoByName(this.login,this.firstName,this.lastName);
    return video;
  } 
 
}