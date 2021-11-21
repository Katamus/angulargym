import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angulargym ';
  
  constructor(public auth: AngularFireAuth){}

  ngOnInit(): void {
    console.log(this.auth.user)
  }

  login(){
    this.auth.signInWithEmailAndPassword("criscahu@hotmail.com","123456");
  }

  logout() {
    this.auth.signOut();
  }



  
}
