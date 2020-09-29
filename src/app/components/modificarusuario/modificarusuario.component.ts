import { Component, OnInit } from '@angular/core';

import { MatSliderModule } from '@angular/material/slider';
import{ActualizarSaldoService} from './actualizar-saldo.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-modificarusuario',
  templateUrl: './modificarusuario.component.html',
  styleUrls: ['./modificarusuario.component.css']
})
export class ModificarusuarioComponent implements OnInit {
  registroSaldo:any[]=[];
  saldoRegistrado:any;
  success:any;
  $nombreusuario= JSON.parse(localStorage.getItem('currentUser'));
  /*VALIDACION FORM*/
  public updateForm: FormGroup;
  constructor(matslider: MatSliderModule, private serviceSaldo:ActualizarSaldoService, public dialog: MatDialog) { 
    
  }
/*INICIO VALIDACIONES*/ 
  ngOnInit(): void {
    
      this.updateForm = new FormGroup({
        nombre: new FormControl(this.$nombreusuario.nombre,[Validators.required, Validators.maxLength(30), Validators.pattern("[a-zA-Z ]*")  , Validators.minLength(3),]),
        apellido: new FormControl(this.$nombreusuario.apellido,[Validators.required,Validators.maxLength(40),Validators.minLength(5),Validators.pattern("[a-zA-Z ]*")]),
        correo: new FormControl(this.$nombreusuario.correo,[Validators.required]),
        codigoestudiante: new FormControl(this.$nombreusuario.codigoest,[Validators.required,Validators.maxLength(9),Validators.minLength(7)])
      });
    
  }
 
  public hasError = (controlName: string, errorName: string) =>{
    return this.updateForm.controls[controlName].hasError(errorName);
  }
  /*FIN VALIDACIONES*/ 
  registrarSaldo(identificacion:any,saldo:any,codigoestudiante:any,correo:any,apellido:any,  
    nombre:any,templateRef){
    this.saldoRegistrado= {saldo:saldo,
      identificacion:identificacion,
      codigoestudiante:codigoestudiante,
      correo:correo,
      apellido:apellido,
      nombre:nombre
    };
    this.serviceSaldo.registrarSaldos(this.saldoRegistrado).subscribe
    (res=>{
      this.success = true;
      let dialogRef = this.dialog.open( templateRef,{
         height: '200px',
         width: '200px',
       });
       this.$nombreusuario.saldo=saldo;
       this.$nombreusuario.codigoest=codigoestudiante;
       this.$nombreusuario.correo=correo;
       this.$nombreusuario.apellido=apellido;
       this.$nombreusuario.nombre=nombre;
       localStorage.setItem('currentUser',JSON.stringify(this.$nombreusuario));
    },(err)=>{
      //console.log('ERROR: ' + err.error.text);
      this.success = false;
      let dialogRef = this.dialog.open( templateRef,{
         height: '200px',
         width: '200px',
       });
    });
    console.log(this.saldoRegistrado);
  
  }
}
