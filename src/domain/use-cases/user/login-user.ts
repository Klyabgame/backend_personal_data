import { LoginUserDto } from "../../dtos";
import { UserEntity } from "../../entity/user.entity";
import { UserRepository } from "../../repositories/user.repository";

export interface LoginUserUseCase{
    execute(dto:LoginUserDto):Promise<UserEntity>
}

export class LoginUser implements LoginUserUseCase{

    constructor(
        private readonly repository:UserRepository,
    ){}

    execute(dto: LoginUserDto): Promise<UserEntity> {
        return this.repository.postLoginUser(dto);
    }

}