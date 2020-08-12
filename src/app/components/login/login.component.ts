import { Component, OnInit } from '@angular/core';

import {ServiceloginService} from './servicelogin.service';
import {Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario= null;

  constructor(private logins:ServiceloginService,private router:Router) { }

  buscarUsuario(email:string, contrasena:string){
    this.logins.buscarUser(email).subscribe(result =>{ 
      console.log(result["roles"]); 
      if(result["contrasena"] == contrasena){
        this.router.navigate(['/registroConvocatoria']);
      }else{
        console.log("error");
      }
      this.usuario = result; });
    console.log(this.usuario);
    
  }
}
