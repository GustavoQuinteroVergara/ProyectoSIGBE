import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ServicesViewConvocatoriaService} from './services-view-convocatoria.service';
import {ServiciolistarconvoService} from './../../listarconvocatoria/serviciolistarconvo.service';
import {DocumentoService} from '../../../services/documento.service';
import {PostulacionService} from '../../../services/postulacion.service';
import {VisitadomiciliariaService} from '../../../services/visitadomiciliaria.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {RegistrarConvoServiceService} from '../registrar-convocatoria/registrar-convo-service.service';
import {Router } from '@angular/router';
import {ExporterService} from '../../../services/exporter.service';
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
  nuevoarreglo:any;
  convoActualizado:any;
  documentosFoundpostu:any;
  listActualizar:any;
  listadoDocsActualizar:any;
  observacion='';
  //Colores barra progreso
    circlecolor1={
      'pasoactive':false
    };
    circlecolor2={
      'pasoactive':false,
      'pasoactivoline':false,
      'pasoactivocomplete':false
    };

    circlecolor3={
      'pasoactive':false,
      'pasoactivoline':false,
      'pasoactivocomplete':false
    };
    circlecolor4={
      'pasoactive':false,
      'pasoactivoline':false,
      'pasoactivocomplete':false
    };
    circlecolor5={
      'pasoactive':false,
      'pasoactivoline':false,
      'pasoactivocomplete':false,
      'pasoactivered':false,
      'pasoactivolinered':false
    };

  //fin Colores barra progreso

  updatePostu:any;
  loadingcc = false;
  Docsestados={};
  listDocs= [];
  postuseltable:any;
  estadopostusel=0;
  visitaPostuFound:any;
  visitavalidate=false;

  //FIN VARIABLES DOCUMENTOS

    success:any;
    convocatoriaBeca: any;
    activeForm=false;
    convocatoriaPeriodo: any;
    activeButton=false;
    estado=true;
    disabledActualizar=true;
    postulacionesest:any;
    public formularioConvocatoria: FormGroup;
  constructor(private rutaActiva: ActivatedRoute,
   private serviceviewconvocatoria:ServicesViewConvocatoriaService,public dialog: MatDialog, 
   private serviceConvocatoria:RegistrarConvoServiceService,
   private servicePostulacion:PostulacionService,
   private documentosService:DocumentoService,
   private visitadomiciliariaService:VisitadomiciliariaService,
   private router:Router,
   private excelService: ExporterService ) { 
    this.$idConvo = this.rutaActiva.snapshot.params.idConvo;
    this.buscarConvoByIdConvo(this.$idConvo);
    this.buscarPostulacionesByIdConvo(this.$idConvo);

    this.buscarBeca();
    this.buscarPeriodo();
    this.formularioConvocatoria = new FormGroup({
      beca: new FormControl('',Validators.required),
      periodos: new FormControl('',Validators.required),
      fechaini: new FormControl('',Validators.required),
      fechafin: new FormControl('',Validators.required),
      estado: new FormControl('',Validators.required),
    });
  }

  actualizarEstadoPostulacion(successactualizacion){


    this.listadoDocsActualizar = {
        idpost:this.postuseltable.consecutivo_postulacion,
        observacion:this.observacion,
        listEstadosDocs:this.listDocs
    };

      this.servicePostulacion.actualizarEstadosDocs(this.listadoDocsActualizar).subscribe(result =>{
          let dialogRef = this.dialog.open( successactualizacion,{
           height: '150px',
           width: '165px',
         });
      },(err)=>{
        console.log(err);
      });

  }

  getDocumntosPostu(idPostu:any){
    this.documentosService.getDocumentsPostu(idPostu).subscribe(result=>{
        this.documentosFoundpostu = result;
    });
  }

  getVisitaPostu(idPostu:any){
    this.visitavalidate=false;
    this.visitadomiciliariaService.listVisitaPostu(idPostu).subscribe(result=>{
      this.visitaPostuFound = result;
      this.visitavalidate =true;
    },(err)=>{
      this.visitavalidate=false;
    });
  }

  checkboxEstados(concecutivodoc:any,estadovalor:any){

    this.listActualizar = {
      concecutivodoc:concecutivodoc,
      estadonuevo:estadovalor
    };
    var encontrado = false;
    for (var i = 0; i < this.listDocs.length; i++) {
      if(this.listDocs[i].concecutivodoc == concecutivodoc){
        encontrado = true;
        this.listDocs[i].estadonuevo = estadovalor;
      }
    }
    if (!encontrado) {
      this.listDocs.push(this.listActualizar);
    }
  }

  verVisitaModal(visitaModal){
    let dialogRef = this.dialog.open( visitaModal,{
       height: '500px',
       width: '700px',
    });
  }

  //Metodo actualizar formconvo
  activeFormActualizar(){
    if(!this.activeForm){
      this.disabledActualizar=false;
      this.activeButton=true;
      this.activeForm=true;
    }else{
      this.disabledActualizar=true;
      this.activeButton=false;
      this.activeForm=false;
    }}

  //Buscar postu por identificaicon
  buscarEstPostuByIden(idsel:any,templateRef){
    this.servicePostulacion.buscarPostuByIdenti(idsel).subscribe(result=>{
      this.postulacionesest = result;
      let dialogRef = this.dialog.open( templateRef,{
       height: '500px',
       width: '500px',
     });
    },(err)=>{
      console.log(err);
    });}

  //Buscar convocatoria por id 
  buscarConvoByIdConvo(idConvo:any){
    this.serviceviewconvocatoria.buscarConvoById(idConvo).subscribe(result =>{ 
      this.$convoBuscada = result; 
      this.loading=true;
    });}

  buscarPostulacionesByIdConvo(idConvo:any){
    this.serviceviewconvocatoria.buscarPostulacionesByIdConvo(idConvo).subscribe(result =>{ 
      this.$postuByIdArray = result; 

    });}
  actualizarConvocatoria(consecutivo_convocatoria:any,cupo:any,becas:any,periodosacademicos:any,
    fecha_inicio:any,fecha_fin:any,estado_convocatoria:any,successactualizacion){
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
          let dialogRef = this.dialog.open( successactualizacion,{
           height: '150px',
           width: '165px',
         });
    },(err)=>{
      //console.log('ERROR: ' + err.error.text);
      
    }); }
  verPostuSel(idpostu:any, estado_postu:any, postu:any ,templatePostu){
    this.postuseltable = postu;
    this.observacion = this.postuseltable.coments;
    this.getDocumntosPostu(idpostu);
    this.getVisitaPostu(idpostu)
    switch (estado_postu) {
      case "En espera":
        this.estadopostusel=3;
        this.circlecolor1['pasoactive'] = true;
        this.circlecolor2['pasoactivoline'] = true;
        break;
      case "Revision":
        this.estadopostusel=4;
        this.circlecolor1['pasoactive'] = true;
        this.circlecolor2['pasoactive'] = true;
        this.circlecolor2['pasoactivocomplete'] = true;
        this.circlecolor3['pasoactivoline'] = true;
        break;
      case "Entrevista":
        this.estadopostusel=5;
        this.circlecolor1['pasoactive'] = true;
        this.circlecolor2['pasoactive'] = true;
        this.circlecolor2['pasoactivoline'] = true;
        this.circlecolor2['pasoactivocomplete'] = true;
        this.circlecolor3['pasoactive'] = true;
        this.circlecolor3['pasoactivocomplete'] = true;
        this.circlecolor4['pasoactivoline'] = true;
        break;
      case "Visita":
        this.estadopostusel=6;
        this.circlecolor1['pasoactive'] = true;
        this.circlecolor2['pasoactive'] = true;
        this.circlecolor2['pasoactivocomplete'] = true;
        this.circlecolor3['pasoactive'] = true;
        this.circlecolor3['pasoactivocomplete'] = true;
        this.circlecolor4['pasoactive'] = true;
        this.circlecolor4['pasoactivocomplete'] = true;
        this.circlecolor5['pasoactivoline'] = true;
        break;
      case "Aprobado":
        this.estadopostusel=1;
        this.circlecolor1['pasoactive'] = true;
        this.circlecolor2['pasoactive'] = true;
        this.circlecolor2['pasoactivocomplete'] = true;
        this.circlecolor3['pasoactive'] = true;
        this.circlecolor3['pasoactivocomplete'] = true;
        this.circlecolor4['pasoactive'] = true;
        this.circlecolor4['pasoactivocomplete'] = true;
        this.circlecolor5['pasoactive'] = true;
        this.circlecolor5['pasoactivocomplete'] = true;
        break;
      case "Rechazado":
        this.estadopostusel=2;
        this.circlecolor1['pasoactive'] = true;
        this.circlecolor2['pasoactive'] = true;
        this.circlecolor2['pasoactivocomplete'] = true;
        this.circlecolor3['pasoactive'] = true;
        this.circlecolor3['pasoactivocomplete'] = true;
        this.circlecolor4['pasoactive'] = true;
        this.circlecolor4['pasoactivocomplete'] = true;
        this.circlecolor5['pasoactivered'] = true;
        this.circlecolor5['pasoactivolinered'] = true;
        break;
      
      default:
        // code...
        break;
    }
      let dialogRef = this.dialog.open( templatePostu,{
       height: '600px',
       width: '900px',
     });}
  buscarBeca(){
    this.serviceConvocatoria.buscarListadoBecas().subscribe(convocatoriaBeca=>{
      this.convocatoriaBeca = convocatoriaBeca;
    });}
  buscarPeriodo(){
    this.serviceConvocatoria.buscarListadoPeriodos().subscribe(convocatoriaPeriodo=>{
      this.convocatoriaPeriodo = convocatoriaPeriodo;
    });}
  cambiarEstadoPostu(idPostu:any,estadopostulacionactual:any,estadoseleccionado:any){
    this.loadingcc = true;
    if(estadopostulacionactual == 'En espera'){
        if(estadoseleccionado == 'Revision'){
          this.updatePostu = {
            idpostu:idPostu,
            estadopostu: estadoseleccionado
          };
          this.serviceviewconvocatoria.actualizarEstadoPostulacion(this.updatePostu).subscribe
          (res=>{  
            this.loadingcc = false;
            for (var i = 0; i < this.$postuByIdArray.length; i++) {
              if(this.$postuByIdArray[i].consecutivo_postulacion == idPostu){
                this.$postuByIdArray[i].estado_postulacion = this.updatePostu.estadopostu;
              }
            }
            this.postuseltable.estado_postulacion = estadoseleccionado;
            this.estadopostusel=4;
            this.circlecolor1['pasoactive'] = true;
            this.circlecolor2['pasoactive'] = true;
            this.circlecolor2['pasoactivocomplete'] = true;
            this.circlecolor3['pasoactivoline'] = true;
          },(err)=>{console.log('ERROR: ' + err.error.text);this.loadingcc = false;
        });
        }
      }else if(estadopostulacionactual == 'Revision'){
        if(estadoseleccionado == 'En espera'){
          this.updatePostu = {
            idpostu:idPostu,
            estadopostu: estadoseleccionado
          };
          this.serviceviewconvocatoria.actualizarEstadoPostulacion(this.updatePostu).subscribe
          (res=>{  
            this.loadingcc = false;
            for (var i = 0; i < this.$postuByIdArray.length; i++) {
              if(this.$postuByIdArray[i].consecutivo_postulacion == idPostu){
                this.$postuByIdArray[i].estado_postulacion = this.updatePostu.estadopostu;
              }
            }
            this.postuseltable.estado_postulacion = estadoseleccionado;
            this.estadopostusel=3;
            this.circlecolor1['pasoactive'] = false;
            this.circlecolor2['pasoactive'] = false;
            this.circlecolor2['pasoactivocomplete'] = false;
            this.circlecolor3['pasoactivoline'] = false;
            this.circlecolor1['pasoactive'] = true;
            this.circlecolor2['pasoactivoline'] = true;
          },(err)=>{console.log('ERROR: ' + err.error.text);this.loadingcc = false;
        });
        }else if(estadoseleccionado == 'Entrevista'){
          this.updatePostu = {
            idpostu:idPostu,
            estadopostu: estadoseleccionado
          };
          this.serviceviewconvocatoria.actualizarEstadoPostulacion(this.updatePostu).subscribe
          (res=>{  
            this.loadingcc = false;
            for (var i = 0; i < this.$postuByIdArray.length; i++) {
              if(this.$postuByIdArray[i].consecutivo_postulacion == idPostu){
                this.$postuByIdArray[i].estado_postulacion = this.updatePostu.estadopostu;
              }
            }
            this.postuseltable.estado_postulacion = estadoseleccionado;
            this.estadopostusel=5;
            this.circlecolor1['pasoactive'] = false;
            this.circlecolor2['pasoactive'] = false;
            this.circlecolor2['pasoactivocomplete'] = false;
            this.circlecolor3['pasoactivoline'] = false;
            this.circlecolor1['pasoactive'] = false;
            this.circlecolor2['pasoactivoline'] = false;

           //
            this.circlecolor1['pasoactive'] = true;
            this.circlecolor2['pasoactive'] = true;
            this.circlecolor2['pasoactivoline'] = true;
            this.circlecolor2['pasoactivocomplete'] = true;
            this.circlecolor3['pasoactive'] = true;
            this.circlecolor3['pasoactivocomplete'] = true;
            this.circlecolor4['pasoactivoline'] = true;
          },(err)=>{console.log('ERROR: ' + err.error.text);this.loadingcc = false;
        });
        }else if(estadoseleccionado == 'Aprobado'){
          this.updatePostu = {
            idpostu:idPostu,
            estadopostu:estadoseleccionado
          };
          this.$convoBuscada.cupo = this.$convoBuscada.cupo -1;
          this.convoActualizado={
            idconvo:this.$convoBuscada.consecutivo_convocatoria,
            cupos:this.$convoBuscada.cupo
          };

          this.serviceviewconvocatoria.actualizarEstadoPostulacion(this.updatePostu).subscribe
          (res=>{ 
            this.loadingcc = false;
            for (var i = 0; i < this.$postuByIdArray.length; i++) {
              if(this.$postuByIdArray[i].consecutivo_postulacion == idPostu){
                this.$postuByIdArray[i].estado_postulacion = this.updatePostu.estadopostu;
              }
            this.postuseltable.estado_postulacion = estadoseleccionado;
            this.estadopostusel=1;

            this.circlecolor1['pasoactive'] = false;
            this.circlecolor2['pasoactive'] = false;
            this.circlecolor2['pasoactivoline'] = false;
            this.circlecolor2['pasoactivocomplete'] = false;
            this.circlecolor3['pasoactive'] = false;
            this.circlecolor3['pasoactivocomplete'] = false;
            this.circlecolor4['pasoactivoline'] = false;

            this.circlecolor1['pasoactive'] = true;
            this.circlecolor2['pasoactive'] = true;
            this.circlecolor2['pasoactivocomplete'] = true;
            this.circlecolor3['pasoactive'] = true;
            this.circlecolor3['pasoactivocomplete'] = true;
            this.circlecolor4['pasoactive'] = true;
            this.circlecolor4['pasoactivocomplete'] = true;
            this.circlecolor5['pasoactive'] = true;
            this.circlecolor5['pasoactivocomplete'] = true;

            }
          },(err)=>{console.log('ERROR: ' + err.error.text);this.loadingcc = false;
        });
          //Actualizar Convocatoria

          this.serviceviewconvocatoria.actualizarCuposConvo(this.convoActualizado).subscribe
          (res=>{console.log(res);},(err)=>{
          });
        } else if(estadoseleccionado == 'Rechazado'){
            this.updatePostu = {
              idpostu:idPostu,
              estadopostu:estadoseleccionado
            };
            this.serviceviewconvocatoria.actualizarEstadoPostulacion(this.updatePostu).subscribe
            (res=>{  
              this.loadingcc = false;
              for (var i = 0; i < this.$postuByIdArray.length; i++) {
                if(this.$postuByIdArray[i].consecutivo_postulacion == idPostu){
                  this.$postuByIdArray[i].estado_postulacion = this.updatePostu.estadopostu;
                }
                this.postuseltable.estado_postulacion = estadoseleccionado;
                this.estadopostusel=2;

                this.circlecolor1['pasoactive'] = false;
                this.circlecolor2['pasoactive'] = false;
                this.circlecolor2['pasoactivocomplete'] = false;
                this.circlecolor3['pasoactive'] = false;
                this.circlecolor3['pasoactivocomplete'] = false;
                this.circlecolor4['pasoactive'] = false;
                this.circlecolor4['pasoactivocomplete'] = false;
                this.circlecolor5['pasoactive'] = false;
                this.circlecolor5['pasoactivocomplete'] = false;



                this.circlecolor1['pasoactive'] = true;
                this.circlecolor2['pasoactive'] = true;
                this.circlecolor2['pasoactivocomplete'] = true;
                this.circlecolor3['pasoactive'] = true;
                this.circlecolor3['pasoactivocomplete'] = true;
                this.circlecolor4['pasoactive'] = true;
                this.circlecolor4['pasoactivocomplete'] = true;
                this.circlecolor5['pasoactivered'] = true;
                this.circlecolor5['pasoactivolinered'] = true;
              }
            },(err)=>{console.log('ERROR: ' + err.error.text);this.loadingcc = false;
          });
        }
      }else if(estadopostulacionactual == 'Entrevista'){
        if(estadoseleccionado == 'Revision'){
          this.updatePostu = {
            idpostu:idPostu,
            estadopostu: estadoseleccionado
          };
          this.serviceviewconvocatoria.actualizarEstadoPostulacion(this.updatePostu).subscribe
          (res=>{  
            this.loadingcc = false;
            for (var i = 0; i < this.$postuByIdArray.length; i++) {
              if(this.$postuByIdArray[i].consecutivo_postulacion == idPostu){
                this.$postuByIdArray[i].estado_postulacion = this.updatePostu.estadopostu;
              }
            }
            this.postuseltable.estado_postulacion = estadoseleccionado;
            this.estadopostusel=4;

            this.circlecolor1['pasoactive'] = false;
            this.circlecolor2['pasoactive'] = false;
            this.circlecolor2['pasoactivocomplete'] = false;
            this.circlecolor3['pasoactive'] = false;
            this.circlecolor3['pasoactivocomplete'] = false;
            this.circlecolor4['pasoactive'] = false;
            this.circlecolor4['pasoactivocomplete'] = false;
            this.circlecolor4['pasoactivoline'] = false;
            this.circlecolor5['pasoactive'] = false;
            this.circlecolor5['pasoactivocomplete'] = false;

            this.circlecolor1['pasoactive'] = true;
            this.circlecolor2['pasoactive'] = true;
            this.circlecolor2['pasoactivocomplete'] = true;
            this.circlecolor3['pasoactivoline'] = true;
          },(err)=>{console.log('ERROR: ' + err.error.text);this.loadingcc = false;
        });
        }else if(estadoseleccionado == 'Visita'){
            this.updatePostu = {
              idpostu:idPostu,
              estadopostu: estadoseleccionado
            };
            this.serviceviewconvocatoria.actualizarEstadoPostulacion(this.updatePostu).subscribe
            (res=>{  
              this.loadingcc = false;
              for (var i = 0; i < this.$postuByIdArray.length; i++) {
                if(this.$postuByIdArray[i].consecutivo_postulacion == idPostu){
                  this.$postuByIdArray[i].estado_postulacion = this.updatePostu.estadopostu;
                }
              }
              this.postuseltable.estado_postulacion = estadoseleccionado;
              this.estadopostusel=6;
                          this.circlecolor1['pasoactive'] = false;
              this.circlecolor2['pasoactive'] = false;
              this.circlecolor2['pasoactivocomplete'] = false;
              this.circlecolor3['pasoactive'] = false;
              this.circlecolor3['pasoactivocomplete'] = false;
              this.circlecolor4['pasoactive'] = false;
              this.circlecolor4['pasoactivocomplete'] = false;
              this.circlecolor5['pasoactive'] = false;
              this.circlecolor5['pasoactivocomplete'] = false;

              this.circlecolor1['pasoactive'] = true;
              this.circlecolor2['pasoactive'] = true;
              this.circlecolor2['pasoactivocomplete'] = true;
              this.circlecolor3['pasoactive'] = true;
              this.circlecolor3['pasoactivocomplete'] = true;
              this.circlecolor4['pasoactive'] = true;
              this.circlecolor4['pasoactivocomplete'] = true;
              this.circlecolor5['pasoactivoline'] = true;
            },(err)=>{console.log('ERROR: ' + err.error.text);this.loadingcc = false;
          });
        }
      }else if(estadopostulacionactual == 'Visita'){
        if(estadoseleccionado == 'Entrevista'){
          this.updatePostu = {
            idpostu:idPostu,
            estadopostu: estadoseleccionado
          };
          this.serviceviewconvocatoria.actualizarEstadoPostulacion(this.updatePostu).subscribe
          (res=>{  
            this.loadingcc = false;
            for (var i = 0; i < this.$postuByIdArray.length; i++) {
              if(this.$postuByIdArray[i].consecutivo_postulacion == idPostu){
                this.$postuByIdArray[i].estado_postulacion = this.updatePostu.estadopostu;
              }
            }
            this.postuseltable.estado_postulacion = estadoseleccionado;
            this.estadopostusel=5;
            this.circlecolor1['pasoactive'] = false;
            this.circlecolor2['pasoactive'] = false;
            this.circlecolor2['pasoactivocomplete'] = false;
            this.circlecolor3['pasoactive'] = false;
            this.circlecolor3['pasoactivocomplete'] = false;
            this.circlecolor4['pasoactive'] = false;
            this.circlecolor4['pasoactivocomplete'] = false;
            this.circlecolor5['pasoactive'] = false;
            this.circlecolor5['pasoactivocomplete'] = false;
            this.circlecolor5['pasoactivoline'] = false;

           //
            this.circlecolor1['pasoactive'] = true;
            this.circlecolor2['pasoactive'] = true;
            this.circlecolor2['pasoactivoline'] = true;
            this.circlecolor2['pasoactivocomplete'] = true;
            this.circlecolor3['pasoactive'] = true;
            this.circlecolor3['pasoactivocomplete'] = true;
            this.circlecolor4['pasoactivoline'] = true;
          },(err)=>{console.log('ERROR: ' + err.error.text);this.loadingcc = false;
        });
        }else if(estadoseleccionado == 'Aprobado'){
          this.updatePostu = {
            idpostu:idPostu,
            estadopostu:estadoseleccionado
          };
          this.$convoBuscada.cupo = this.$convoBuscada.cupo -1;
          this.convoActualizado={
            idconvo:this.$convoBuscada.consecutivo_convocatoria,
            cupos:this.$convoBuscada.cupo
          };

          this.serviceviewconvocatoria.actualizarEstadoPostulacion(this.updatePostu).subscribe
          (res=>{ 
            this.loadingcc = false;
            for (var i = 0; i < this.$postuByIdArray.length; i++) {
              if(this.$postuByIdArray[i].consecutivo_postulacion == idPostu){
                this.$postuByIdArray[i].estado_postulacion = this.updatePostu.estadopostu;
              }
            this.postuseltable.estado_postulacion = estadoseleccionado;
            this.estadopostusel=1;

            this.circlecolor1['pasoactive'] = false;
            this.circlecolor2['pasoactive'] = false;
            this.circlecolor2['pasoactivocomplete'] = false;
            this.circlecolor3['pasoactive'] = false;
            this.circlecolor3['pasoactivocomplete'] = false;
            this.circlecolor4['pasoactive'] = false;
            this.circlecolor4['pasoactivocomplete'] = false;
            this.circlecolor5['pasoactive'] = false;
            this.circlecolor5['pasoactivocomplete'] = false;


            this.circlecolor1['pasoactive'] = true;
            this.circlecolor2['pasoactive'] = true;
            this.circlecolor2['pasoactivocomplete'] = true;
            this.circlecolor3['pasoactive'] = true;
            this.circlecolor3['pasoactivocomplete'] = true;
            this.circlecolor4['pasoactive'] = true;
            this.circlecolor4['pasoactivocomplete'] = true;
            this.circlecolor5['pasoactive'] = true;
            this.circlecolor5['pasoactivocomplete'] = true;

            }
          },(err)=>{console.log('ERROR: ' + err.error.text);this.loadingcc = false;
        });
          //Actualizar Convocatoria

          this.serviceviewconvocatoria.actualizarCuposConvo(this.convoActualizado).subscribe
          (res=>{console.log(res);},(err)=>{
          });
        }else if(estadoseleccionado == 'Rechazado'){
            this.updatePostu = {
              idpostu:idPostu,
              estadopostu:estadoseleccionado
            };
            this.serviceviewconvocatoria.actualizarEstadoPostulacion(this.updatePostu).subscribe
            (res=>{  
              this.loadingcc = false;
              for (var i = 0; i < this.$postuByIdArray.length; i++) {
                if(this.$postuByIdArray[i].consecutivo_postulacion == idPostu){
                  this.$postuByIdArray[i].estado_postulacion = this.updatePostu.estadopostu;
                }
                this.postuseltable.estado_postulacion = estadoseleccionado;
                this.estadopostusel=2;


                this.circlecolor1['pasoactive'] = false;
                this.circlecolor2['pasoactive'] = false;
                this.circlecolor2['pasoactivocomplete'] = false;
                this.circlecolor3['pasoactive'] = false;
                this.circlecolor3['pasoactivocomplete'] = false;
                this.circlecolor4['pasoactive'] = false;
                this.circlecolor4['pasoactivocomplete'] = false;
                this.circlecolor5['pasoactive'] = false;
                this.circlecolor5['pasoactivocomplete'] = false;

                this.circlecolor1['pasoactive'] = true;
                this.circlecolor2['pasoactive'] = true;
                this.circlecolor2['pasoactivocomplete'] = true;
                this.circlecolor3['pasoactive'] = true;
                this.circlecolor3['pasoactivocomplete'] = true;
                this.circlecolor4['pasoactive'] = true;
                this.circlecolor4['pasoactivocomplete'] = true;
                this.circlecolor5['pasoactivered'] = true;
                this.circlecolor5['pasoactivolinered'] = true;
              }
            },(err)=>{console.log('ERROR: ' + err.error.text);this.loadingcc = false;
          });
        }
      }else if(estadopostulacionactual == 'Aprobado'){
          if(estadoseleccionado == 'Visita'){
            this.updatePostu = {
              idpostu:idPostu,
              estadopostu:estadoseleccionado
            };
            this.$convoBuscada.cupo = this.$convoBuscada.cupo +1;
            this.convoActualizado={
              idconvo:this.$convoBuscada.consecutivo_convocatoria,
              cupos:this.$convoBuscada.cupo
            };

            this.serviceviewconvocatoria.actualizarEstadoPostulacion(this.updatePostu).subscribe
            (res=>{ 
              this.loadingcc = false;
              for (var i = 0; i < this.$postuByIdArray.length; i++) {
                if(this.$postuByIdArray[i].consecutivo_postulacion == idPostu){
                  this.$postuByIdArray[i].estado_postulacion = this.updatePostu.estadopostu;
                }
              }

              this.postuseltable.estado_postulacion = estadoseleccionado;
              this.estadopostusel=6;

              this.circlecolor1['pasoactive'] = false;
              this.circlecolor2['pasoactive'] = false;
              this.circlecolor2['pasoactivocomplete'] = false;
              this.circlecolor3['pasoactive'] = false;
              this.circlecolor3['pasoactivocomplete'] = false;
              this.circlecolor4['pasoactive'] = false;
              this.circlecolor4['pasoactivocomplete'] = false;
              this.circlecolor5['pasoactive'] = false;
              this.circlecolor5['pasoactivocomplete'] = false;


              this.circlecolor1['pasoactive'] = true;
              this.circlecolor2['pasoactive'] = true;
              this.circlecolor2['pasoactivocomplete'] = true;
              this.circlecolor3['pasoactive'] = true;
              this.circlecolor3['pasoactivocomplete'] = true;
              this.circlecolor4['pasoactive'] = true;
              this.circlecolor4['pasoactivocomplete'] = true;
              this.circlecolor5['pasoactivoline'] = true;
            },(err)=>{console.log('ERROR: ' + err.error.text);this.loadingcc = false;
          });
            //Actualizar Convocatoria

            this.serviceviewconvocatoria.actualizarCuposConvo(this.convoActualizado).subscribe
            (res=>{},(err)=>{
              console.log('ERROR: ' + err.error.text);
            });
          }else if(estadoseleccionado == 'Rechazado'){
                        this.updatePostu = {
              idpostu:idPostu,
              estadopostu:estadoseleccionado
            };
            this.$convoBuscada.cupo = this.$convoBuscada.cupo +1;
            this.convoActualizado={
              idconvo:this.$convoBuscada.consecutivo_convocatoria,
              cupos:this.$convoBuscada.cupo
            };

            this.serviceviewconvocatoria.actualizarEstadoPostulacion(this.updatePostu).subscribe
            (res =>{ 
              this.loadingcc = false;
              for (var i = 0; i < this.$postuByIdArray.length; i++) {
                if(this.$postuByIdArray[i].consecutivo_postulacion == idPostu){
                  this.$postuByIdArray[i].estado_postulacion = this.updatePostu.estadopostu;
                }
              }

              this.postuseltable.estado_postulacion = estadoseleccionado;
              this.estadopostusel=2;


              this.circlecolor1['pasoactive'] = false;
              this.circlecolor2['pasoactive'] = false;
              this.circlecolor2['pasoactivocomplete'] = false;
              this.circlecolor3['pasoactive'] = false;
              this.circlecolor3['pasoactivocomplete'] = false;
              this.circlecolor4['pasoactive'] = false;
              this.circlecolor4['pasoactivocomplete'] = false;
              this.circlecolor5['pasoactive'] = false;
              this.circlecolor5['pasoactivocomplete'] = false;

              this.circlecolor1['pasoactive'] = true;
              this.circlecolor2['pasoactive'] = true;
              this.circlecolor2['pasoactivocomplete'] = true;
              this.circlecolor3['pasoactive'] = true;
              this.circlecolor3['pasoactivocomplete'] = true;
              this.circlecolor4['pasoactive'] = true;
              this.circlecolor4['pasoactivocomplete'] = true;
              this.circlecolor5['pasoactivered'] = true;
              this.circlecolor5['pasoactivolinered'] = true;

            },(err) => {
              console.log('ERROR: ' + err.error.text); this.loadingcc = false;
            });
          }
       }else if(estadopostulacionactual == 'Rechazado'){
          if(estadoseleccionado == 'Aprobado'){
                //     // Actualizar el estado postulacion
              this.updatePostu = {
                idpostu:idPostu,
                estadopostu:estadoseleccionado
              };
              this.$convoBuscada.cupo = this.$convoBuscada.cupo -1;
              this.convoActualizado={
                idconvo:this.$convoBuscada.consecutivo_convocatoria,
                cupos:this.$convoBuscada.cupo
              };

              this.serviceviewconvocatoria.actualizarEstadoPostulacion(this.updatePostu).subscribe
              (res=>{ 
                this.loadingcc = false;
                for (var i = 0; i < this.$postuByIdArray.length; i++) {
                  if(this.$postuByIdArray[i].consecutivo_postulacion == idPostu){
                    this.$postuByIdArray[i].estado_postulacion = this.updatePostu.estadopostu;
                  }
                }
                this.estadopostusel=1;

                this.circlecolor1['pasoactive'] = false;
                this.circlecolor2['pasoactive'] = false;
                this.circlecolor2['pasoactivocomplete'] = false;
                this.circlecolor3['pasoactive'] = false;
                this.circlecolor3['pasoactivocomplete'] = false;
                this.circlecolor4['pasoactive'] = false;
                this.circlecolor4['pasoactivocomplete'] = false;
                this.circlecolor5['pasoactive'] = false;
                this.circlecolor5['pasoactivocomplete'] = false;


                this.circlecolor1['pasoactive'] = true;
                this.circlecolor2['pasoactive'] = true;
                this.circlecolor2['pasoactivocomplete'] = true;
                this.circlecolor3['pasoactive'] = true;
                this.circlecolor3['pasoactivocomplete'] = true;
                this.circlecolor4['pasoactive'] = true;
                this.circlecolor4['pasoactivocomplete'] = true;
                this.circlecolor5['pasoactivered'] = false;
                this.circlecolor5['pasoactivolinered'] = false;
                this.circlecolor5['pasoactive'] = true;
                this.circlecolor5['pasoactivocomplete'] = true;
              },(err)=>{console.log('ERROR: ' + err.error.text);this.loadingcc = false;
            });
              //Actualizar Convocatoria

              this.serviceviewconvocatoria.actualizarCuposConvo(this.convoActualizado).subscribe
              (res=>{},(err)=>{
              });
          }else{
                        this.updatePostu = {
              idpostu:idPostu,
              estadopostu: estadoseleccionado
            };
            this.serviceviewconvocatoria.actualizarEstadoPostulacion(this.updatePostu).subscribe
            (res=>{  
              this.loadingcc = false;
              for (var i = 0; i < this.$postuByIdArray.length; i++) {
                if(this.$postuByIdArray[i].consecutivo_postulacion == idPostu){
                  this.$postuByIdArray[i].estado_postulacion = this.updatePostu.estadopostu;
                }
              }
              this.postuseltable.estado_postulacion = estadoseleccionado;
              this.estadopostusel=6;

              this.circlecolor1['pasoactive'] = false;
              this.circlecolor2['pasoactive'] = false;
              this.circlecolor2['pasoactivocomplete'] = false;
              this.circlecolor3['pasoactive'] = false;
              this.circlecolor3['pasoactivocomplete'] = false;
              this.circlecolor4['pasoactive'] = false;
              this.circlecolor4['pasoactivocomplete'] = false;
              this.circlecolor5['pasoactive'] = false;
              this.circlecolor5['pasoactivocomplete'] = false;


              this.circlecolor1['pasoactive'] = true;
              this.circlecolor2['pasoactive'] = true;
              this.circlecolor2['pasoactivocomplete'] = true;
              this.circlecolor3['pasoactive'] = true;
              this.circlecolor3['pasoactivocomplete'] = true;
              this.circlecolor4['pasoactive'] = true;
              this.circlecolor4['pasoactivocomplete'] = true;
              this.circlecolor5['pasoactivoline'] = false;
              this.circlecolor5['pasoactivered'] = false;
              this.circlecolor5['pasoactivolinered'] = false;
              this.circlecolor5['pasoactive'] = false;
              this.circlecolor5['pasoactivocomplete'] = false;
              this.circlecolor5['pasoactivoline'] = true;
            },(err)=>{console.log('ERROR: ' + err.error.text);this.loadingcc = false;
          });
          }
        }

      
    }
      exportAsXLSX():void {
    this.excelService.exportToExcel(this.$postuByIdArray,'ReportePostulaciones'); }

  downloadPDF(docsel:any,nombrefile:any){
    var obj = document.createElement('a'); 
    obj.type = 'application/pdf';
    obj.href = 'data:application/pdf;base64,' + docsel;
    obj.download = nombrefile+ ".pdf";
    obj.click();
  }

  exportAsXLSX2():void {
    this.excelService.exportToExcel(this.postulacionesest,'ReporteIndividual');
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.$postuByIdArray.filter = filterValue.trim().toLowerCase();}
  }



  

