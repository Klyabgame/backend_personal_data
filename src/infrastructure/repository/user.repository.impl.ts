import { LoginUserDto, UserDatasource } from "../../domain";
import { CreateUserDto } from "../../domain/dtos/user/create-user.dto";
import { UserEntity } from "../../domain/entity/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";


export class UserRepositoryImpl implements UserRepository{

    constructor(
        private readonly userDatasource:UserDatasource,
    ){}
    postLoginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this.userDatasource.postLoginUser(loginUserDto);
    }

    postRegisterUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        return this.userDatasource.postRegisterUser(createUserDto);
    }
    

}