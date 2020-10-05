import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ServicesViewConvocatoriaService} from './services-view-convocatoria.service';
import {ServiciolistarconvoService} from './../../listarconvocatoria/serviciolistarconvo.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {RegistrarConvoServiceService} from '../registrar-convocatoria/registrar-convo-service.service';
import {Router } from '@angular/router';

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
  updatePostu:any;
  success:any;
  convocatoriaBeca: any;
  activeForm=false;
  convocatoriaPeriodo: any;
  activeButton=false;
  estado=true;
  disabledActualizar=true;
  public formularioConvocatoria: FormGroup;
  constructor(private rutaActiva: ActivatedRoute,
   private serviceviewconvocatoria:ServicesViewConvocatoriaService,public dialog: MatDialog, 
   private serviceConvocatoria:RegistrarConvoServiceService,
   private router:Router ) { 
    this.$idConvo = this.rutaActiva.snapshot.params.idConvo;
    this.buscarConvoByIdConvo(this.$idConvo);
    this.buscarPostulacionesByIdConvo(this.$idConvo);

    this.buscarBeca();
    this.buscarPeriodo();
    this.formularioConvocatoria = new FormGroup({
      beca: new FormControl('',Validators.required),
      estadoConvocatoria: new FormControl('',Validators.required),
      periodos: new FormControl('',Validators.required),
      fechaini: new FormControl('',Validators.required),
      fechafin: new FormControl('',Validators.required),
      estado: new FormControl('',Validators.required),
      cupo: new FormControl('',Validators.required),
    });
  }

  activeFormActualizar(){
    if(!this.activeForm){
      this.disabledActualizar=false;
      this.activeButton=true;
      this.activeForm=true;
    }else{
      this.disabledActualizar=true;
      this.activeButton=false;
      this.activeForm=false;
    }
    
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

  cambiarEstadoPostu(idPostu:any,estadopostulacionactual:any,estadoseleccionado:any){
    // En espera 
    if(estadopostulacionactual == 'En espera'){
      if(estadoseleccionado == true){
        // Actualizar el estado postulacion
          this.updatePostu = {
            idpostu:idPostu,
            estadopostu:'Aprobado'
          };
          this.$convoBuscada.cupo = this.$convoBuscada.cupo -1;
          this.convoActualizado={
            idconvo:this.$convoBuscada.consecutivo_convocatoria,
            cupos:this.$convoBuscada.cupo
          };

          this.serviceviewconvocatoria.actualizarEstadoPostulacion(this.updatePostu).subscribe
          (res=>{ 
            for (var i = 0; i < this.$postuByIdArray.length; i++) {
              if(this.$postuByIdArray[i].consecutivo_postulacion == idPostu){
                this.$postuByIdArray[i].estado_postulacion = this.updatePostu.estadopostu;
              }
            }
             console.log(this.updatePostu.estadopostu);
           },(err)=>{console.log('ERROR: ' + err.error.text);
          });
        //Actualizar Convocatoria

          this.serviceviewconvocatoria.actualizarCuposConvo(this.convoActualizado).subscribe
          (res=>{console.log(res);},(err)=>{
            console.log('ERROR: ' + err.error.text);
            });
      }else{
          this.updatePostu = {
            idpostu:idPostu,
            estadopostu:'Denegado'
          };
          this.serviceviewconvocatoria.actualizarEstadoPostulacion(this.updatePostu).subscribe
          (res=>{  
            for (var i = 0; i < this.$postuByIdArray.length; i++) {
              if(this.$postuByIdArray[i].consecutivo_postulacion == idPostu){
                this.$postuByIdArray[i].estado_postulacion = this.updatePostu.estadopostu;
              }
            }
          },(err)=>{console.log('ERROR: ' + err.error.text);
          });
      }
      // Aprobado
    }else if(estadopostulacionactual == 'Aprobado'){
      if(estadoseleccionado == true){
        console.log('Ya esta aprobado');
      }else{
          // Actualizar el estado postulacion
          this.updatePostu = {
            idpostu:idPostu,
            estadopostu:'Denegado'
          };
          this.$convoBuscada.cupo = this.$convoBuscada.cupo +1;
          this.convoActualizado={
            idconvo:this.$convoBuscada.consecutivo_convocatoria,
            cupos:this.$convoBuscada.cupo
          };

          this.serviceviewconvocatoria.actualizarEstadoPostulacion(this.updatePostu).subscribe
          (res=>{ 
            for (var i = 0; i < this.$postuByIdArray.length; i++) {
              if(this.$postuByIdArray[i].consecutivo_postulacion == idPostu){
                this.$postuByIdArray[i].estado_postulacion = this.updatePostu.estadopostu;
              }
            }
           },(err)=>{console.log('ERROR: ' + err.error.text);
          });
        //Actualizar Convocatoria

          this.serviceviewconvocatoria.actualizarCuposConvo(this.convoActualizado).subscribe
          (res=>{},(err)=>{
            console.log('ERROR: ' + err.error.text);
            });
      }
      // Denegado
    }else{
      if(estadoseleccionado == true){
        // Actualizar el estado postulacion
          this.updatePostu = {
            idpostu:idPostu,
            estadopostu:'Aprobado'
          };
          this.$convoBuscada.cupo = this.$convoBuscada.cupo -1;
          this.convoActualizado={
            idconvo:this.$convoBuscada.consecutivo_convocatoria,
            cupos:this.$convoBuscada.cupo
          };

          this.serviceviewconvocatoria.actualizarEstadoPostulacion(this.updatePostu).subscribe
          (res=>{ 
            for (var i = 0; i < this.$postuByIdArray.length; i++) {
              if(this.$postuByIdArray[i].consecutivo_postulacion == idPostu){
                this.$postuByIdArray[i].estado_postulacion = this.updatePostu.estadopostu;
              }
            }
           },(err)=>{console.log('ERROR: ' + err.error.text);
          });
        //Actualizar Convocatoria

          this.serviceviewconvocatoria.actualizarCuposConvo(this.convoActualizado).subscribe
          (res=>{},(err)=>{
            console.log('ERROR: ' + err.error.text);
            });
      }else{
        console.log('Ya esta denegado, estado: ' + estadopostulacionactual);
      }
    }
  }
  
}

