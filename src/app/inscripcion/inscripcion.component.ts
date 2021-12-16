import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from '../models/cliente';
import { Inscripcion } from '../models/inscripcion';
import { Precio } from '../models/precios';
import { MensakesService } from '../service/mensakes.service';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {
  clienteSeleccionado:Cliente = new Cliente();
  precioSeleccionado:Precio = new Precio();
  inscripcion: Inscripcion = new Inscripcion();
  precios: Precio[] = new Array<Precio>();
  idPrecio:string = "null";
  constructor( private db:AngularFirestore, private msj:MensakesService ) { }
  
  ngOnInit(): void {
    this.db.collection('precios').get().subscribe((resultado)=>{
      resultado.docs.forEach((item)=>{
        let precio:any = item.data() as Precio;
        precio.id = item.id;
        precio.ref = item.ref;
        this.precios.push(precio);
      })
    })
  }

  asignarCliente(cliente:Cliente){
    this.inscripcion.cliente = cliente.ref;
    this.clienteSeleccionado = cliente;
  }

  eliminarCliente(){
    this.clienteSeleccionado =  new Cliente();
    this.inscripcion.cliente = null;
  }

  guardar(){
    if( this.inscripcion.validar().esValido ){

      let inscripcionAgregar = {
        fecha : this.inscripcion.fecha,
        fechaFinaliza : this.inscripcion.fechaFinaliza,
        cliente : this.inscripcion.cliente,
        precios : this.inscripcion.precios,
        subTotal : this.inscripcion.subTotal,
        isv : this.inscripcion.isv,
        total : this.inscripcion.total
      }


      this.db.collection('inscripciones').add(inscripcionAgregar).then((resultado)=>{
        this.inscripcion = new Inscripcion();
        this.clienteSeleccionado = new Cliente();
        this.precioSeleccionado = new Precio();
        this.idPrecio = "null";
        this.msj.mensajeCorrecto("Inscripción","se guardo Correctamente");
      }).catch(()=>{
        this.msj.mensajeCorrecto("Inscripción","Error en el Guardado");
      });
    }else{
      this.msj.mensajeAdvertencia("Inscripción",this.inscripcion.validar().mensaje);
    }
  }

  seleccionarPrecio(target:any){
    if( target.value != "null" ){
      this.precioSeleccionado = this.precios.find( item => item.id == target.value )!;
      console.log(this.precioSeleccionado);
      this.inscripcion.precios = this.precioSeleccionado.ref
      this.inscripcion.fecha = new Date();
      let dias!:number;
      let meses!:number;
      let anios!:number;
      console.log(this.precioSeleccionado.tipoDuracion);
      let tipoDuracion:number = this.precioSeleccionado.tipoDuracion;
      switch (~~tipoDuracion) {
        case 1:
          dias = this.precioSeleccionado.duracion;
          this.inscripcion.fechaFinaliza = this.sumarDiasFecha(this.inscripcion.fecha,dias);
          break;
        case 2:
          dias = this.precioSeleccionado.duracion * 7;
          this.inscripcion.fechaFinaliza = this.sumarDiasFecha(this.inscripcion.fecha,dias);
          break;
        case 3:
          dias = this.precioSeleccionado.duracion * 15;
          this.inscripcion.fechaFinaliza = this.sumarDiasFecha(this.inscripcion.fecha,dias);
          break;
        case 4:
          meses = this.precioSeleccionado.duracion ;
          this.inscripcion.fechaFinaliza = this.sumarMesesFecha(this.inscripcion.fecha,meses);
          break;
        case 5:
          anios = this.precioSeleccionado.duracion ;
          this.inscripcion.fechaFinaliza = this.sumarAnioFecha(this.inscripcion.fecha,anios);
            break;
        default:
            break;
      }

      this.inscripcion.subTotal = this.precioSeleccionado.costo;
      this.inscripcion.isv = this.inscripcion.subTotal * 0.15;
      this.inscripcion.total = this.inscripcion.subTotal + this.inscripcion.isv;
    }else{
      this.precioSeleccionado = new Precio();
      this.inscripcion.fecha = null;
      this.inscripcion.fechaFinaliza = null;
      this.inscripcion.precios = null;
      this.inscripcion.subTotal = 0;
      this.inscripcion.isv = 0;
      this.inscripcion.total = 0;
    }
  }

  sumarDiasFecha( fechaInicial:Date, cantidadDias:number){
      return new Date(fechaInicial.getFullYear(), fechaInicial.getMonth(),fechaInicial.getDate() + cantidadDias );
  }

  sumarMesesFecha( fechaInicial:Date, cantidadMeses:number){
    return new Date(fechaInicial.getFullYear(), fechaInicial.getMonth() + cantidadMeses,fechaInicial.getDate());
  }

  sumarAnioFecha( fechaInicial:Date, cantidadAnio:number){
    return new Date(fechaInicial.getFullYear() + cantidadAnio, fechaInicial.getMonth(),fechaInicial.getDate());
  }

}
