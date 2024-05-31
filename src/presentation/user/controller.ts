import { Request, Response } from "express";
import {UploadedFile} from 'express-fileupload';
import { CreateUserDto, CustomError, LoginUserDto, UserRepository } from "../../domain";
import { CreateUser } from "../../domain/use-cases/user/create-user";
import {  UUID,  jwtAdapter,  } from "../../data";
import { LoginUser } from "../../domain/use-cases/user/login-user";
import { maxAgeHour, validateEmailData, validateUserForToken, validationsImg } from "../../helper";



export class UserController {

    constructor(
        private readonly userRepository:UserRepository,

    ){

        this.handleError=this.handleError.bind(this);

        this.loginUser=this.loginUser.bind(this);
        this.logoutUser=this.logoutUser.bind(this);
        this.registerUser=this.registerUser.bind(this);
        this.tokenUserEmail=this.tokenUserEmail.bind(this);
        this.validateTokenAccessUser=this.validateTokenAccessUser.bind(this);
        
    }

    private handleError=(error:unknown, res:Response)=>{
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({error:error.message});
        }

        console.log(`${error}`);
        return res.status(500).json({error:'Internal server Error'});
        
    }

    public loginUser(req:Request, res:Response){

        const [error,loginUserDto]= LoginUserDto.create(req.body);
        if(error) res.status(400).json(error);


        new LoginUser(this.userRepository)
        .execute(loginUserDto!)
        .then(loginUser=>{
            jwtAdapter.generateToken(loginUser.id_login).then((token)=>{
                console.log(token);
                
                res.cookie('token',token,{httpOnly:true,secure:true,sameSite:'none',maxAge:maxAgeHour(2)});
                const {password,...rest}=loginUser;
                return res.status(200).json({
                    user:rest
                })
            });
        })
        .catch(error=> this.handleError(error,res));

    }

    public logoutUser(req:Request, res:Response){

        try {
            const token=req.cookies['token'];
            if(!token) return res.status(400).json({err:'no existe un usuario activo'})
            
            res.clearCookie('token');
            return res.status(200).json({
                logout:'cerraste sesion correctamente'
            });
        } catch (error) {
            return res.status(500).json({err:'Error al cerrar Sesion'});
            
        }
    }


    public registerUser(req:Request, res:Response){

        const foto= req.files?.foto_url as UploadedFile;
        
        validationsImg.validationImg(foto).then((secureUrl)=>{
            
            const [error,createUserDto]= CreateUserDto.create({
                ...req.body,
                id_login:UUID(),
                foto_url:secureUrl
                
            });
            if(error) res.status(400).json(error);
            

            new CreateUser(this.userRepository)
            .execute(createUserDto!)
            .then(createUser=>{
                jwtAdapter.generateToken(createUser.id_login).then((token)=>{
                    const {password,...rest}=createUser;
                    res.cookie('token',token,{httpOnly:true,secure:true,sameSite:'none',maxAge:maxAgeHour(2)});
                    return res.status(200).json({
                        user:{...rest}
                    })
                });
            })
            .catch(error=> this.handleError(error,res));

        }).catch(error=> this.handleError(error,res));;
        
    }

    public async tokenUserEmail(req:Request, res:Response){
        const {token} = req.params;
        if(token===null || token===undefined) return res.status(400).json({error:'No hay un correo para validar'})
        validateEmailData(token).then(data=>{
            res.status(200).json({
                email:data.email,
                respuesta:'Se valido correctamente su correo electronico'
            });
        }).catch(error=>this.handleError(error,res));

    }

    public  validateTokenAccessUser(req:Request, res:Response){
 
            const token=req.cookies['token'];
            
            if(token===null || token===undefined) return res.status(400).json({error:'No hay un usuario para validar'})
            
            validateUserForToken(token).then((data)=>{
            
                return res.status(200).json({
                    id_login:data?.id_login,
                    correo:data?.correo,
                    foto_url:data?.foto_url,
                    nombres:data?.nombres,
                    apellidos:data?.apellidos,
                    telefono:data?.telefono
                });

            }).catch(err=>this.handleError(err,res))  
        
        }     
    
}