import { Request, Response } from "express";
import { CreateEmployees, CustomError, DeleteEmployees, EmployeesRepository, GetDniEmployees, GetFullEmployees, UpdateEmployees } from "../../domain";
import { CreateEmployeesDto, UpdateEmployeesDto } from "../../domain/dtos";
import fileUpload, { UploadedFile } from "express-fileupload";
import { validateUserForToken, validationsImg } from "../../helper";



//testear codigo
export class EmployeesController{

    constructor(
        private readonly employeesRepository:EmployeesRepository,
    ){
        this.getEmployees=this.getEmployees.bind(this);
        this.getEmployeesOne=this.getEmployeesOne.bind(this);
        this.postEmployees=this.postEmployees.bind(this);
        this.updateEmployees=this.updateEmployees.bind(this);
        this.deleteEmployees=this.deleteEmployees.bind(this);
    }

    private handleError=(error:unknown, res:Response)=>{
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({error:error.message});
        }

        console.log(`${error}`);
        return res.status(500).json({error:'Internal server Error'});
        
    }
    

    public  getEmployees(req:Request,res:Response ){

            const {limite=10, desde=0}=req.query;
            /* const limitedEmployees = employees.slice(Number(desde), Number(desde) + Number(limite)); */ ///esto se carga en la memoria luego de extraer los datos 
            //tengo que actualizar la manera de poder usar skip o limit para evitar usar la limitacion en memoria antes de extraer la informacion
            new GetFullEmployees(this.employeesRepository)
            .execute()
            .then(employees=>{
                const limitedEmployees = employees.slice(Number(desde), Number(desde) + Number(limite));
                return res.status(200).json({
                    cantidad:employees.length,
                    employees:limitedEmployees
                })
            })
            .catch(error=> res.status(400).json(error));
            
        
    };



    public getEmployeesOne(req:Request, res:Response){
        
            const dni:number=+req.params.dni;
            if(Number.isNaN(dni)) return res.status(400).json({error:'El dni no puede tener letras o caracteres especiales'});
            if(dni.toString().length<8 || dni.toString().length>8) return res.status(400).json({error:'El dni tiene que tener 8 digitos'});

            new GetDniEmployees(this.employeesRepository)
            .execute(dni.toString())
            .then(employees=>res.status(200).json({
                employees:employees
            }))
            .catch(error=> this.handleError(error,res));
    }

    
    postEmployees(req:Request, res:Response){
        
        const EmployeesImg=req.files 
         
        validationsImg.validationImgPlus(
            {
                dni_file:(EmployeesImg)?EmployeesImg.dni_file:null,
                curriculum_file:(EmployeesImg)?EmployeesImg.curriculum_file:null
            }).then((secureUrl)=>{
            
            const [error,createEmployeesDto]=CreateEmployeesDto.create({
                ...req.body,
                dni_file:secureUrl![0],
                curriculum_file:secureUrl![1],
                id_login:req.user
            });
            if(error) return res.status(400).json({error});

            
            
            new CreateEmployees(this.employeesRepository)
            .execute(createEmployeesDto!)
            .then(employeesCreate=>{
                res.status(200).json({employees:employeesCreate})
            })
            .catch(error=> this.handleError(error,res));
            
        }).catch(error=>this.handleError(error,res))
        
        
            
    }


    updateEmployees(req:Request, res:Response){
    
            const dni=req.params.dni;
            const [error,updateEmployeesDto]=UpdateEmployeesDto.create({...req.body,dni});
            if(error) return res.status(400).json({error});

            new UpdateEmployees(this.employeesRepository)
            .execute(updateEmployeesDto!)
            .then(employeesUpdate=>res.status(200).json({
                employees:employeesUpdate
            }))
            .catch(error=> res.status(400).json(error));



    }


    deleteEmployees(req:Request, res:Response){
        
            const dni=req.params.dni;

            new DeleteEmployees(this.employeesRepository)
            .execute(dni)
            .then(employeesDelete=>res.status(200).json({
                delete:true,
                employees:employeesDelete
            }))
            .catch(error=> res.status(400).json(error));
        

    }


}