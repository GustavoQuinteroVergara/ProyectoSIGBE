import { Component, OnInit } from '@angular/core';
import  {ServiciocrearuserService } from '../crearusuario/serviciocrearuser.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ServiceloginService} from '../login/servicelogin.service';
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
  iddepartamento:any;
  departamento:any;
  ciud:any;
  carreras:any;

  departamentos:any;
  constructor(private registraruser:ServiciocrearuserService,  
    public form:FormBuilder,
    public dialog: MatDialog,
    public serviceLogin:ServiceloginService) { 
    this.formulariologin= this.form.group({
      identificacion:['', [Validators.required,Validators.minLength(6)]],
      nombre:['', [Validators.required,Validators.minLength(3),Validators.pattern("[a-zA-Z ]*")] ],
      apellido:['', [Validators.required,Validators.minLength(3),Validators.pattern("[a-zA-Z ]*")] ],
      direccion:['', [Validators.required,Validators.minLength(3)]],
      acceptTerms: [false, Validators.requiredTrue],
      email:['', [Validators.email,Validators.required]],
      codigo:['', [Validators.required,Validators.minLength(5)]],
      contrasena:['', [Validators.required,Validators.minLength(7)]],
    });
    this.buscardepartamento();
    this.buscarcarrera(); 
  }

  buscardepartamento(){
    this.registraruser.buscardepartamento()
    .subscribe(res=>{
      console.log(res);
      this.departamentos=res;
    });
  }

   buscarcarrera(){
    this.registraruser.buscarCarrera()
    .subscribe(res=>{
     this.carreras=res;
    });
   }


  registrouser(identificacion:any,nombre:any,apellido:any,direccion:any,email:any,contrasena:any,roles:any,estadouser:any,zonaresidencial:any,ciudad:any,fechanacimiento:any,estrato:any,codigo:any,codigocarrera:any,templateRef,emailexistente){
    this.usuario={
     identificacion:identificacion,
     nombre:nombre,
     apellido:apellido,
     correo:email,
     direccion:direccion,
     contrasena:contrasena,
     zonaresidencial:zonaresidencial,
     fechanacimiento:fechanacimiento,
     ciudad:ciudad,
     estrato:estrato,
     roles:roles,
     estadouser:estadouser,
     codigo:codigo,
     codigocarrera:codigocarrera
    };
    this.serviceLogin.buscarUser(email).subscribe(result=>{
        let dialogRef = this.dialog.open( emailexistente,{
           height: '200px',
           width: '200px',
         });
    },(err)=>{
      this.registraruser.registrarUsuario(this.usuario)
      .subscribe(res=>{
        this.success = true;
        let dialogRef = this.dialog.open( templateRef,{
           height: '300px',
           width: '280px',
         });
      },(err)=>{
        //console.log('ERROR: ' + err.error.text);
        this.success = false;
        let dialogRef = this.dialog.open( templateRef,{
           height: '300px',
           width: '280px',
         });
      });
    });

  
  }

  departamentoselec(event:any){
    this.departamento=   JSON.stringify(event); 
   this.iddepartamento={
    iddepartamento:this.departamento
  };
  console.log(this.iddepartamento);
  
  this.registraruser.buscarCiudad(this.iddepartamento)
  .subscribe(res=>{
    this.ciud = res;
  });
    

  } 
}
