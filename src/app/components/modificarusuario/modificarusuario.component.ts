import { Component, OnInit } from '@angular/core';

import { MatSliderModule } from '@angular/material/slider';
import{ActualizarSaldoService} from './actualizar-saldo.service';
import{UsuariocarreraService} from '../../services/usuariocarrera.service';
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
  newCarrera:any;
  success:any;
  carrerasest:any;
  dialogCarrera:MatDialog;
  getcarreras:any;
  $nombreusuario= JSON.parse(localStorage.getItem('currentUser'));
  /*VALIDACION FORM*/
  public updateForm: FormGroup;
  constructor(matslider: MatSliderModule, 
    private serviceSaldo:ActualizarSaldoService, 
    private usuariocarreraService:UsuariocarreraService,
    public dialog: MatDialog) { 
    this.getCarrerasEst();
    this.getCarreras();
    
  }
/*INICIO VALIDACIONES*/ 
  ngOnInit(): void {
    
      this.updateForm = new FormGroup({
        nombre: new FormControl(this.$nombreusuario.nombre,[Validators.required, Validators.maxLength(30), Validators.pattern("[a-zA-Z ]*")  , Validators.minLength(3),]),
        apellido: new FormControl(this.$nombreusuario.apellido,[Validators.required,Validators.maxLength(40),Validators.minLength(5),Validators.pattern("[a-zA-Z ]*")]),
        correo: new FormControl(this.$nombreusuario.correo,[Validators.required])
      });
    
  }
 
  public hasError = (controlName: string, errorName: string) =>{
    return this.updateForm.controls[controlName].hasError(errorName);
  }
  /*FIN VALIDACIONES*/ 

  getCarrerasEst(){
    this.usuariocarreraService.carrerasEst(this.$nombreusuario.identi).subscribe(result=>{
      this.carrerasest = result;
    });
  }

  getCarreras(){
    this.usuariocarreraService.getCarreras().subscribe(result=>{
      this.getcarreras = result;
    });
  }

  abrirModalCarrera(abrirModal){
    let dialogRef = this.dialog.open( abrirModal,{
         height: '380px',
         width: '420px',
    });

  }

  agregarCarrera(carrerasel:any,codigoest:any,biencarrera,malcarrera,carrerarepetida){

    this.newCarrera= {
      idCarr:carrerasel.idcarrera,
      codigoest:codigoest,
      idUser:this.$nombreusuario.identi
    };

    this.usuariocarreraService.foundCarreraByIdenCarr(this.$nombreusuario.identi,carrerasel.idcarrera).subscribe(result=>{
        let dialogRef = this.dialog.open( carrerarepetida,{
           height: '180px',
           width: '350px',
         });
    },(err)=>{
      console.log(err);
      this.usuariocarreraService.agregarCarreraEst(this.newCarrera).subscribe(result=>{
        let dialogRef = this.dialog.open( biencarrera,{
           height: '180px',
           width: '350px',
         });
        this.getCarrerasEst();
      },(err)=>{
        console.log(err);
        let dialogRef = this.dialog.open( malcarrera,{
           height: '180px',
           width: '350px',
         });
      });
    });

  }
  registrarSaldo(identificacion:any,correo:any,apellido:any,  
    nombre:any,templateRef){
    this.saldoRegistrado= {
      identificacion:identificacion,
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
