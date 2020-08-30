import { Component, OnInit } from '@angular/core';
import  {ServiciocrearuserService } from '../crearusuario/serviciocrearuser.service'

@Component({
  selector: 'app-crearusuariologin',
  templateUrl: './crearusuariologin.component.html',
  styleUrls: ['./crearusuariologin.component.css']
})
export class CrearusuariologinComponent{

  usuario:any;
  succes:any;

  constructor(private registraruser:ServiciocrearuserService) { }
  registrouser(identificacion:any,nombre:any,apellido:any,email:any,codigo:any,contrasena:any,roles:any){
    this.usuario={
   identificacion:identificacion,
   nombre:nombre,
   apellido:apellido,
   correo:email,
   codigoestudiante:codigo,
   contrasena:contrasena,
   roles:roles 
    };
    this.registraruser.registrarUsuario(this.usuario)
    .subscribe(res =>{
     console.log(res);
 
 
     },(err)=>{
     
 
        console.log('ERROR: ' + err.error.text);
     });
   console.log(this.usuario);
    
    }


}
