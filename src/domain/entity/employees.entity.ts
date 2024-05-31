
export class EmployeesEntity{

    public  dni:string;
    public  id_login:string;
    public  nombres:string;
    public  apellidos:string;
    public  correo:string;
    public  telefono:string;
    public  fecha_nacimiento:Date;
    public  fecha_inicio:Date;
    public  fecha_fin:Date;
    public  dni_file:string;
    public  curriculum_file:string;


    constructor(
        dni:string,
        id_login:string,
        nombres:string,
        apellidos:string,
        correo:string,
        telefono:string,
        fecha_nacimiento:Date,
        fecha_inicio:Date,
        fecha_fin:Date,
        dni_file:string,
        curriculum_file:string){
            this.dni=dni;
            this.id_login=id_login;
            this.nombres=nombres;
            this.apellidos=apellidos;
            this.correo=correo;
            this.telefono=telefono;
            this.fecha_nacimiento=fecha_nacimiento;
            this.fecha_inicio=fecha_inicio;
            this.fecha_fin=fecha_fin;
            this.dni_file=dni_file;
            this.curriculum_file=curriculum_file;
    }

    public static fromObject(object:{[key:string]:any}):EmployeesEntity{

        const {dni,
            id_login,
            nombres,
            apellidos,
            correo,
            telefono,
            fecha_nacimiento,
            fecha_inicio,
            fecha_fin,
            dni_file,
            curriculum_file}=object;
            

            if(!dni) throw 'dni es requerido';
            if(!id_login) throw 'el usuario al que pertenecera el trabajador es requerido';
            if(!nombres) throw 'nombres es requerido';
            if(!apellidos) throw 'apellidos es requerido';
            if(!correo) throw 'correo es requerido';
            if(!telefono) throw 'telefono es requerido';
            if(!fecha_nacimiento) throw 'fecha de nacimiento es requerido';
            if(!fecha_inicio) throw 'fecha de inicio es requerido';
            if(!fecha_fin) throw 'fecha de fin es requerido';
            /* if(!dni_file) throw 'pdf del dni es requerido';
            if(!curriculum_file) throw 'curriculum pdf es requerido'; */

            return new EmployeesEntity(
                dni,
                id_login,
                nombres,
                apellidos,
                correo,
                telefono,
                fecha_nacimiento,
                fecha_inicio,
                fecha_fin,
                dni_file,
                curriculum_file
                )
        }  

}