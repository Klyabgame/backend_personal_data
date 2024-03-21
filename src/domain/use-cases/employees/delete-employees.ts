import { UpdateEmployeesDto } from "../../dtos";
import { EmployeesEntity } from "../../entity/employees.entity";
import { EmployeesRepository } from "../../repositories/employees.repository";

export interface DeleteEmployeesUseCase{
    execute(dni: string):Promise<EmployeesEntity>
}

export class DeleteEmployees implements DeleteEmployeesUseCase{

    constructor(
        private readonly repository:EmployeesRepository,
    ){}

    execute(dni: string): Promise<EmployeesEntity> {
        return this.repository.delete(dni)
    }

}