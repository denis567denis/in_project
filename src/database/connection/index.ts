import "reflect-metadata";
import {Users} from "../entities/Users.entity";
import {Permission} from "../entities/Permission.entity";
import {Video} from "../entities/Video.entity";
import {createConnection, Connection} from "typeorm";


const connection = createConnection(
{
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "database_denis",
    entities: [
        Users,
        Permission,
        Video
    ],
    synchronize: true,
    logging: false,
    name:"postgres"
}
).then(async connection => {
}).catch(error => console.log(error));
