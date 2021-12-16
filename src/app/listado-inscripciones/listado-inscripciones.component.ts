import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Inscripcion } from '../models/inscripcion';

@Component({
  selector: 'app-listado-inscripciones',
  templateUrl: './listado-inscripciones.component.html',
  styleUrls: ['./listado-inscripciones.component.scss']
})
export class ListadoInscripcionesComponent implements OnInit {

  constructor(private db: AngularFirestore) { }
  inscripciones: any[] = new Array<Inscripcion>();
  ngOnInit(): void {

    this.db.collection('inscripciones').get().subscribe((resultado)=>{
      resultado.forEach((inscripcion)=>{
        let inscripcionObtenida:any = inscripcion.data();
        inscripcionObtenida.id = inscripcion.id;
        console.log(inscripcionObtenida);
        this.db.doc(inscripcionObtenida.cliente.path).get().subscribe((cliente)=>{
          inscripcionObtenida.clienteObtenido = cliente.data()
        })

      })
    })

  }

}
