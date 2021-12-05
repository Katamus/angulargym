import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss']
})
export class AgregarClienteComponent implements OnInit {
  formularioCliente!:FormGroup;
  porcentajeSubida:number = 0;
  urlImage!:string;
  constructor( private fb:FormBuilder, private storage: AngularFireStorage,private db: AngularFirestore, private activeRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    
    this.formularioCliente = this.fb.group({
      nombre:["",Validators.required],
      apellido:["",Validators.required],
      correo:["",Validators.compose([
        Validators.required,Validators.email
      ])],
      cedula:[""],
      fechaNacimiento:['',Validators.required],
      telefono:[""],
      imgUrl:["",Validators.required]
    });

    let id = this.activeRoute.snapshot.params.clienteID;
    this.db.doc<any>('Clientes/'+id).valueChanges().subscribe((cliente)=>{
      if(typeof cliente != 'undefined'){
        console.log(cliente);
        this.formularioCliente.setValue({
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          correo: cliente.correo,
          cedula: cliente.cedula,
          fechaNacimiento: cliente.fechaNacimiento,
          telefono: cliente.telefono,
          imgUrl : ''
        });
        this.urlImage = cliente.urlImage;
      }
    });
  }

  agregar(){
    this.formularioCliente.value.imgUrl = this.urlImage;
    this.formularioCliente.value.fechaNacimiento = new Date(this.formularioCliente.value.fechaNacimiento);
    console.log(this.formularioCliente.value);
    this.db.collection('Clientes').add(this.formularioCliente.value).then((termino)=>{
      console.log("Registro Creado");
    });
  }

  subirImagen(evento:any){
    if(evento.target.files.length > 0 ){
      //debugger;
      let nombre = new Date().getTime().toString();
      let archivo = evento.target.files[0];
      
      
      let extension = archivo.name.toString().substring(archivo.name.toString().lastIndexOf('.'));
      let ruta = 'clientes/'+nombre+extension;
      const referencia = this.storage.ref(ruta);

      /**simplemente lo sube**/
      const tarea = referencia.put(archivo);
      tarea.then((objeto)=>{
        console.log("Imagen subida");
        referencia.getDownloadURL().subscribe((url)=>{
          this.urlImage = url;
        })
      });
      tarea.percentageChanges().subscribe((porcentaje:any)=>{
        this.porcentajeSubida = parseInt(porcentaje.toString()) ;
      });
    }
    
  }

}
