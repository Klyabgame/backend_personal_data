import { bcryptAdapter, CloudinaryServer, envs, jwtAdapter, prisma } from "../../data";
import { CustomError, LoginUserDto } from "../../domain";
import { UserDatasource } from "../../domain/datasources/user.datasource";
import { CreateUserDto } from "../../domain/dtos/user/create-user.dto";
import { UserEntity } from "../../domain/entity/user.entity";
import { EmailService } from "../../presentation/services/email.service";

export class UserDatasourceImpl implements UserDatasource{

     constructor(
         readonly emailService:EmailService
    ){}


    async postLoginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const user= await prisma.tb_login.findFirst({
            where:{
                correo:loginUserDto.correo
            }
        })
        if(!user) throw CustomError.badRequest('Email o Password incorrectos-email');
        const passwordUnhashed=bcryptAdapter.compare(loginUserDto.password,user.password);
        if(!passwordUnhashed) throw CustomError.badRequest('Email o Password incorrectos-password');
        
        return UserEntity.fromObject(user);
    }

    async postRegisterUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const existEmail= await prisma.tb_login.findFirst({
            where:{
                correo:createUserDto.correo
            }
        })   
        if(existEmail) throw CustomError.badRequest('el email ya existe');

        const hashedPasword=bcryptAdapter.hash(createUserDto.password);

        console.log(CloudinaryServer().uploader.upload);
        

        const foto_url_Default='https://res.cloudinary.com/dt86tk7ed/image/upload/v1715448290/PERSONAL-DATA-BACKEND/kn9krio5avobvcz6sr1m.jpg';
        await this.sendEmailValidationLink(createUserDto.correo);
        try {
            const createUserDtoAddImage={
                ...createUserDto,
                foto_url: (!createUserDto.foto_url)? foto_url_Default:createUserDto.foto_url
            }
            const user=await prisma.tb_login.create({
                data:{
                    ...createUserDtoAddImage,
                    password:hashedPasword
                }
            });
    
            return UserEntity.fromObject(user);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    private async sendEmailValidationLink(email:string){

        const token=await jwtAdapter.generateToken(email);
        
        if(!token) throw CustomError.internalServer('Errror getting token');

        const link= `${envs.WEBSERVICE_URL}/user/validate-email/${token}`;
        const html=`
            <h1>VALIDA TU EMAIL </h1>
            <p> click on the following link to validate your email</p>
            <a href="${link}">validate tour email:${email}</a>
        `;

        const options={
            to:email,
            subject:'Validate your email',
            htmlBody:html
        }

        const isSent=await this.emailService.sendEmail(options);
        if(!isSent) throw CustomError.internalServer('error sending email');

        return true;

    }


}