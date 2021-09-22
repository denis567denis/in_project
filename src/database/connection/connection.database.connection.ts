import {createConnection} from "typeorm";
import {Video} from "../entities/Video.entity";
import {Users} from "../entities/Users.entity";
import {Permission} from "../entities/Permission.entity";

export const connection = createConnection().then(async connection => {

    let permission1 = new Permission();
    permission1.mayWatch="+";
    await connection.manager.save(permission1);

    let permission2 = new Permission();
    permission2.mayWatch="+";
    await connection.manager.save(permission2);


    let video1 =new Video();
    video1.videoName="123.mp4";
    video1.permission=[permission1,permission2];
    await connection.manager.save(video1);

    let video2 =new Video();
    video2.videoName="456.mp4";
    video2.permission=[permission1];
    await connection.manager.save(video2);

    let user1=new Users();
    user1.firstName="Denis";
    user1.lastName="Bog";
    user1.login="admin";
    user1.password="admin";
    user1.rol="ADMIN";    
    await connection.manager.save(user1);

    let user2=new Users();
    user2.firstName="max";
    user2.lastName="maxon";
    user2.login="user";
    user2.password="user";
    user2.rol="USER";    
    user2.permission=[permission1];
    user2.video=[video2];
    await connection.manager.save(user2);

    let user3=new Users();
    user3.firstName="pavel";
    user3.lastName="pasha";
    user3.login="user123";
    user3.password="USER"; 
    user3.rol="USER";   
    user3.permission=[permission2];
    user3.video=[video1];
    await connection.manager.save(user3);

}).catch(error => console.log(error));;