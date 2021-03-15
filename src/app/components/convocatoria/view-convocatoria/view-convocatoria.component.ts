import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ServicesViewConvocatoriaService} from './services-view-convocatoria.service';
import {ServiciolistarconvoService} from './../../listarconvocatoria/serviciolistarconvo.service';
import {PostulacionService} from '../../../services/postulacion.service';
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
  Docsestados={};
  listDocs= [
    "d10", 
    "factservicio", 
    "cartapeticion", 
    "carnetestudiante", 
    "cedulapadre", 
    "cedulamadre" ,
    "promedioacumulado" ,
    "tabulado" ,"constanciaweb" ,"certificadovencidad" ,"documentoestudiante" 
    ,"documentoacudiente" ,"formatosolicitudbeneficio" ,"diagnosticomedico",
    "recibopagomatricula" ,"certificadoingresos"];
  postuseltable:any;
  estadopostusel=0;


//DOCUMENTOS VARIABLES INICIO
  d10 = '';
  factservicio = '';
  cartapeticion = '';
  carnetestudiante = '';
  cedulapadre = '';
  cedulamadre = '';
  promedioacumulado = '';
  tabulado = '';
  constanciaweb = '';
  certificadovencidad = '';
  documentoestudiante = '';
  documentoacudiente = '';
  formatosolicitudbeneficio = '';
  diagnosticomedico  = '';
  recibopagomatricula = '';
  certificadoingresos = '';

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
        d10:this.d10 + "|-|" +this.postuseltable.d10.split("|-|")[1],
        factservicio:this.factservicio + "|-|" +this.postuseltable.factservicio.split("|-|")[1],
        cartapeticion:this.cartapeticion + "|-|" +this.postuseltable.cartapeticion.split("|-|")[1],
        carnetestudiante:this.carnetestudiante + "|-|" +this.postuseltable.carnetestudiante.split("|-|")[1],
        cedulapadre:this.cedulapadre + "|-|" +this.postuseltable.cedulapadre.split("|-|")[1],
        cedulamadre:this.cedulamadre + "|-|" +this.postuseltable.cedulamadre.split("|-|")[1],
        promedioacumulado:this.promedioacumulado + "|-|" +this.postuseltable.promedioacumulado.split("|-|")[1],
        tabulado:this.tabulado + "|-|" +this.postuseltable.tabulado.split("|-|")[1],
        constanciaweb:this.constanciaweb+ "|-|" +this.postuseltable.constanciaweb.split("|-|")[1],
        certificadovencidad:this.certificadovencidad+ "|-|" +this.postuseltable.certificadovencidad.split("|-|")[1],
        documentoestudiante:this.documentoestudiante + "|-|" + this.postuseltable.documentoestudiante.split("|-|")[1],
        documentoacudiente:this.documentoacudiente+ "|-|" +this.postuseltable.documentoacudiente.split("|-|")[1],
        formatosolicitudbeneficio:this.formatosolicitudbeneficio+ "|-|" +this.postuseltable.formatosolicitudbeneficio.split("|-|")[1],
        diagnosticomedico:this.diagnosticomedico+ "|-|" +this.postuseltable.diagnosticomedico.split("|-|")[1],
        recibopagomatricula:this.recibopagomatricula+ "|-|" +this.postuseltable.recibopagomatricula.split("|-|")[1],
        certificadoingresos:this.certificadoingresos + "|-|" +this.postuseltable.certificadoingresos.split("|-|")[1],
        observacion:this.observacion
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
      
    }); }
  verPostuSel(idpostu:any, estado_postu:any, postu:any ,templatePostu){
    this.postuseltable = postu;
    this.observacion = this.postuseltable.coments;
    this.d10=this.postuseltable.d10.split("|-|")[0];
    this.factservicio=this.postuseltable.factservicio.split("|-|")[0];
    this.cartapeticion=this.postuseltable.cartapeticion.split("|-|")[0];
    this.carnetestudiante=this.postuseltable.carnetestudiante.split("|-|")[0];
    this.cedulapadre=this.postuseltable.cedulapadre.split("|-|")[0];
    this.cedulamadre=this.postuseltable.cedulamadre.split("|-|")[0];
    this.promedioacumulado=this.postuseltable.promedioacumulado.split("|-|")[0];
    this.tabulado=this.postuseltable.tabulado.split("|-|")[0];
    this.constanciaweb=this.postuseltable.constanciaweb.split("|-|")[0];
    this.certificadovencidad=this.postuseltable.certificadovencidad.split("|-|")[0];
    this.documentoestudiante=this.postuseltable.documentoestudiante.split("|-|")[0];
    this.documentoacudiente=this.postuseltable.documentoacudiente.split("|-|")[0];
    this.formatosolicitudbeneficio=this.postuseltable.formatosolicitudbeneficio.split("|-|")[0];
    this.diagnosticomedico=this.postuseltable.diagnosticomedico.split("|-|")[0];
    this.recibopagomatricula=this.postuseltable.recibopagomatricula.split("|-|")[0];
    this.certificadoingresos=this.postuseltable.certificadoingresos.split("|-|")[0];
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

    if(estadopostulacionactual == 'En espera'){
        if(estadoseleccionado == 'Revision'){
          this.updatePostu = {
            idpostu:idPostu,
            estadopostu: estadoseleccionado
          };
          this.serviceviewconvocatoria.actualizarEstadoPostulacion(this.updatePostu).subscribe
          (res=>{  
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
          },(err)=>{console.log('ERROR: ' + err.error.text);
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
          },(err)=>{console.log('ERROR: ' + err.error.text);
        });
        }else if(estadoseleccionado == 'Entrevista'){
          this.updatePostu = {
            idpostu:idPostu,
            estadopostu: estadoseleccionado
          };
          this.serviceviewconvocatoria.actualizarEstadoPostulacion(this.updatePostu).subscribe
          (res=>{  
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
          },(err)=>{console.log('ERROR: ' + err.error.text);
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
          },(err)=>{console.log('ERROR: ' + err.error.text);
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
            },(err)=>{console.log('ERROR: ' + err.error.text);
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
          },(err)=>{console.log('ERROR: ' + err.error.text);
        });
        }else if(estadoseleccionado == 'Visita'){
            this.updatePostu = {
              idpostu:idPostu,
              estadopostu: estadoseleccionado
            };
            this.serviceviewconvocatoria.actualizarEstadoPostulacion(this.updatePostu).subscribe
            (res=>{  
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
            },(err)=>{console.log('ERROR: ' + err.error.text);
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
          },(err)=>{console.log('ERROR: ' + err.error.text);
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
          },(err)=>{console.log('ERROR: ' + err.error.text);
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
            },(err)=>{console.log('ERROR: ' + err.error.text);
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
            },(err)=>{console.log('ERROR: ' + err.error.text);
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
              console.log('ERROR: ' + err.error.text); 
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
              },(err)=>{console.log('ERROR: ' + err.error.text);
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
            },(err)=>{console.log('ERROR: ' + err.error.text);
          });
          }
        }

      
    }
      exportAsXLSX():void {
    this.excelService.exportToExcel(this.$postuByIdArray,'ReportePostulaciones'); }

  downloadPDF(docsel:any,nombrefile:any){
    this.nuevoarreglo = docsel.split("|-|");
    var obj = document.createElement('a'); 
    obj.type = 'application/pdf';
    obj.href = 'data:application/pdf;base64,' + this.nuevoarreglo[1];
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



  

