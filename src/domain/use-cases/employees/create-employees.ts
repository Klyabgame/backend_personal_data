import { CreateEmployeesDto } from "../../dtos";
import { EmployeesEntity } from "../../entity/employees.entity";
import { EmployeesRepository } from "../../repositories/employees.repository";

export interface CreateEmployeesUseCase{
    execute(dto:CreateEmployeesDto):Promise<EmployeesEntity>
}

export class CreateEmployees implements CreateEmployeesUseCase{

    constructor(
        private readonly repository:EmployeesRepository,
    ){}

    execute(dto: CreateEmployeesDto): Promise<EmployeesEntity> {
        return this.repository.create(dto);
    }

}