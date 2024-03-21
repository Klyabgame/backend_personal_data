import { CreateUserDto, LoginUserDto } from "../dtos";
import { UserEntity } from "../entity/user.entity";



export abstract class UserRepository{

  abstract postRegisterUser(createUserDto:CreateUserDto):Promise<UserEntity>;
  abstract postLoginUser(loginUserDto:LoginUserDto):Promise<UserEntity>;

}