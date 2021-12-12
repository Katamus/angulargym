import { DocumentReference } from "@angular/fire/firestore";

export class Cliente{
    apellido!:string;
    cedula!:string;
    correo!:string;
    fechaNacimiento!:Date;
    imgUrl!:string;
    nombre!: string;
    telefono!:string;
    id!:string;
    ref!:DocumentReference;
    visible!:boolean;
    constructor(){

    }
}