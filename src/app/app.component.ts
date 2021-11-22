import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title:string = 'angulargym ';
  cargando:boolean = true;
  usuario!:any;
  constructor(public auth: AngularFireAuth){
    this.auth.user.subscribe((usuario)=>{
      setTimeout(() => {
        console.log(usuario);
        this.usuario = usuario;
        this.cargando = false;
      }, 1000);
    });

  }

  ngOnInit(): void {
    console.log(this.auth.user)
  }

  logout() {
    this.auth.signOut();
  }



  
}
