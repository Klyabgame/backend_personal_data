import { EmployeesEntity } from "../../entity/employees.entity";
import { EmployeesRepository } from "../../repositories/employees.repository";

export interface GetFullEmployeesUseCase{
    execute():Promise<EmployeesEntity[]>
}

export class GetFullEmployees implements GetFullEmployeesUseCase{

    constructor(
        private readonly repository:EmployeesRepository,
    ){}

    execute(): Promise<EmployeesEntity[]> {
        return this.repository.getFull();
    }

}