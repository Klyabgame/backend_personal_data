import { Router } from "express"
import { EmployeesController } from "./controller";
import { EmployeesDatasourceImpl } from "../../infrastructure/datasource/employees.datasource.impl";
import { EmployeesRepositoryImpl } from "../../infrastructure/repository/employees.repository.impl";
import { validateTokenForUser } from "../../midleware";

export class EmployeesRoutes{

    constructor(){}

    static get routes():Router{
        const router=Router();
        const employeesDatasource= new EmployeesDatasourceImpl();
        
        const employessRepository=new EmployeesRepositoryImpl(employeesDatasource);
        const employeesController= new EmployeesController(employessRepository);

        router.get('/',employeesController.getEmployees);
        router.get('/:dni',employeesController.getEmployeesOne);
        router.post('/',[validateTokenForUser],employeesController.postEmployees);
        router.put('/:dni',employeesController.updateEmployees);
        router.delete('/:dni',employeesController.deleteEmployees);

        return router;
    }
}