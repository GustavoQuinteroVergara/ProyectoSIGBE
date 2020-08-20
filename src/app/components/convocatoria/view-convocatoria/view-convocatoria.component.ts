import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {ServicesViewConvocatoriaService} from './services-view-convocatoria.service';
import {ServiciolistarconvoService} from './../../listarconvocatoria/serviciolistarconvo.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-view-convocatoria',
  templateUrl: './view-convocatoria.component.html',
  styleUrls: ['./view-convocatoria.component.css']
})
export class ViewConvocatoriaComponent {

	$idConvo:any;
	$postuByIdArray:any;
	$convoBuscada:any;
  loading=false;

  constructor(private rutaActiva: ActivatedRoute,
   private serviceviewconvocatoria:ServicesViewConvocatoriaService,public dialog: MatDialog) { 
  	this.$idConvo = this.rutaActiva.snapshot.params.idConvo;
  	this.buscarConvoByIdConvo(this.$idConvo);
  	this.buscarPostulacionesByIdConvo(this.$idConvo);
  }

  buscarEstPostuByIden(templateRef){
    let dialogRef = this.dialog.open( templateRef,{
         height: '500px',
         width: '500px',
       });
  }

	buscarConvoByIdConvo(idConvo:any){
  	  this.serviceviewconvocatoria.buscarConvoById(idConvo).subscribe(result =>{ 
      console.log(result); 
      this.$convoBuscada = result; 
      this.loading=true;
 	});
  }

  buscarPostulacionesByIdConvo(idConvo:any){
  	  this.serviceviewconvocatoria.buscarPostulacionesByIdConvo(idConvo).subscribe(result =>{ 
      console.log(result); 
      this.$postuByIdArray = result; 
 	});
  }



}
