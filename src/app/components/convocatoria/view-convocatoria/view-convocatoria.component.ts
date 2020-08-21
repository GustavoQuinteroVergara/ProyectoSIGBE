import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {ServicesViewConvocatoriaService} from './services-view-convocatoria.service';
import {ServiciolistarconvoService} from './../../listarconvocatoria/serviciolistarconvo.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {RegistrarConvoServiceService} from '../registrar-convocatoria/registrar-convo-service.service';

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
  convoActualizado:any;
  success:any;
  convocatoriaBeca: any;
  convocatoriaPeriodo: any;
  constructor(private rutaActiva: ActivatedRoute,
   private serviceviewconvocatoria:ServicesViewConvocatoriaService,public dialog: MatDialog, 
   private serviceConvocatoria:RegistrarConvoServiceService ) { 
    this.$idConvo = this.rutaActiva.snapshot.params.idConvo;
    this.buscarConvoByIdConvo(this.$idConvo);
    this.buscarPostulacionesByIdConvo(this.$idConvo);
    this.buscarBeca();
    this.buscarPeriodo();
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
  actualizarConvocatoria(consecutivo_convocatoria:any,cupo:any,becas:any,periodosacademicos:any,
    fecha_inicio:any,fecha_fin:any,estado_convocatoria:any){
    this.convoActualizado= {
      consecutivo_convocatoria:consecutivo_convocatoria,
      cupo:cupo,
      becas:becas,
      periodosacademicos:periodosacademicos,
      fecha_inicio:fecha_inicio,
      fecha_fin:fecha_fin,
      estado_convocatoria:estado_convocatoria,
    };
  this.serviceviewconvocatoria.actualizarListConvocatorias(this.convoActualizado).subscribe
    (res=>{
      
    },(err)=>{
      //console.log('ERROR: ' + err.error.text);
      
    });
    console.log(this.convoActualizado);
  
  }
  buscarBeca(){
    this.serviceConvocatoria.buscarListadoBecas().subscribe(convocatoriaBeca=>{
      console.log(convocatoriaBeca);
      this.convocatoriaBeca = convocatoriaBeca;
    });
  }
  buscarPeriodo(){
    this.serviceConvocatoria.buscarListadoPeriodos().subscribe(convocatoriaPeriodo=>{
      console.log(convocatoriaPeriodo);
      this.convocatoriaPeriodo = convocatoriaPeriodo;
    });
  }
  
}

