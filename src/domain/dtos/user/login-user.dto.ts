import { regularExps } from "../../../data";


export class LoginUserDto{

    private constructor(
        public readonly password:string,
        public readonly correo:string,
    ){}

    static create(props:{[key:string]:any}):[string?, LoginUserDto?]{

        

        const {
            password,
            correo
            }=props;

            if (!correo) return ['Tiene que escribir un correo ',undefined];
            if (!regularExps.email.test(correo)) return ['el correo no es valido',undefined];
            if (!password) return ['Tiene que colocar un password ',undefined];
            if (password.legth<6) return ['el password debe tener mas de 6 letras ',undefined];




        return [undefined,new LoginUserDto(
                password,
                correo
                )]
    }


}