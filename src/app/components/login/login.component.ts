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
  ruta:any;
  constructor(private logins:ServiceloginService,private router:Router) {
    
   }

  login(email:string, contrasena:string){
    this.logins.buscarUser(email).subscribe(result =>{ 
      console.log(result); 
      this.usuario = {'nombre':result["nombre"],
                      'apellido':result["apellido"],
                      'correo':result["correo"],
                      'identi':result["identificacion"],
                      'codigoest':result["codigoestudiante"],
                      'saldo':result["saldo"],
                      'rol':result["roles"],
                      'estadouser':result["estadouser"]};
      if((result["contrasena"] == contrasena) && (result["estadouser"]=='Activo') ) {
        localStorage.setItem('currentUser',JSON.stringify(this.usuario));
        this.router.navigate(['/bienvenida']);
      }else{
        console.log("error");
        console.log("No esta activo");
      }
      this.usuario = result; });

    console.log(this.usuario);
    
  }

  logout(){
     localStorage.removeItem('currentUser');
  }
}
