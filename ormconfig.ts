  import { ConnectionOptions } from 'typeorm';

export default  {
   type: "postgres",
   host: process.env.TYPEORM_HOST||`localhost`,
   port: process.env.TYPEORM_PORT || 5432,
   username: process.env.TYPEORM_USERNAME || `postgres`,
   password: process.env.TYPEORM_PASSWORD || `postgres`,
   database: process.env.TYPEORM_DATABASE || `database_denis`,
   synchronize : process.env.TYPEORM_SYNCHRONIZE || true,
   logging : process.env.TYPEORM_LOGGING || false,
   entities: [__dirname + `/src/database/entity/*.entity.ts`],
 } as ConnectionOptions 