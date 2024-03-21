import { EmployeesEntity } from "../../entity/employees.entity";
import { EmployeesRepository } from "../../repositories/employees.repository";

export interface GetDniEmployeesUseCase{
    execute(dni:string):Promise<EmployeesEntity>
}

export class GetDniEmployees implements GetDniEmployeesUseCase{

    constructor(
        private readonly repository:EmployeesRepository,
    ){}

    execute(dni:string): Promise<EmployeesEntity> {
        return this.repository.getDni(dni);
    }

}