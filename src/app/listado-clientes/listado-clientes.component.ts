import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss']
})
export class ListadoClientesComponent implements OnInit {
  clientes:any[] = new Array<any>();
  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    /*
    this.db.collection('Clientes').valueChanges().subscribe((resultado)=>{
      this.clientes = resultado;
    });
    */

    this.clientes.length = 0;
    this.db.collection('Clientes').get().subscribe((resultado)=>{
      console.log(resultado.docs);

        resultado.docs.forEach((item)=>{
          let cliente:any = item.data();
          cliente.id = item.id;
          cliente.ref = item.ref;
          this.clientes.push(cliente);
        })
        /*
        for (let item of resultado.docs) {
          console.log(item.id);
          console.log(item.data());
          console.log(item.ref);
        }
        */


    })




    
  }

}
