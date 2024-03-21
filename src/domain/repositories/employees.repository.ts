import { CreateEmployeesDto, UpdateEmployeesDto } from "../dtos";
import { EmployeesEntity } from "../entity/employees.entity";


export abstract class EmployeesRepository{

    //employees paginacion
  abstract getFull():Promise<EmployeesEntity[]>;

  abstract getDni(dni:string):Promise<EmployeesEntity>;

  abstract create(createEmployeesDto:CreateEmployeesDto):Promise<EmployeesEntity>;

  abstract update(updateEmployees:UpdateEmployeesDto):Promise<EmployeesEntity>;

  abstract delete(dni: string):Promise<EmployeesEntity>;
}