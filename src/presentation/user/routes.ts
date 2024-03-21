import { Router } from "express"
import { UserController } from "./controller";
import { UserRepositoryImpl } from "../../infrastructure/repository/user.repository.impl";
import { UserDatasourceImpl } from "../../infrastructure/datasource/user.datasource.impl";
import { EmailService } from "../services/email.service";
import { envs } from './../../data'

export class UserRoutes{

    constructor(){}

    static get routes():Router{
        const router=Router();

        const emailService= new EmailService(
            envs.MAILER_SERVICE,
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY
            )
        const userDatasource=new UserDatasourceImpl(emailService);
        const userRepository=new UserRepositoryImpl(userDatasource);
        const userController=new UserController(userRepository);

        router.post('/login',userController.loginUser);
        //router.get('/:dni',UserController.getEmployeesOne);
        router.post('/logout',userController.logoutUser);
        router.post('/register',userController.registerUser);
        //router.put('/:dni',UserController.updateEmployees);
        //router.delete('/:dni',UserController.deleteEmployees);
        router.get('/validate-email/:token',userController.tokenUserEmail);
        router.get('/validate-token',userController.validateTokenAccessUser);

        return router;
    }
}