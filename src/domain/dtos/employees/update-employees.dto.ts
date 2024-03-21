

export class UpdateEmployeesDto{

    private constructor(
        public readonly dni?:string,
        public readonly id_login?:string,
        public readonly nombres?:string,
        public readonly apellidos?:string,
        public readonly correo?:string,
        public readonly telefono?:string,
        public readonly fecha_nacimiento?:Date,
        public readonly fecha_inicio?:Date,
        public readonly fecha_fin?:Date,
        public readonly dni_file?:string,
        public readonly curriculum_file?:string,
    ){}

    get values(){
        const returnObj:{[key:string]:any}={};
        if (this.dni) returnObj.dni=this.dni;
        if (this.id_login) returnObj.dni=this.id_login;
        if (this.nombres) returnObj.nombres=this.nombres;
        if (this.apellidos) returnObj.apellidos=this.apellidos;
        if (this.correo) returnObj.correo=this.correo;
        if (this.telefono) returnObj.telefono=this.telefono;
        if (this.fecha_nacimiento) returnObj.fecha_nacimiento=this.fecha_nacimiento;
        if (this.fecha_inicio) returnObj.fecha_inicio=this.fecha_inicio;
        if (this.fecha_fin) returnObj.fecha_fin=this.fecha_fin;
        if (this.dni_file) returnObj.dni_file=this.dni_file;
        if (this.curriculum_file) returnObj.curriculum_file=this.curriculum_file;

        return returnObj;
    }

    static create(props:{[key:string]:any}):[string?, UpdateEmployeesDto?]{
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

            if ( !dni || isNaN( Number(dni)) ) {
                return ['dni must be a valid number'];
              }
            

/*             if (!dni) return ['Tiene que escribir un dni',undefined];
            if (!nombres) return ['Tiene que escribir un nombre',undefined];
            if (!apellidos) return ['Tiene que escribir un apellido',undefined];
            if (!correo) return ['Tiene que escribir un correo valido',undefined];
            if (!telefono) return ['Tiene que escribir un telefono',undefined];
            if (!fecha_nacimiento) return ['Tiene que colocar una fecha de nacimiento',undefined];
            if (!fecha_inicio) return ['Tiene que colocar una fecha de inicio laboral',undefined];
            if (!fecha_fin) return ['Tiene que colocar una fecha de fin laboral',undefined];
            if (!dni_file) return ['Tiene que colocar el archivo pdf de tu dni',undefined];
            if (!curriculum_file) return ['Tiene que colocar el archivo pdg de tu curriculum',undefined]; */

        return [undefined,new UpdateEmployeesDto(
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