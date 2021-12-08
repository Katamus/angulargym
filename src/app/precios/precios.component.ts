import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Precio } from '../models/precios';
import { MensakesService } from '../service/mensakes.service';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {
  formularioPrecio!:FormGroup;
  esEditar:boolean = false;
  id!:string;
  precios:Precio[] = new Array<Precio>();
  constructor( private fb: FormBuilder, private db: AngularFirestore, private msg: MensakesService) { }

  ngOnInit(): void {
    this.formularioPrecio = this.fb.group({
      nombre:['', Validators.required],
      costo:['',Validators.required],
      duracion:['', Validators.required],
      tipoDuracion:['', Validators.required]
    });
    this.mostrarPrecios();
  }

  agregar(){
    this.db.collection<Precio>('precios').add(this.formularioPrecio.value).then(()=>{
      this.msg.mensajeCorrecto('Agregado','Se agrego correctamente');
      this.formularioPrecio.reset();
      this.mostrarPrecios();
    }).catch(()=>{
      this.msg.mensajeError('Error','Ocurrio un error');
    });
  }

  editarPrecio(precio:Precio){
    this.esEditar = true;
    this.formularioPrecio.setValue({
      nombre:precio.nombre,
      costo:precio.costo,
      duracion:precio.duracion,
      tipoDuracion:precio.tipoDuracion
    });
    this.id = precio.id;
  }

  editar(){
    this.db.doc('precios/'+this.id).update(this.formularioPrecio.value).then(()=>{
      this.msg.mensajeCorrecto('Editado','Se edito correctamente');
      this.formularioPrecio.reset();
      this.esEditar = false;
      this.mostrarPrecios();
    }).catch(()=>{
      this.msg.mensajeCorrecto('Error','Error al editar');
    });
  }

  mostrarPrecios(){
    this.precios.length= 0;
    this.db.collection('precios').get().subscribe((resultado)=>{
      resultado.forEach((dato)=>{
        let precio:any  = dato.data() as Precio;
        precio.id = dato.id;
        precio.ref = dato.ref;
        this.precios.push(precio);
      })
    });
  }

}
