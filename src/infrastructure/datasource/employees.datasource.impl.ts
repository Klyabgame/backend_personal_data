import { prisma } from "../../data";
import { CreateEmployeesDto, CustomError, EmployeesDatasource, EmployeesEntity, UpdateEmployeesDto } from "../../domain";
import { validateUserForToken } from "../../helper";

export class EmployeesDatasourceImpl implements EmployeesDatasource{

    
    async getFull(): Promise<EmployeesEntity[]> {
        const data=await prisma.tb_user.findMany();
        return data.map(dt=>EmployeesEntity.fromObject(dt));

    }
    async getDni(dni: string): Promise<EmployeesEntity> {
        
            const data=await prisma.tb_user.findFirst({
                where:{
                    dni:dni
                }
            })
            if(!data) throw CustomError.badRequest(`Usuario con el dni: ${dni} no existe en la bd`);

            return EmployeesEntity.fromObject({...data});
        
    }
    async create(createEmployeesDto: CreateEmployeesDto): Promise<EmployeesEntity> {
        
        const data=await prisma.tb_user.findFirst({
            where:{
                dni:createEmployeesDto.dni
            }
        })
        if(!!data) throw CustomError.badRequest('el dni del usuario ya existe');

        try {
            const createEmployees=await prisma.tb_user.create({
                data:createEmployeesDto
            })
            return EmployeesEntity.fromObject(createEmployees);
            
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer('Ocurrio un error al crear al empleado');
            
        }
            
    }

    async update(updateEmployees:UpdateEmployeesDto): Promise<EmployeesEntity> {
        
        try {
            const data= await this.getDni( updateEmployees.dni! );
            if(!data) throw CustomError.badRequest('no existe un empleado con ese id')
            const upEmployees = await prisma.tb_user.update({
                where: { dni_id_login:{
                    dni:updateEmployees.dni!,
                    id_login:data.id_login!
                } },
                data: updateEmployees!.values
            });

            if(!upEmployees) throw CustomError.badRequest('no se puedo actualizar el trabajador ');

            return EmployeesEntity.fromObject(upEmployees);
        } catch (error) {
            console.error(error)
            throw CustomError.internalServer('ocurrio un error en el servidor al actualizar el trabajador');
        }
    }
    async delete(dni: string): Promise<EmployeesEntity> {
        const data=await this.getDni(dni);
        
        try {
            await this.getDni( dni );

            const deleteEmployees = await prisma.tb_user.delete({
                where: { 
                    dni_id_login:{
                        dni:dni,
                        id_login:data.id_login
                    }
                 }
            });
            if(!deleteEmployees) throw CustomError.badRequest('el usuario a eliminar no existe');

            return EmployeesEntity.fromObject(deleteEmployees);
        } catch (error) {
            console.error(error)
            throw CustomError.internalServer('error del servidor al eliminar el usuario');
        }
    }

}