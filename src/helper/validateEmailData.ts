import { jwtAdapter, prisma } from "../data";
import { CustomError } from "../domain";

export const validateEmailData=async(token:string)=>{

        const emailVerified:any= await jwtAdapter.validateToken(token);
        if(!emailVerified) throw CustomError.badRequest('el correo ingresado no es valido para la verificacion');
        const verifyData=await prisma.tb_login.findFirst({
            where:{
                correo:emailVerified.data
            }
        })
        if(!verifyData) throw CustomError.badRequest('no se encontro el usuario con el correo ingresado');

        if (verifyData.correo_validado===false) {
            const updateEmailVerify= await prisma.tb_login.update({
                where:{
                    id_login:verifyData?.id_login
                },
                data:{
                    correo_validado:true
                }
            })
            if(!updateEmailVerify) throw CustomError.internalServer('Ocurrio un problema al validar al usuario');
            return {
                email:updateEmailVerify.correo
            }
            
        }else {
            throw CustomError.badRequest('el correo ingresado ya esta validado')
        }

        

}