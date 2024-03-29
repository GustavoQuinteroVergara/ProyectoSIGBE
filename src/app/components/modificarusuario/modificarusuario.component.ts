import { Component, OnInit } from '@angular/core';

import { MatSliderModule } from '@angular/material/slider';
import{ActualizarSaldoService} from './actualizar-saldo.service';
import{UsuariocarreraService} from '../../services/usuariocarrera.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
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
      this.carrerasest = [result];
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

  agregarCarrera(carrerasel:any,codigoest:any){

    this.newCarrera= {
      idCarr:carrerasel.idcarrera,
      codigoest:codigoest,
      idUser:this.$nombreusuario.identi
    };

    this.usuariocarreraService.foundCarreraByIdenCarr(this.$nombreusuario.identi,carrerasel.idcarrera).subscribe(result=>{
          Swal.fire({
                title: 'ERROR',
                text: 'Error, ya tienes guardado esa carrera',
                icon: 'error'
          });  
    },(err)=>{
      if(this.carrerasest[0].length >= 3){
          Swal.fire({
              title: 'ERROR',
              text: 'Error, ya tienes el limite de carreras actuales.',
              icon: 'error'
          });  
      }else{
        this.usuariocarreraService.agregarCarreraEst(this.newCarrera).subscribe(result=>{
          Swal.fire({
            title: 'Exitoso',
            text: 'Carrera registrada exitosamente.',
            icon: 'success'
          });  
          this.getCarrerasEst();
        },(err)=>{
          Swal.fire({
            title: 'Exitoso',
            text: 'Error al agregar la carrera.',
            icon: 'success'
          }); 
        });
      }

    });

  }
  registrarSaldo(identificacion:any,correo:any,apellido:any,  
    nombre:any){
    this.saldoRegistrado= {
      identificacion:identificacion,
      correo:correo,
      apellido:apellido,
      nombre:nombre
    };
    this.serviceSaldo.registrarSaldos(this.saldoRegistrado).subscribe
    (res=>{
      Swal.fire({
        title: 'Exitoso',
        text: 'Actualizado exitosamente.',
        icon: 'success'
      });  
       this.$nombreusuario.correo=correo;
       this.$nombreusuario.apellido=apellido;
       this.$nombreusuario.nombre=nombre;
       localStorage.setItem('currentUser',JSON.stringify(this.$nombreusuario));
    },(err)=>{
      Swal.fire({
        title: 'Exitoso',
        text: 'Error al actualizar.' + err.error.text,
        icon: 'success'
      }); 
    });
  }


}
