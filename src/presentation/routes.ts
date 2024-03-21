import { Router } from "express"
import { EmployeesRoutes } from "./employees/routes";
import { UserRoutes } from "./user/routes";

export class MainRoutes{

    constructor(){}

    static get routes():Router{
        const router=Router();

        router.use('/api/employees',EmployeesRoutes.routes);
        router.use('/api/user',UserRoutes.routes);

        return router;
    }
}