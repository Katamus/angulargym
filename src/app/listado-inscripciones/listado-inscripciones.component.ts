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
    this.inscripciones.length = 0;
    this.db.collection('inscripciones').get().subscribe((resultado)=>{
      resultado.forEach((inscripcion)=>{
        console.log(inscripcion.data());
        let inscripcionObtenida:any = inscripcion.data();
        inscripcionObtenida.id = inscripcion.id;
        this.db.doc(inscripcionObtenida.cliente.path).get().subscribe((cliente)=>{
          inscripcionObtenida.fecha = new Date(inscripcionObtenida.fecha.seconds * 1000);
          inscripcionObtenida.fechaFinaliza = new Date(inscripcionObtenida.fechaFinaliza.seconds * 1000);
          inscripcionObtenida.clienteObtenido = cliente.data();
          this.inscripciones.push(inscripcionObtenida);
        })
      })
    })

  }

}
