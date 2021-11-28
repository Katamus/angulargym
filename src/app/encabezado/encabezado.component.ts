import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {
  usuarios!:any;
  constructor(private auth: AngularFireAuth) { 
    this.auth.user.subscribe((usuarios:any)=>{
      this.usuarios = usuarios
  });
  }

  ngOnInit(): void {
  }

  logout() {
    this.auth.signOut();
  }

}
