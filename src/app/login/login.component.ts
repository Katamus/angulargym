import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formularioLogin!:FormGroup;
  datosCorrectos:boolean = true;
  textoError:String = "";
  constructor( private creadordeformulario:FormBuilder,public auth: AngularFireAuth,private spinner: NgxSpinnerService ) { }

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
    if(this.formularioLogin.valid){
      this.datosCorrectos = true;
      this.spinner.show();
      this.auth.signInWithEmailAndPassword(this.formularioLogin.value.email,this.formularioLogin.value.password).then((usuario)=>{
        console.log(usuario);
        this.spinner.hide();
      }).catch((error)=>{
        console.log(error);
        this.datosCorrectos = false;
        this.textoError = error.message;
        this.spinner.hide();
      })
    }else{
      this.datosCorrectos = false;
      this.textoError = 'Por favor revisa que los datos esten correctos';
    }
    
  }

}
