import { DocumentReference } from "@angular/fire/firestore";

export class Inscripcion{
    fecha!: Date;
    fechaFinaliza!: Date;
    cliente!: DocumentReference;
    precios!: DocumentReference;
    subTotal!: number;
    isv!:number;
    total!:number;

    constructor(){
        this.fecha = null;
        this.fechaFinaliza = null;
        this.cliente = this.cliente!;
        this.precios = this.precios!;
        this.subTotal = this.subTotal!;
        this.isv = this.isv!;
        this.total = this.total!;
    }

    validar(): any{
        let respuesta = {
            esValido : true,
            mensaje:''
        }
        if( this.cliente == null || this.cliente == undefined){
            respuesta.esValido = false;
            respuesta.mensaje = 'Seleccione un cliente'
        }else if( this.precios == null || this.precios == undefined){
            respuesta.esValido = false;
            respuesta.mensaje = 'No ha seleccionado un precio'
        }
        else if( this.fecha == null || this.fecha == undefined){
            respuesta.esValido = false;
            respuesta.mensaje = 'No tiene fecha inicio'
        }else if( this.fechaFinaliza == null || this.fechaFinaliza == undefined){
            respuesta.esValido = false;
            respuesta.mensaje = 'No tiene fecha final'
        } else if( this.subTotal == null || this.subTotal <= 0 || this.subTotal == undefined){
            respuesta.esValido = false;
            respuesta.mensaje = 'No se ha podido calcular el sub total'
        } else if( this.isv == null || this.isv <= 0 || this.isv == undefined){
            respuesta.esValido = false;
            respuesta.mensaje = 'No se ha podido calcular el isv'
        } else if( this.total == null || this.total <= 0 || this.total == undefined){
            respuesta.esValido = false;
            respuesta.mensaje = 'No se ha podido calcular el total'
        } 
        return respuesta;
    }


}