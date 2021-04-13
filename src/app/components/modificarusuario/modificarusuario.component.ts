import { Component, OnInit } from '@angular/core';

import { MatSliderModule } from '@angular/material/slider';
import{ActualizarSaldoService} from './actualizar-saldo.service';
import{UsuariocarreraService} from '../../services/usuariocarrera.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import  {ServiciocrearuserService } from '../crearusuario/serviciocrearuser.service';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';
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
  hide = true;
  ciud:any;
  iddepartamento:any;
  departamento:any;
  departamentos:any;
  cantCarreras=0;
  ciudades:any;
  public formularioCarrera: FormGroup;
  $nombreusuario= JSON.parse(localStorage.getItem('currentUser'));
  fechanacimiento = formatDate(this.$nombreusuario.fechanacimiento, 'yyyy-MM-dd', 'en')
  ciudad=this.$nombreusuario.ciudad;
  /*VALIDACION FORM*/
  public updateForm: FormGroup;
  constructor(matslider: MatSliderModule, 
    private serviceSaldo:ActualizarSaldoService, 
    private usuariocarreraService:UsuariocarreraService,
    private actualizaruser:ServiciocrearuserService,
    public dialog: MatDialog,
    public form:FormBuilder,) { 
    this.getCarrerasEst();
    this.getCarreras();
    
  }
/*INICIO VALIDACIONES*/ 

  ngOnInit(): void {
    
      this.updateForm = new FormGroup({
        nombre: new FormControl(this.$nombreusuario.nombre,[Validators.required, Validators.maxLength(30), Validators.pattern("[a-zA-Z ]*")  , Validators.minLength(3),]),
        apellido: new FormControl(this.$nombreusuario.apellido,[Validators.required,Validators.maxLength(40),Validators.minLength(5),Validators.pattern("[a-zA-Z ]*")]),
        correo: new FormControl(this.$nombreusuario.correo,[Validators.required]),
        password: new FormControl('',[Validators.required]),
        direccion: new FormControl(this.$nombreusuario.direccion,[Validators.required]),
      });
      this.formularioCarrera= this.form.group({
        codigoCarrera:['', [Validators.required,Validators.minLength(5)]],
        nombreCarrera:['', [Validators.required]],
      });
  }
  get passwordInput() { return this.updateForm.get('password'); }  

  public hasError = (controlName: string, errorName: string) =>{
    return this.updateForm.controls[controlName].hasError(errorName);
    
  }
  public hasErrors = (controlName: string, errorName: string) =>{
    return this.formularioCarrera.controls[controlName].hasError(errorName);
  }
  
  
  /*FIN VALIDACIONES*/ 

  getCarrerasEst(){
    this.usuariocarreraService.carrerasEst(this.$nombreusuario.identi).subscribe(result=>{
      this.carrerasest = result;
      this.cantCarreras = this.carrerasest.length;
      if(this.carrerasest.length == 0){
        this.carrerasest = null;
      }
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
                text: 'Error, ya tienes registrada esa carrera',
                icon: 'error'
          });  
    },(err)=>{
      if(this.carrerasest != null ){
        if(this.cantCarreras >= 3){
            Swal.fire({
                title: 'ERROR',
                text: 'Error, ya tienes el límite de carreras actuales.',
                icon: 'error'
            });  
        }else{
          this.usuariocarreraService.agregarCarreraEst(this.newCarrera).subscribe(result=>{
            Swal.fire({
              title: 'Exitoso',
              text: 'Carrera registrada exitosamente.',
              icon: 'success'
            });  
            let dialogRef = this.dialog.openDialogs[0];

            dialogRef.close();             
            this.getCarrerasEst();
          },(err)=>{
            Swal.fire({
              title: 'Exitoso',
              text: 'Error al agregar la carrera.',
              icon: 'success'
            }); 
          });
        }
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
  actualizarUsuario(contrasena:any){
    this.saldoRegistrado= {
      identificacion:this.$nombreusuario.identi,
      correo:this.$nombreusuario.correo,
      apellido:this.$nombreusuario.apellido,
      nombre:this.$nombreusuario.nombre,
      contrasena:contrasena,
      zonaresidencial:this.$nombreusuario.zonaresidencial,
      estrato:this.$nombreusuario.estrato,
      fechanacimiento:formatDate(this.$nombreusuario.fechanacimiento, 'yyyy-MM-dd', 'en'),
      direccion:this.$nombreusuario.direccion
    };
    console.log(this.saldoRegistrado);
    console.log(this.$nombreusuario.fechanacimiento);
    console.log("prueba1: "+this.$nombreusuario.fechanacimiento);
    this.serviceSaldo.registrarSaldos(this.saldoRegistrado).subscribe
    (res=>{
      Swal.fire({
        title: 'Exitoso',
        text: 'Actualizado exitosamente.',
        icon: 'success'
      });
       this.$nombreusuario.fechanacimiento;
       this.$nombreusuario.contrasena=contrasena;
       localStorage.setItem('currentUser',JSON.stringify(this.$nombreusuario));
    },(err)=>{
      console.log("prueba2: "+this.$nombreusuario.fechanacimiento);
      Swal.fire({
        title: 'Error',
        text: 'Error al actualizar.' + err.error.text,
        icon: 'error'
        
      }); 
    });
  }

}
