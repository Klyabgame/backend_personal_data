import { regularExps } from "../../../data";


export class CreateUserDto{

    private constructor(
        public readonly id_login:string,
        public readonly password:string,
        public readonly foto_url:string,
        public readonly nombres:string,
        public readonly apellidos:string,
        public readonly correo:string,
        public readonly telefono:string,
    ){}

    static create(props:{[key:string]:any}):[string?, CreateUserDto?]{

        

        const {
            id_login,
            password,
            foto_url,
            nombres,
            apellidos,
            correo,
            telefono
            }=props;

            if (!nombres) return ['Tiene que escribir un nombre',undefined];
            if (!apellidos) return ['Tiene que escribir un apellido',undefined];
            if (!correo) return ['Tiene que escribir un correo ',undefined];
            if (!regularExps.email.test(correo)) return ['el correo no es valido',undefined];
            if (!password) return ['Tiene que colocar un password ',undefined];
            if (password.legth<6) return ['el password debe tener mas de 6 letras ',undefined];




        return [undefined,new CreateUserDto(
                id_login,
                password,
                foto_url,
                nombres,
                apellidos,
                correo,
                telefono,
                )]
    }


}