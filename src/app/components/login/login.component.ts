import { Component, OnInit } from '@angular/core';

import {ServiceloginService} from './servicelogin.service';
import {Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario:any;

  constructor(private logins:ServiceloginService,private router:Router) { }

  login(email:string, contrasena:string){
    this.logins.buscarUser(email).subscribe(result =>{ 
      console.log(result["roles"]); 
      this.usuario = {'nombre':result["nombre"],
                      'email':result["correo"],
                      'identi':result["identificacion"],
                      'codigoest':result["codigoestudiante"],
                      'rol':result["roles"]};
      if(result["contrasena"] == contrasena){
        localStorage.setItem('currentUser',JSON.stringify(this.usuario));
        this.router.navigate(['/registroConvocatoria']);
      }else{
        console.log("error");
      }
      this.usuario = result; });
    console.log(this.usuario);
    
  }

  logout(){
     localStorage.removeItem('currentUser');
  }
}
