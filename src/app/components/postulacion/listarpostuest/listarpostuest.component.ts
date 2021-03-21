import { Component, OnInit } from '@angular/core';
import {ServiceListarPostuEstService} from './service-listar-postu-est.service';
import {PostulacionService} from '../../../services/postulacion.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'; 
import {DocumentoService} from '../../../services/documento.service';
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
  documentosFoundpostu:any;
  activarUpdate = false;
  myForm: FormGroup;
  listActualizarPostu:any;
  success=false;
  intentosPermitidos=false;
  constructor(private serviceListarPostuEst:ServiceListarPostuEstService,
    private postuservice:PostulacionService,
    public fb: FormBuilder,
    public dialog: MatDialog,
    public documentoServicie:DocumentoService) { 
	this.buscarPostusEst();

  }

  abrirPostu(templateRef,postu:any){
    this.postuSeleccionada = postu;
    this.getDocumntosPostu(postu.consecutivo_postulacion);
    this.myForm = this.fb.group({
      promedio: [this.postuSeleccionada.promedio, [Validators.required]],
      semestre: [this.postuSeleccionada.semestre, [Validators.required]],
      estrato: [this.postuSeleccionada.estrato, [Validators.required]]
    });
  	    let dialogRef = this.dialog.open( templateRef,{
         panelClass: 'app-full-bleed-dialog', 
         height: '600px',
         width: '900px',
       });
  }


  getDocumntosPostu(idPostu:any){
    this.documentoServicie.getDocumentsPostu(idPostu).subscribe(result=>{
        this.documentosFoundpostu = result;
    });
  }
  downloadPDF(docsel:any,nombrefile:any){
    var obj = document.createElement('a'); 
    obj.type = 'application/pdf';
    obj.href = 'data:application/pdf;base64,' + docsel;
    obj.download = nombrefile+ ".pdf";
    obj.click();
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

  actualizarPostu(semestre:any,promedio:any,templateRefestados){
    if(this.postuSeleccionada.cantmodificaciones <= 2){
      this.postuSeleccionada.cantmodificaciones++;
      this.listActualizarPostu = {
        idpostu: this.postuSeleccionada.consecutivo_postulacion,
        semestre:semestre,
        promedio:promedio,
        cantmodificaciones:this.postuSeleccionada.cantmodificaciones
    }
    console.log(this.listActualizarPostu);
    this.postuservice.actualizarPostulacion(this.listActualizarPostu).subscribe(result=>{
      this.success = true;
      let dialogRef = this.dialog.open( templateRefestados,{
         height: '240px',
         width: '295px',
       });
    },(err)=>{
      console.log(err.error);
      this.success = false;
      this.intentosPermitidos = true;
      let dialogRef = this.dialog.open( templateRefestados,{
         height: '240px',
         width: '295px',
       });
    });
    }else{
      this.success = false;
      this.intentosPermitidos = false;
        let dialogRef = this.dialog.open( templateRefestados,{
           height: '240px',
           width: '295px',
      });
    }
  }

  buscarPostusEst(){
	  this.serviceListarPostuEst.buscarPostuByIdenti(this.userToken.identi).subscribe(result =>{ 
	  	this.postusBuscadas = result;
	  });
  }

}
