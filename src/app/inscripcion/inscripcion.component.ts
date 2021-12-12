import { Component, OnInit } from '@angular/core';
import { Cliente } from '../models/cliente';
import { Inscripcion } from '../models/inscripcion';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {
  clienteSeleccionado:Cliente = new Cliente();
  constructor() { }
  inscripcion: Inscripcion = new Inscripcion();
  ngOnInit(): void {
  }

  asignarCliente(cliente:Cliente){
    this.inscripcion.cliente = cliente.ref;
    this.clienteSeleccionado = cliente;
  }

  eliminarCliente(){
    this.clienteSeleccionado =  new Cliente();
    this.inscripcion = new Inscripcion();
  }

  guardar(){
    console.log(this.inscripcion);
  }

}
