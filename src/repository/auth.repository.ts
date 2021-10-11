import {connection, dbManager } from '../database/connection/connection.database.connection';
import { userRepository } from './user.repository';
import * as jwt from "jsonwebtoken";
import { Users } from '../database/entities/Users.entity';
import config from "../config/config";
import { Token } from '../database/entities/Token.entity';

class AuthRepository {
  
	public async createtoken(user:Users):Promise< string>{
        const token = jwt.sign(
            { userId: user.id, userLogin: user.login ,userRol: user.rol},
            config.jwtSecret,
            { expiresIn: "1h" }
          );
          return token;
    }

  public async createRefreshtoken(user:Users):Promise< string>{
    const token = jwt.sign(
      { userId: user.id, userLogin: user.login ,userRol: user.rol},
      config.jwtSecret,
      { expiresIn: "1h" }
    );
    let newToken= new Token();
    newToken.refreshToken=token;
    user.token=newToken;
    dbManager.save(newToken);
    userRepository.UpdateUser(user);

    return token;
  }

  public async getRefreshtoken(user:Users):Promise<Token>{
    return user.token;
  } 

  public async deleteRefreshtoken(token:Token):Promise<void>{
    const tokenRepository = connection.getRepository(Token);
    tokenRepository.delete(token.id);
  } 



}

export const authRepository = new AuthRepository()
