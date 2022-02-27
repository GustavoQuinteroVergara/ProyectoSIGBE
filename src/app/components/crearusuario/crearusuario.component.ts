import { Component, OnInit } from '@angular/core';
import  {ServiciocrearuserService } from './serviciocrearuser.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {formatDate } from '@angular/common';
import {Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-crearusuario',
  templateUrl: './crearusuario.component.html',
  styleUrls: ['./crearusuario.component.css']
})
export class CrearusuarioComponent implements OnInit  {

formulariologin:FormGroup;
usuario:any;
success:any;
iddepartamento:any;
departamento:any;
ciud:any;
fechaActual= formatDate(new Date(), 'yyyy-MM-dd', 'en');
carreras:any;
departamentos:any;
roles:any;
  constructor(private registraruser:ServiciocrearuserService, public form:FormBuilder, public dialog: MatDialog,private router:Router) {
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
    this.buscarrol();

   }
   ngOnInit(): void {}

   saveData(){
console.log(this.formulariologin.value);
   }
   buscardepartamento(){
    this.registraruser.buscardepartamento()
    .subscribe(res=>{
      console.log(res);
      this.departamentos=res;
    });
  }
  buscarrol(){
    this.registraruser.buscarroles()
    .subscribe(res=>{
      console.log(res);
      this.roles=res;
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
    this.registraruser.registrarUsuario(this.usuario)
    .subscribe(res=>{
      Swal.fire({
        title: 'Exitoso',
        text: 'Registro exitoso.',
        icon: 'success'
      });
      this.router.navigate(['/bienvenida']);
    },(err)=>{
      Swal.fire({
        title: 'Exitoso',
        text: 'Error al Registrar. ERR: ' + err.error,
        icon: 'success'
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
