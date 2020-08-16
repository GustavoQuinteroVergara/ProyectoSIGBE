import { Component, OnInit } from '@angular/core';
import  {ServiciocrearuserService } from './serviciocrearuser.service';
@Component({
  selector: 'app-crearusuario',
  templateUrl: './crearusuario.component.html',
  styleUrls: ['./crearusuario.component.css']
})
export class CrearusuarioComponent  {

  usuario:any;
  succes:any;

  constructor(private registraruser:ServiciocrearuserService) { }
  registrouser(identificacion:any,nombre:any,apellido:any,email:any,codigo:any,contrasena:any){
    this.usuario={
   identificacion:identificacion,
   nombre:nombre,
   apellido:apellido,
   correo:email,
   codigoestudiante:codigo,
   contrasena:contrasena 
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
