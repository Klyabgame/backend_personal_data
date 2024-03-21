import { CreateEmployeesDto, EmployeesDatasource, EmployeesEntity, EmployeesRepository, UpdateEmployeesDto } from "../../domain";

export class EmployeesRepositoryImpl implements EmployeesRepository{


    constructor(
        private readonly employeesDatasource:EmployeesDatasource,
    ){}

    getFull(): Promise<EmployeesEntity[]> {
        return this.employeesDatasource.getFull();
    }
    getDni(dni: string): Promise<EmployeesEntity> {
        return this.employeesDatasource.getDni(dni);
    }
    create(createEmployeesDto: CreateEmployeesDto): Promise<EmployeesEntity> {
        return this.employeesDatasource.create(createEmployeesDto);
    }
    update(updateEmployees:UpdateEmployeesDto): Promise<EmployeesEntity> {
        return this.employeesDatasource.update(updateEmployees);
    }
    delete(dni: string): Promise<EmployeesEntity> {
        return this.employeesDatasource.delete(dni);
    }
}