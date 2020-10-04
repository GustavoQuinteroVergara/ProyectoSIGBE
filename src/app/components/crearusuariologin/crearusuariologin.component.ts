import { Component, OnInit } from '@angular/core';
import  {ServiciocrearuserService } from '../crearusuario/serviciocrearuser.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-crearusuariologin',
  templateUrl: './crearusuariologin.component.html',
  styleUrls: ['./crearusuariologin.component.css']
})
export class CrearusuariologinComponent{

  usuario:any;
  success:any;
  formulariologin:FormGroup;

  constructor(private registraruser:ServiciocrearuserService,  public form:FormBuilder,public dialog: MatDialog) { 
    this.formulariologin= this.form.group({
      identificacion:['', [Validators.required,Validators.minLength(6)]],
      nombre:['', [Validators.required,Validators.minLength(3),Validators.pattern("[a-zA-Z ]*")] ],
      apellido:['', [Validators.required,Validators.minLength(3),Validators.pattern("[a-zA-Z ]*")] ],
      email:['', [Validators.email,Validators.required]],
      codigo:['', [Validators.required,Validators.minLength(5)]],
      contrasena:['', [Validators.required,Validators.minLength(7)]],
     
      
    });




  }
  registrouser(identificacion:any,nombre:any,apellido:any,email:any,codigo:any,contrasena:any,roles:any,estadouser:any,templateRef){
    this.usuario={
   identificacion:identificacion,
   nombre:nombre,
   apellido:apellido,
   correo:email,
   codigoestudiante:codigo,
   contrasena:contrasena,
   roles:roles,
   estadouser:estadouser 
    };
    this.registraruser.registrarUsuario(this.usuario)
    .subscribe(res=>{
      this.success = true;
      let dialogRef = this.dialog.open( templateRef,{
         height: '200px',
         width: '200px',
       })
    },(err)=>{
      //console.log('ERROR: ' + err.error.text);
      this.success = false;
      let dialogRef = this.dialog.open( templateRef,{
         height: '200px',
         width: '200px',
       });
    });
    console.log(this.usuario);
  
  }
}
