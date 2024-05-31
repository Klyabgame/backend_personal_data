import { NextFunction, Request, Response } from "express";
import { jwtAdapter, prisma } from "../data";
import { CustomError } from "../domain";

declare global {
    namespace Express {
      interface Request {
        user: any;
      }
    }
  }
  

export const validateTokenForUser=async (req:Request, res:Response,next:NextFunction)=>{

        const token=req.cookies['token'];
        if(token===null || token===undefined) return res.status(401).json({error:'No hay un usuario para validar'})

        const verifyUser:any =await jwtAdapter.validateToken(token);

        if(!verifyUser) return res.status(401).json('usuario no permitido');

        const dataUserAcces=await prisma.tb_login.findUnique({
            where:{
                id_login:verifyUser.data
            }
        })

        if(!dataUserAcces) return res.status(401).json('Usuario no encontrado en la bd');
        
        req.user=verifyUser.data;
       
        next();
}