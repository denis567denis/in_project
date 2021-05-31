import "reflect-metadata";
import {createConnection} from "typeorm";
import {Users} from "./entity/Users";
import {Permission} from "./entity/Permission";
import {Objects_video} from "./entity/Objects_video";

createConnection(
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
        Objects_video
    ],
    synchronize: true,
    logging: false
}
).then(async connection => {


}).catch(error => console.log(error));
