import { Component, OnInit } from '@angular/core';
import {ServiceListarPostuEstService} from './service-listar-postu-est.service';
import {PostulacionService} from '../../../services/postulacion.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-listarpostuest',
  templateUrl: './listarpostuest.component.html',
  styleUrls: ['./listarpostuest.component.css']
})
export class ListarpostuestComponent {
	userToken= JSON.parse(localStorage.getItem('currentUser'));
	postusBuscadas:any;
  postuSeleccionada:any;
  activarUpdate = false;
  myForm: FormGroup;
  listActualizarPostu:any;
  success=false;
  intentosPermitidos=false;
  constructor(private serviceListarPostuEst:ServiceListarPostuEstService,private postuservice:PostulacionService,public fb: FormBuilder,public dialog: MatDialog) { 
	this.buscarPostusEst();

  }

  abrirPostu(templateRef,postu:any){
    this.postuSeleccionada = postu;
    this.myForm = this.fb.group({
      promedio: [{value:this.postuSeleccionada.promedio,disabled:true}, [Validators.required,Validators.minLength(1),Validators.maxLength(2)]],
      semestre: [this.postuSeleccionada.semestre, [Validators.required]],
      estrato: [this.postuSeleccionada.estrato, [Validators.required]]
    });
  	    let dialogRef = this.dialog.open( templateRef,{
         height: '500px',
         width: '500px',
       });
  }



  activarActualizar(){
    if(!this.activarUpdate){
      this.activarUpdate = true;
      this.myForm.controls['promedio'].reset({ value: '', disabled: false });
    }else{
      this.activarUpdate = false;
      this.myForm.controls['promedio'].reset({ value: this.postuSeleccionada.promedio, disabled: true });
    }
  }

  actualizarPostu(semestre:any,estrato:any,promedio:any,templateRefestados){
     if(this.postuSeleccionada.cantmodificaciones <= 2){
      this.postuSeleccionada.cantmodificaciones++;
      this.listActualizarPostu = {
        idpostu: this.postuSeleccionada.consecutivo_postulacion,
        semestre:semestre,
        estrato:estrato,
        promedio:promedio,
        cantmodificaciones:this.postuSeleccionada.cantmodificaciones
      }
      console.log(this.listActualizarPostu);
      this.postuservice.actualizarPostulacion(this.listActualizarPostu).subscribe(result=>{
        this.success = true;
        let dialogRef = this.dialog.open( templateRefestados,{
           height: '200px',
           width: '200px',
         });
      },(err)=>{
        console.log(err.error);
        this.success = false;
        this.intentosPermitidos = true;
        let dialogRef = this.dialog.open( templateRefestados,{
           height: '200px',
           width: '200px',
         });
      });
    }else{
      this.success = false;
      this.intentosPermitidos = false;
        let dialogRef = this.dialog.open( templateRefestados,{
           height: '200px',
           width: '290px',
      });
    }
  }

  buscarPostusEst(){
	  this.serviceListarPostuEst.buscarPostuByIdenti(this.userToken.identi).subscribe(result =>{ 
	  	this.postusBuscadas = result;
	  });
  }

}
