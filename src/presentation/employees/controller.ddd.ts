import { Request, Response } from "express";
import { EmployeesRepository } from "../../domain";
import { CreateEmployeesDto, UpdateEmployeesDto } from "../../domain/dtos";



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

    
    

    public async getEmployees(req:Request,res:Response ){

        try {
            const {limite=10, desde=0}=req.query;
            const employees=await this.employeesRepository.getFull();
            const limitedEmployees = employees.slice(Number(desde), Number(desde) + Number(limite)); ///esto se carga en la memoria luego de extraer los datos 
            //tengo que actualizar la manera de poder usar skip o limit para evitar usar la limitacion en memoria antes de extraer la informacion
            
            return res.status(200).json({
                cantidad:employees.length,
                employees:limitedEmployees
            });
            
        } catch (error) {
            res.status(400).json({error:error})
        }
        
    };



    public async getEmployeesOne(req:Request, res:Response){
        
        try {
            const dni=req.params.dni;
            const employees=await this.employeesRepository.getDni(dni);       
            return res.status(200).json({
                employees:employees
            })
            
            
        } catch (error) {
            res.status(400).json({error:error})
        }


    }

    
    async postEmployees(req:Request, res:Response){

        const algo=req.files;
        console.log(algo);
        
        
        try {
            const [error,createEmployeesDto]=CreateEmployeesDto.create(req.body);
            if(error) return res.status(400).json({error});
            const employeesCreate=await this.employeesRepository.create(createEmployeesDto!)
            res.json({
                employees:employeesCreate
            });
        } catch (error) {
            res.status(400).json({error:error})
        }
    }




    async updateEmployees(req:Request, res:Response){
        
        try {
            const dni=req.params.dni;
            const [error,updateEmployeesDto]=UpdateEmployeesDto.create({...req.body,dni});
            if(error) return res.status(400).json({error});
            const employeesUpdate=await this.employeesRepository.update(updateEmployeesDto!);

            

            return res.status(200).json({
                employees:employeesUpdate
            })

            
        } catch (error) {
            res.status(400).json({error:error, text:'aea'})
        }


    }


    async deleteEmployees(req:Request, res:Response){
        
        try {
            const dni=req.params.dni;
            const employeesDelete=await this.employeesRepository.delete(dni);

            return res.status(200).json({
                delete:true,
                employees:employeesDelete
            })

            
        } catch (error) {
            res.status(400).json({error:error, text:'aea'})
        }

    }


}