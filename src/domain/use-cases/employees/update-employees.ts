import { UpdateEmployeesDto } from "../../dtos";
import { EmployeesEntity } from "../../entity/employees.entity";
import { EmployeesRepository } from "../../repositories/employees.repository";

export interface UpdateEmployeesUseCase{
    execute(dto:UpdateEmployeesDto):Promise<EmployeesEntity>
}

export class UpdateEmployees implements UpdateEmployeesUseCase{

    constructor(
        private readonly repository:EmployeesRepository,
    ){}

    execute(dto:UpdateEmployeesDto): Promise<EmployeesEntity> {
        return this.repository.update(dto)
    }

}