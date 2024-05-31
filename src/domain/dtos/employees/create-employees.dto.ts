

export class CreateEmployeesDto{

    private constructor(
        public readonly dni:string,
        public readonly id_login:string,
        public readonly nombres:string,
        public readonly apellidos:string,
        public readonly correo:string,
        public readonly telefono:string,
        public readonly fecha_nacimiento:Date,
        public readonly fecha_inicio:Date,
        public readonly fecha_fin:Date,
        public readonly dni_file:string,
        public readonly curriculum_file:string,
    ){}

    static create(props:{[key:string]:any}):[string?, CreateEmployeesDto?]{

        

        const {
            dni,
            id_login,
            nombres,
            apellidos,
            correo,
            telefono,
            fecha_nacimiento,
            fecha_inicio,
            fecha_fin,dni_file,
            curriculum_file}= props;

            if (!dni) return ['Tiene que escribir un dni',undefined];
            if (!id_login) return ['El Trabajador tiene que pertenecer a un usuario',undefined];
            if (!nombres) return ['Tiene que escribir un nombre',undefined];
            if (!apellidos) return ['Tiene que escribir un apellido',undefined];
            if (!correo) return ['Tiene que escribir un correo valido',undefined];
            if (!telefono) return ['Tiene que escribir un telefono',undefined];
            if (!fecha_nacimiento) return ['Tiene que colocar una fecha de nacimiento',undefined];
            if (!fecha_inicio) return ['Tiene que colocar una fecha de inicio laboral',undefined];
            if (!fecha_fin) return ['Tiene que colocar una fecha de fin laboral',undefined];
           /*  if (!dni_file) return ['Tiene que colocar el archivo pdf de tu dni',undefined];
            if (!curriculum_file) return ['Tiene que colocar el archivo pdg de tu curriculum',undefined]; */




        return [undefined,new CreateEmployeesDto(
            dni,
            id_login,
            nombres,
            apellidos,
            correo,
            telefono,
            fecha_nacimiento,
            fecha_inicio,
            fecha_fin,dni_file,
            curriculum_file)]
    }


}