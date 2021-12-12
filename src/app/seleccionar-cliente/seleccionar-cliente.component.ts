import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-seleccionar-cliente',
  templateUrl: './seleccionar-cliente.component.html',
  styleUrls: ['./seleccionar-cliente.component.scss']
})
export class SeleccionarClienteComponent implements OnInit {

  clientes:Cliente[] = new Array<Cliente>();
  @Input('nombre') nombre:string = "";
  @Output('seleccionoCliente') seleccionoCliente = new EventEmitter();
  @Output('cancelarCliente') canceloCliente = new EventEmitter();
  constructor(private db:AngularFirestore) { }
  
  ngOnInit(): void {
    this.db.collection<any>('Clientes').get().subscribe((resultados)=>{
      this.clientes.length = 0;
      resultados.docs.forEach((item)=>{
        let cliente: any = item.data();
        cliente.id = item.id;
        cliente.ref = item.ref;
        cliente.visible = false;
        this.clientes.push(cliente);
      })
    })
  }

  buscarClientes(target:any){
    let nombre:string = target.value.toLowerCase();
    this.clientes.forEach((result)=>{
      if(result.nombre.toLowerCase().includes(nombre)){
        result.visible = true;
      }else{
        result.visible = false;
      }
    });

  }

  seleccionarCliente(cliente:Cliente){
    this.nombre = cliente.nombre +' '+cliente.apellido;
    this.clientes.forEach((item)=>{
      item.visible= false;
    });
    this.seleccionoCliente.emit(cliente);
  }

  cancelarCliente(){
    this.nombre = "";
    this.canceloCliente.emit();
  }

}
