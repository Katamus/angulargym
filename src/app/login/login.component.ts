import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formularioLogin!:FormGroup;

  constructor( private creadordeformulario:FormBuilder,public auth: AngularFireAuth ) { }

  ngOnInit(): void {
    this.formularioLogin = this.creadordeformulario.group({
      email:['',Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password:['',Validators.required
      ]
    })
  }

  ingresar(){
    this.auth.signInWithEmailAndPassword(this.formularioLogin.value.email,this.formularioLogin.value.password).then((usuario)=>{
      console.log(usuario);
    })
  }

}
