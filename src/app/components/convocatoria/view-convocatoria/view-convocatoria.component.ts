import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ServicesViewConvocatoriaService} from './services-view-convocatoria.service';
import {ServiciolistarconvoService} from './../../listarconvocatoria/serviciolistarconvo.service';
import {DocumentoService} from '../../../services/documento.service';
import {PostulacionService} from '../../../services/postulacion.service';
import {VisitadomiciliariaService} from '../../../services/visitadomiciliaria.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {formatDate} from '@angular/common';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {RegistrarConvoServiceService} from '../registrar-convocatoria/registrar-convo-service.service';
import {Router } from '@angular/router';
import {ExporterService} from '../../../services/exporter.service';
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import Swal from 'sweetalert2';
import { ThemePalette } from '@angular/material/core';
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
  $nombreusuario= JSON.parse(localStorage.getItem('currentUser'));
  visitarListar:any;
  nuevoarreglo:any;
  dataSource: MatTableDataSource<any>;
  dataSource2: MatTableDataSource<any>;
  convoActualizado:any;
  documentosFoundpostu:any;
  listActualizar:any;
  listadoDocsActualizar:any;
  observacion='';
  public disabled = false;
  public showSpinners = false;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;

  
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';

  public formGroup = new FormGroup({
    date: new FormControl(null, [Validators.required]),
    date2: new FormControl(null, [Validators.required])
  });
  public dateControl = new FormControl(new Date('now'));
  public dateControlMinMax = new FormControl(new Date());
  date = new Date(2020, 1, 1);
  minDate = new Date();
  
  public options = [
  { value: true, label: 'True' },
  { value: false, label: 'False' }
  ];

  public listColors = ['primary', 'accent', 'warn'];

  public stepHours = [1, 2, 3, 4, 5];
  public stepMinutes = [1, 5, 10, 15, 20, 25];
  public stepSeconds = [1, 5, 10, 15, 20, 25];

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
  fechaactual = formatDate(new Date(), 'yyyy/MM/dd', 'en');
  updatePostu:any;
  loadingcc = false;
  Docsestados={};
  listDocs= [];
  postuseltable:any;
  estadopostusel=0;

  //visitavariables
  visitaPostuFound:any;
  visitavalidate=false;



  aprobadolist:any;
  cantperiodos:any;
  observacionbene:any;


  //imagenes
  imagenesvisita={idpostu:0, imagencocina:'',imagencuarto:''};
  idimagensel:any;

  //entrevistavariables
  entrevistaPostuFound:any;
  estadoSelPromedio:any;
  entrevistvalidate=false;
  //FIN VARIABLES DOCUMENTOS
    displayedColumns: string[] = ['estudiante.nombreestudiante', 
    'codigoestudiante', 'ciudadresidencia' , 'carrera',
    'promedio','fechapostulacion',
    'semestre','estado_postulacion','Acciones'];

    displayedColumns2: string[] = ['estudiante.nombreestudiante', 
    'codigoestudiante', 'ciudadresidencia', 'visitaencontro','entrevistaencontro','carrera',
    'promedio','fechapostulacion',
    'semestre','estado_postulacion','Acciones'];
    success:any;
    convocatoriaBeca: any;
    activeForm=false;
    convocatoriaPeriodo: any;
    activeButton=false;
    estadoArreglopromedio:any;
    estado=true;
    disabledActualizar=true;
    postulacionesest:any;
    public formularioConvocatoria: FormGroup;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort,{static: false}) sort: MatSort;
  constructor(private rutaActiva: ActivatedRoute,
   private serviceviewconvocatoria:ServicesViewConvocatoriaService,public dialog: MatDialog, 
   private serviceConvocatoria:RegistrarConvoServiceService,
   private servicePostulacion:PostulacionService,
   private documentosService:DocumentoService,
   private visitadomiciliariaService:VisitadomiciliariaService,
   private router:Router,
   private excelService: ExporterService ) { 
      Swal.fire({
        title: 'Cargando...',
        allowOutsideClick: false,
      });
      Swal.showLoading();
      console.log(this.dataSource2);
    this.$idConvo = this.rutaActiva.snapshot.params.idConvo;
    this.buscarConvoByIdConvo(this.$idConvo);
    if(this.$nombreusuario.rol == '4'){
      this.buscarPostulacionesByPsicologia(this.$idConvo);
    }else{
      this.buscarPostulacionesByIdConvo(this.$idConvo);
    }
    

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
        Swal.fire({
          title: 'Exitoso',
          text: 'Actualizado exitosamente.',
          icon: 'success'
        });
      },(err)=>{
        Swal.fire({
          title: 'ERROR',
          text: 'Error al actualizar el estado de los documentos, ERROR: ' + err.error,
          icon: 'error'
        });
      });

  }
  seleccionarArchivo(event,idsel:any) {
    var files = event.target.files;
    var file = files[0];
    this.idimagensel = idsel;
    

    if(files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvent) {
    var binaryString = readerEvent.target.result;
    if(this.idimagensel == 0){
      this.imagenesvisita.imagencocina = btoa(binaryString);
    }else{
      this.imagenesvisita.imagencuarto = btoa(binaryString);
    }
    
  }
  verimagencuarto(template){
    let dialogRef = this.dialog.open( template,{
      panelClass: 'verimagen', 
       height: '600px',
       width: '710px',
    });
    console.log(dialogRef);
  }

  actualizarImagesPostu(){
      Swal.fire({
        title: 'Cargando...',
        allowOutsideClick: false,
      });
      Swal.showLoading();
    this.imagenesvisita.idpostu = this.postuseltable.consecutivo_postulacion;
    console.log(this.imagenesvisita);
    this.serviceviewconvocatoria.actualizarImagesostulacion(this.imagenesvisita).subscribe(result=>{
      Swal.fire({
        title: 'Exitoso',
        text: 'Subidas las imagenes correctamente',
        icon:'success',
      });
    },(err)=>{
      Swal.fire({
        title: 'ERROR',
        text: 'Error al subir la imagen, ERROR: ' + err.error.text,
        icon:'error',
      });
    });
  }

  descargarPDFVisita(visitaAListar:any){
    const doc = new jsPDF("p", "mm", "a4");
    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();
    // PAGINA 1
    var img = new Image();
    var img2 = new Image();
    var align = Object("right");
    img.src="assets/imgs/0001.jpg";
    img2.src="assets/imgs/0002.jpg";
    doc.addImage(img,'jpg',0,0,width,height);

    //Fecha
    doc.setFontSize(10);
    doc.text(visitaAListar.fechavisita,158,50,align);
    doc.setFontSize(10);
    doc.setFont("helvetica","bold");
    doc.text("X",47,66);

    doc.setFontSize(10);
    doc.setFont("helvetica","normal");
    doc.text(""+visitaAListar.codigoestpostu,25,75);
    doc.text(""+visitaAListar.plancarrera,73,75);
    doc.text(""+visitaAListar.ccvisita,105,75);
    doc.text('-------' ,145,75);
    doc.text('-------' ,175,75);
    doc.setFontSize(10);
    doc.text( visitaAListar.direccion,40,85);
    doc.text( visitaAListar.barrio,117,85);
    doc.text(""+visitaAListar.comuna,185,85);
    doc.setFontSize(10);
    doc.text(visitaAListar.nombreatencion,100,100);
    doc.setFontSize(10);
    doc.text(visitaAListar.parentesco,35,105);
    doc.setFontSize(10);
    doc.setFont("helvetica","bold");
    switch (visitaAListar.obligacion) {
      case "Solicitante":
        doc.text("X",34,122);
        break;
      case "Conyúge":
        doc.text("X",34,127);
        break;
      case "Padre":
        doc.text("X",93,122);
        break;
      case "Madre":
        doc.text("X",160,122);
        break;
      case "Otro":
        doc.text("X",93,127);
        doc.setFontSize(10);
        doc.setFont("helvetica","normal");
        doc.text(visitaAListar.cualobligacion,157,126);
        break;                             
      default:
        // code...
        break;
    }
    doc.setFontSize(10);
    doc.setFont("helvetica","bold");
    switch (visitaAListar.estratodane) {
      case "Bajo-Bajo":
       doc.text("X",41,142);
        break;
      case "Bajo":
        doc.text("X",40,147);
        break;
      case "Mediano-Bajo":
        doc.text("X",105,142);
        break;
      case "Medio":
        doc.text("X",105,147);
        break;
      case "Medio-Alto":
        doc.text("X",150,142);
        break;   
      case "Alto":
        doc.text("X",150,147);
        break;                                    
      default:
        // code...
        break;
    }
    switch (visitaAListar.pagoarriendo) {
      case "Si":
        doc.text("X",59,157);
        break;
      case "No":
        doc.text("X",59,162);
        break;
      default:
        // code...
        break;
    }

    doc.text(""+visitaAListar.valorarriendo,130,157);
    var cubreariendosel = visitaAListar.cubrearriendo.split(",");
    for (var i = 0; i < cubreariendosel.length; ++i) {
      switch (cubreariendosel[i]) {
        case "Cuarto":
          doc.text("X",75,170);
          break;
        case "Alimentación":
          doc.text("X",123,170);
          break;
        
        default:
          // code...
          break;
      }
    }

    doc.text(""+visitaAListar.otroarriendo,170,170);

    switch (visitaAListar.fuenteingreso) {
      case "Trabajo":
        doc.text("X",27,184);
        break;
      case "Familia":
        doc.text("X",62,184);
        break;
      case "Otros":
        doc.text("X",99,184);
        doc.text(""+visitaAListar.cualfuente,130,184);
        break;
      
      default:
        // code...
        break;
    }
    //VIVIENDA TIPO
    switch (visitaAListar.tipocasa) {
      case "Casa":
        doc.text("X",75,205);
        break;
      case "Apartamento":
        doc.text("X",123,205);
        break;
      case "Cuarto":
        doc.text("X",168,205);
        break;
      
      default:
        // code...
        break;
    }
    //ASPECTO FISICO
    switch (visitaAListar.aspectocasa) {
      case "Terminado":
        doc.text("X",75,215);
        break;
      case "Obra Negra":
        doc.text("X",123,215);
        break;
      case "otrosAspecto":
        doc.text("X",168,215);
        doc.text(""+visitaAListar.cualaspecto,168,220);
        break;
      case "En Construcción":
        doc.text("X",75,220);
        break;
      case "Remodelación":
        doc.text("X",123,220);
        break;
      
      default:
        // code...
        break;
    }
    //SERVICIOS PUBLICOS
    var serviciospublicossel = visitaAListar.serviciopublico.split(",");
    for (var i = 0; i < serviciospublicossel.length; ++i) {
        switch (serviciospublicossel[i]) {
         case "Agua":
           doc.text("X",75,228);
           break;
         case "Energía":
           doc.text("X",123,228);
           break;
         case "Alcantarillado":
           doc.text("X",75,233);
           break;
         case "Teléfono":
           doc.text("X",171,228);
           break;
         case "Gas Domiciliario":
           doc.text("X",171,233);
           break;
         
         default:
           // code...
           break;
       }    
    }
  

    //CUARTO DEL SOLICITANTE
       switch (visitaAListar.cuartosolicitante) {
         case "Solo":
           doc.text("X",20,248);
           break;
         case "Compartido":
           doc.text("X",75,248);
           doc.text(visitaAListar.cantidadpersonas,140,248);
           break;
         
         default:
           // code...
           break;
       }
    
    //FIN PAGINA 1
    //PAGINA 2
    doc.addPage();
    doc.addImage(img2,'jpg',0,0,width,height);
    doc.setFontSize(10);
    doc.setFont("helvetica","normal");
    var splitText = doc.splitTextToSize(visitaAListar.descripcionfinal,180);
    doc.text(splitText,8,52);


    //FIN PAGINA 2

    doc.save("VisitaDomiciliaria.pdf");
  }

  descargarPDFEntrevista(){
    const doc = new jsPDF("p", "mm", "a4");
    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();
    var img = new Image();
    var img2 = new Image();
    var img3 = new Image();
    img.src="assets/imgs/INFOGENE1.jpg";
    img2.src="assets/imgs/op1.jpg";
    img3.src="assets/imgs/op12.jpg";
    // PAGINA 1
    doc.addImage(img,'jpg',0,0,width,height);
    doc.setFontSize(10);

    //IDENTIFICACION
    doc.setFont("helvetica","normal");
    doc.text("" + this.entrevistaPostuFound.nombrepostulante,47,55);
    doc.text("" + this.entrevistaPostuFound.codigopostulante,25,60);
    doc.text("" + this.entrevistaPostuFound.codigocarrerapostulante,90,60);
    doc.text(this.entrevistaPostuFound.lugarnacimiento,50,66);
    doc.text("" + this.entrevistaPostuFound.fechanacimientopostulante,135,66);
    doc.text("" + this.entrevistaPostuFound.cedulapostulante,48,71);
    doc.text("" + this.entrevistaPostuFound.expedicioncedula,140,71);


    doc.setFont("helvetica","bold");
    switch (this.entrevistaPostuFound.estadocivil) {
      case "soltero":
        doc.text("X",56,76);
        break;
      case "casado":
         doc.text("X",79,76);
        break;
      case "viudo":
        doc.text("X",98,76);
        break;
      case "unionlibre":
        doc.text("X",129,77);
        break;
      case "separado":
        doc.text("X",158,77);
        break;                        
      default:
        // code...
        break;
    }

    //SITUACION ECONOMICA 
    doc.setFont("helvetica","normal");
    doc.text("10",30,81);

    doc.text(this.entrevistaPostuFound.municipioprocedencia,55,99);
    doc.text(this.entrevistaPostuFound.direccion,130,99);
    doc.text(this.entrevistaPostuFound.barrio,25,103);
    doc.text("" + this.entrevistaPostuFound.telefono,130,103);
    doc.text(this.entrevistaPostuFound.direccioncali,43,107);
    doc.text(this.entrevistaPostuFound.barriocali,130,107);

    doc.text("" + this.entrevistaPostuFound.telefonocali,45,111);

    //RESIDE CON
    doc.setFont("helvetica","bold");
    switch (this.entrevistaPostuFound.residencia) {
      case "CON SU FAMILIA DE ORIGEN":
          doc.text("X",80,128);
        break;
      case "CON SU FAMILIA PROPIA (CÓNYUGE)":
        doc.text("X",80,132);
        break;
      case "CON SUS PARIENTES":
        doc.text("X",80,136);
        break;
      case "CON COMPAÑEROS O AMIGOS":
        doc.text("X",80,140);
        break;
      case "SOLO":
       doc.text("X",80,144);
        break;                                
        // code...
        break;
      case "EN APARTAMENTO PROPIO":
        doc.text("X",176,128);
        break;
      case "EN APARTAMENTO ALQUILADO":
        doc.text("X",176,132);
        break;
      case "EN PIEZA ARRENDA":
        doc.text("X",176,136);
        break;      
      case "EN PENSIÓN":
        doc.text("X",176,140);
        break;                                    

      
      default:
        // code...
        break;
    }


    //FUENTES DE INGRESO
    doc.setFontSize(20);
    console.log(this.entrevistaPostuFound[1][0]);
    for (var i = 0; i < this.entrevistaPostuFound[1][0].length; i++) {
      var textoseparado = this.entrevistaPostuFound[1][0][i].nombreayuda.split(",");
      for (var j = 0; j < textoseparado.length; j++) {
        console.log(textoseparado[j] );
        if(textoseparado[j] != ""){
          switch (textoseparado[j]) {
            case "Familia":
              if(i == 0){
                doc.text("X",65,173);
              }else if( i == 1){
                doc.text("X",65,181);
              }else if (i == 2){
                doc.text("X",65,189);
              }else if( i == 3){
                doc.text("X",65,199);
              }else{
                doc.text("X",65,207);
              }
              break;
            case "TRAB.RENTASPROPIAS":
              if(i == 0){
                doc.text("X",105,173);
              }else if( i == 1){
                doc.text("X",105,181);
              }else if (i == 2){
                doc.text("X",105,189);
              }else if( i == 3){
                doc.text("X",105,199);
              }else{
                doc.text("X",105,207);
              }
              break;
            case "Ayudas":
              if(i == 0){
                doc.text("X",143,173);
              }else if( i == 1){
                doc.text("X",143,181);
              }else if (i == 2){
                doc.text("X",143,189);
              }else if( i == 3){
                doc.text("X",143,199);
              }else{
                doc.text("X",143,207);
              }
              break;
            case "Presatamos":
              if(i == 0){
                doc.text("X",180,173);
              }else if( i == 1){
                doc.text("X",180,181);
              }else if (i == 2){
                doc.text("X",180,189);
              }else if( i == 3){
                doc.text("X",180,199);
              }else{
                doc.text("X",180,207);
              }
              break;                                                     
            
            default:
              // code...
              break;
          }
        }
      }
    }
    

    doc.setFontSize(10);
    //TRABAJA?
    switch (this.entrevistaPostuFound.trabaja) {
      case "si":
            doc.text("X",44,216);
        break;
      case "no":
        doc.text("X",74,216);
        break;      
      default:
        // code...
        break;
    }


    

    //INFO Trabajo
    doc.setFont("helvetica","normal");
    doc.text(this.entrevistaPostuFound.cargotrabajador,64,220);
    doc.text(this.entrevistaPostuFound.nombreempresa,64,225);
    doc.text("" + this.entrevistaPostuFound.antiguedad,40,229);
    doc.text(this.entrevistaPostuFound.ciudadempresa,25,233);
    doc.text(this.entrevistaPostuFound.direccionempresa,82,233);
    doc.text(""+this.entrevistaPostuFound.telefenoempresa,170,233);

    //VALOR TOTAL DE INGRESOS
    doc.text("" + this.entrevistaPostuFound.valortotalingreso,50,245);





    // FIN PAGINA 1

    // PAGINA 2
    doc.addPage();
    doc.addImage(img2,'jpg',0,0,width,height);

    //bachillerato
    doc.text(this.entrevistaPostuFound.colegio,35,64);
    doc.text("" + this.entrevistaPostuFound.aniogrado,140,64);

    doc.text(this.entrevistaPostuFound.municipio,40,69);
    doc.text(this.entrevistaPostuFound.pais,140,68);

    doc.text(this.entrevistaPostuFound.bachillericfes,48,73);
    doc.text("" + this.entrevistaPostuFound.anioicfes,140,73);


    doc.setFont("helvetica","bold");
    switch (this.entrevistaPostuFound.caractercolegio) {
      case "publico":
        doc.text("X",38,81);
        break;
      case "privado":
        doc.text("X",129,81);
        break;
      default:
        // code...
        break;
    }
    
    


    doc.setFont("helvetica","normal");
    //valor matricula
    doc.text("" + this.entrevistaPostuFound.valormatricula,55,98);
    doc.text(""+ this.entrevistaPostuFound.valorpension,140,98);

    //INFO FAMILIA TABLA 1

    var cuentaparentesco = 0;
    var cuentahermanos = 0;
    var cuentaOtros = 0;

    for (var i = 0; i < this.entrevistaPostuFound[0][0].length; ++i) {
      if(this.entrevistaPostuFound[0][0][i].tipoparentesco == "Padre"){
          //padre
          var splitText = doc.splitTextToSize(this.entrevistaPostuFound[0][0][i].nombre,24);
          doc.text(splitText,30,128);
          doc.text(this.entrevistaPostuFound[0][0][i].edad,32,140);
          doc.text(this.entrevistaPostuFound[0][0][i].direccion,32,150);
          doc.text(this.entrevistaPostuFound[0][0][i].ciudad,32,160);
          doc.text(this.entrevistaPostuFound[0][0][i].ocupacion,32,170);
          doc.text("" +this.entrevistaPostuFound[0][0][i].ingresos,32,180);
      }else if(this.entrevistaPostuFound[0][0][i].tipoparentesco == "Madre"){
              //madre
              var splitText = doc.splitTextToSize(this.entrevistaPostuFound[0][0][i].nombre,24);
          doc.text(splitText,65,128);
          doc.text(this.entrevistaPostuFound[0][0][i].edad,65,140);
          doc.text(this.entrevistaPostuFound[0][0][i].direccion,65,150);
          doc.text(this.entrevistaPostuFound[0][0][i].ciudad,65,160);
          doc.text(this.entrevistaPostuFound[0][0][i].ocupacion,65,170);
          doc.text("" +this.entrevistaPostuFound[0][0][i].ingresos,65,180);
      }else if(this.entrevistaPostuFound[0][0][i].tipoparentesco == "Conyuge"){
          //conyugue
          var splitText = doc.splitTextToSize(this.entrevistaPostuFound[0][0][i].nombre,16);
          doc.text(splitText,95,128);
          doc.text(this.entrevistaPostuFound[0][0][i].edad,95,140);
          doc.text(this.entrevistaPostuFound[0][0][i].direccion,95,150);
          doc.text(this.entrevistaPostuFound[0][0][i].ciudad,95,160);
          doc.text(this.entrevistaPostuFound[0][0][i].ocupacion,95,170);
          doc.text("" +this.entrevistaPostuFound[0][0][i].ingresos,95,180);
      }else if(this.entrevistaPostuFound[0][0][i].tipoparentesco == "Hermano"){
        if(cuentahermanos == 0){
          var splitText = doc.splitTextToSize(this.entrevistaPostuFound[0][0][i].nombre,16);
          doc.text(splitText,40,205);
          doc.text(this.entrevistaPostuFound[0][0][i].edad,40,215);
          doc.text(this.entrevistaPostuFound[0][0][i].direccion,40,225);
          doc.text(this.entrevistaPostuFound[0][0][i].ciudad,40,235);
          doc.text(this.entrevistaPostuFound[0][0][i].ocupacion,40,245);
          doc.text("" +this.entrevistaPostuFound[0][0][i].ingresos,40,255);
          cuentahermanos++;
        }else if(cuentahermanos == 1){
          var splitText = doc.splitTextToSize(this.entrevistaPostuFound[0][0][i].nombre,16);
          doc.text(splitText,80,205);
          doc.text(this.entrevistaPostuFound[0][0][i].edad,80,215);
          doc.text(this.entrevistaPostuFound[0][0][i].direccion,80,225);
          doc.text(this.entrevistaPostuFound[0][0][i].ciudad,80,235);
          doc.text(this.entrevistaPostuFound[0][0][i].ocupacion,80,245);
          doc.text("" +this.entrevistaPostuFound[0][0][i].ingresos,80,255);

          cuentahermanos++;
        }else{
          var splitText = doc.splitTextToSize(this.entrevistaPostuFound[0][0][i].nombre,16);
          doc.text(splitText,120,205);
          doc.text(this.entrevistaPostuFound[0][0][i].edad,120,215);
          doc.text(this.entrevistaPostuFound[0][0][i].direccion,120,225);
          doc.text(this.entrevistaPostuFound[0][0][i].ciudad,120,235);
          doc.text(this.entrevistaPostuFound[0][0][i].ocupacion,120,245);
          doc.text("" +this.entrevistaPostuFound[0][0][i].ingresos,120,255);
        }
      }else if(this.entrevistaPostuFound[0][0][i].tipoparentesco == "Otro"){
        if(cuentaOtros == 0){
          var splitText = doc.splitTextToSize(this.entrevistaPostuFound[0][0][i].nombre,16);
          doc.text(splitText,140,205);
          doc.text(this.entrevistaPostuFound[0][0][i].edad,140,215);
          doc.text(this.entrevistaPostuFound[0][0][i].direccion,140,225);
          doc.text(this.entrevistaPostuFound[0][0][i].ciudad,140,235);
          doc.text(this.entrevistaPostuFound[0][0][i].ocupacion,140,245);
          doc.text("" +this.entrevistaPostuFound[0][0][i].ingresos,140,255);

          cuentaOtros++;
        }else{
          var splitText = doc.splitTextToSize(this.entrevistaPostuFound[0][0][i].nombre,16);
          doc.text(splitText,175,128);
          doc.text(this.entrevistaPostuFound[0][0][i].edad,175,215);
          doc.text(this.entrevistaPostuFound[0][0][i].direccion,175,225);
          doc.text(this.entrevistaPostuFound[0][0][i].ciudad,175,235);
          doc.text(this.entrevistaPostuFound[0][0][i].ocupacion,175,245);
          doc.text("" +this.entrevistaPostuFound[0][0][i].ingresos,175,255);
        }
      }else{
        if(cuentaparentesco == 0){
              //p2
              var splitText = doc.splitTextToSize(this.entrevistaPostuFound[0][0][i].nombre,16);
              doc.text(splitText,135,128);
          doc.text(this.entrevistaPostuFound[0][0][i].edad,135,140);
          doc.text(this.entrevistaPostuFound[0][0][i].direccion,135,150);
          doc.text(this.entrevistaPostuFound[0][0][i].ciudad,135,160);
          doc.text(this.entrevistaPostuFound[0][0][i].ocupacion,135,170);
          doc.text("" +this.entrevistaPostuFound[0][0][i].ingresos,135,180);
          cuentaparentesco++;
        }else {
              //p1
              var splitText = doc.splitTextToSize(this.entrevistaPostuFound[0][0][i].nombre,16);
              doc.text(splitText,175,128);
          doc.text(this.entrevistaPostuFound[0][0][i].edad,175,140);
          doc.text(this.entrevistaPostuFound[0][0][i].direccion,175,150);
          doc.text(this.entrevistaPostuFound[0][0][i].ciudad,175,160);
          doc.text(this.entrevistaPostuFound[0][0][i].ocupacion,175,170);
          doc.text("" +this.entrevistaPostuFound[0][0][i].ingresos,175,180);
        }
      }
    }
    // FIN PAGINA 2


    //PAGINA 3
    doc.addPage();
    doc.addImage(img3,'jpg',0,0,width,height);
    doc.setFontSize(10);
    doc.setFont("helvetica","bold");

    switch (this.entrevistaPostuFound.casapropia) {
      case "Si":
        doc.text("X",19,59);
        break;
      case "No":
        doc.text("X",150,60);
        break;
      
      default:
        // code...
        break;
    }
    switch (this.entrevistaPostuFound.hipoteca) {
      case "hipoteca":
        doc.text("X",113,59);
        break;
      case "Sin hipoteca":
        doc.text("X",66,59);
        break;        
      
      default:
        // code...
        break;
    }
    //amortizacion
    doc.setFont("helvetica","normal");
    doc.text("" + this.entrevistaPostuFound.valormensualamortizacion,71,67);
    doc.text("" + this.entrevistaPostuFound.valormensualarriendo,177,67);

    switch (this.entrevistaPostuFound.jefefamilia) {
      case "padre":
        doc.text("X",55,87);
        break;
      case "madre":
        doc.text("X",55,92);

        break;
      case "hermano":
        doc.text("X",55,96);

        break;
      case "abuelo":
        doc.text("X",55,100);

        break;
      case "esposo":
        doc.text("X",55,104);

        break;
      case "otro":
        doc.text("X",55,109);
        break;                                       
      
      default:
        // code...
        break;
    }

    switch (this.entrevistaPostuFound.niveleducativojefe) {
      case "ninguno":
        doc.text("X",159,87);
        break;
      case "primaria":
        doc.text("X",159,92);
        break;
      case "secundaria":
        doc.text("X",159,96);
        break;
      case "tecnico":
        doc.text("X",159,100);
        break;
      case "superior":
        doc.text("X",159,104);
        break;
      case "postgrado":
         doc.text("X",159,109);
        break;                                

      
      default:
        // code...
        break;
    }



    doc.text("" + this.entrevistaPostuFound.ingresomensualfamiliar,145,116);

    switch (this.entrevistaPostuFound.posicionjefe) {

      case "obrero no calificado":
        doc.text("X",7,136);
        break;
      case "obrero calificado":
        doc.text("X",7,141);
        break;
      case "empleado dependiente":
        doc.text("X",7,145);
        break;
      case "atesano o pequeño trabajador independiente con local propio":
        doc.text("X",7,149);
        break;
      case "pequeño campesino propietario":
        doc.text("X",7,153);
        break;
      case "profesional asalariado o empleado de mandos medios":
        doc.text("X",7,157);
        break;
      case "profesional independiente, tecnico o trabajador independiente":
        doc.text("X",7,161);
        break;
      case "oficial de las fuerzas armadas. indique el grado":
        doc.text("X",7,166);
        break;
      case "director, gerente ejecutivo de rango superior":
        doc.text("X",7,170);
        break;    
      case "propietario de empresa o rentista de capital":
        doc.text("X",7,174);
        break;     
      default:
        // code...
        break;
    }


    doc.text(this.entrevistaPostuFound.empresajefe,30,187);
    doc.text("" + this.entrevistaPostuFound.ingresojefe,160,187);
    doc.text(this.entrevistaPostuFound.ocupacionjefe,40,191);
    doc.text(this.entrevistaPostuFound.direccionempresajefe,50,195);
    doc.text(this.entrevistaPostuFound.ciudadjefe,30,199);
    doc.text("" +this.entrevistaPostuFound.telefonojefe,145,199);


    //observaciones
    var splitText = doc.splitTextToSize(this.entrevistaPostuFound.observacion,180);
    doc.text(splitText,10,215);


    doc.text("" + this.entrevistaPostuFound.fecharegistro,160,272);

    // FIN PAGINA3
    doc.save("Entrevista.pdf");
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

  getEntrevistaPostu(idPostu:any){
    this.entrevistvalidate=false;
    this.serviceviewconvocatoria.buscarEntrevistaPostu(idPostu).subscribe(result=>{
      this.entrevistaPostuFound = result;
      console.log(this.entrevistaPostuFound);
      this.entrevistvalidate =true;
    },(err)=>{
      this.entrevistvalidate=false;
    });
  }

  updateEstadoPromedio(valsel:any){
    this.estadoArreglopromedio = {
      idpostu:this.postuseltable.consecutivo_postulacion,
      valsel:valsel
    };
    this.postuseltable.estadopromedio = valsel;
      Swal.fire({
        title: 'Cargando...',
        allowOutsideClick: false,
      });
      Swal.showLoading();
    this.serviceviewconvocatoria.actualizarEstadoPromedio(this.estadoArreglopromedio).subscribe(result=>{
        for (var i = 0; i < this.$postuByIdArray.length; i++) {
          if(this.$postuByIdArray[i].consecutivo_postulacion == this.postuseltable.consecutivo_postulacion){
            this.$postuByIdArray[i].estadopromedio = valsel;
          }
        }
         Swal.fire({
          title: 'Exitoso',
          text: 'Estado actualizado exitosamente.',
          icon: 'success'
        });
    },(err)=>{
        Swal.fire({
          title: 'ERROR',
          text: 'Error al buscar postulación por identificación, ERROR: ' + err.error.text,
          icon: 'error'
        });
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
       height: '600px',
       width: '1024px',
    });
  }

  verEntrevistaModal(entrevistaPostu){
    let dialogRef = this.dialog.open( entrevistaPostu,{
       height: '600px',
       width: '1024px',
    });
    console.log(this.dialog);
  }

  cerrarEntrevista(){
    let dialogRef = this.dialog.openDialogs[1];

    dialogRef.close();
  }
  cerrarPostulacion(){
    let dialogRef = this.dialog.openDialogs[0];

    dialogRef.close();    
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
       width: '800px',
     });
    },(err)=>{
        Swal.fire({
          title: 'ERROR',
          text: 'Error al buscar postulación por identificación.',
          icon: 'error'
        });
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
      this.dataSource = new MatTableDataSource(this.$postuByIdArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator._intl.itemsPerPageLabel = "Cantidad por paginas";
      // this.dataSource.paginator._intl.itemsPerPageLabel="Contenido por paginas";


    });
  }
  buscarPostulacionesByPsicologia(idConvo:any){
    this.serviceviewconvocatoria.buscarPostulacionesByPsicologia(idConvo).subscribe(result =>{ 
      this.$postuByIdArray = result; 
      this.dataSource2 = new MatTableDataSource(this.$postuByIdArray);
      this.dataSource2.paginator = this.paginator;
      this.dataSource2.sort = this.sort;
      this.dataSource2.paginator._intl.itemsPerPageLabel = "Cantidad por paginas";
    });
  }
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
        Swal.fire({
          title: 'Exitoso',
          text: 'Actualizado exitosamente.',
          icon: 'success'
        });
    },(err)=>{
              Swal.fire({
          title: 'ERROR',
          text: 'Actualizado exitosamente. ERROR: ' + err.error.text,
          icon: 'error'
        });
      
    }); }
  verPostuSel(idpostu:any, estado_postu:any, postu:any ,templatePostu){
    this.postuseltable = postu;
    this.observacion = this.postuseltable.coments;
    this.getDocumntosPostu(idpostu);
    this.getVisitaPostu(idpostu);
    this.getEntrevistaPostu(idpostu);
    switch (estado_postu) {
      case "En espera":
        this.estadopostusel=3;
        this.circlecolor1['pasoactive'] = false;
        this.circlecolor2['pasoactive'] = false;
        this.circlecolor2['pasoactivoline'] = false;
        this.circlecolor2['pasoactivocomplete'] = false;
        this.circlecolor3['pasoactive'] = false;
        this.circlecolor3['pasoactivoline'] = false;
        this.circlecolor3['pasoactivocomplete'] = false;
        this.circlecolor4['pasoactive'] = false;
        this.circlecolor4['pasoactivoline'] = false;
        this.circlecolor4['pasoactivocomplete'] = false;
        this.circlecolor5['pasoactive'] = false;
        this.circlecolor5['pasoactivoline'] = false;
        this.circlecolor5['pasoactivocomplete'] = false;
        this.circlecolor5['pasoactivered'] = false;
        this.circlecolor5['pasoactivolinered'] = false;



        this.circlecolor1['pasoactive'] = true;
        this.circlecolor2['pasoactivoline'] = true;
        break;
      case "Revision":
        this.estadopostusel=4;
        this.circlecolor1['pasoactive'] = false;
        this.circlecolor2['pasoactive'] = false;
        this.circlecolor2['pasoactivoline'] = false;
        this.circlecolor2['pasoactivocomplete'] = false;
        this.circlecolor3['pasoactive'] = false;
        this.circlecolor3['pasoactivoline'] = false;
        this.circlecolor3['pasoactivocomplete'] = false;
        this.circlecolor4['pasoactive'] = false;
        this.circlecolor4['pasoactivoline'] = false;
        this.circlecolor4['pasoactivocomplete'] = false;
        this.circlecolor5['pasoactive'] = false;
        this.circlecolor5['pasoactivoline'] = false;
        this.circlecolor5['pasoactivocomplete'] = false;
        this.circlecolor5['pasoactivered'] = false;
        this.circlecolor5['pasoactivolinered'] = false;


        this.circlecolor1['pasoactive'] = true;
        this.circlecolor2['pasoactive'] = true;
        this.circlecolor2['pasoactivocomplete'] = true;
        this.circlecolor3['pasoactivoline'] = true;
        break;
      case "Entrevista":
        this.estadopostusel=5;
            this.circlecolor1['pasoactive'] = false;
        this.circlecolor2['pasoactive'] = false;
        this.circlecolor2['pasoactivoline'] = false;
        this.circlecolor2['pasoactivocomplete'] = false;
        this.circlecolor3['pasoactive'] = false;
        this.circlecolor3['pasoactivoline'] = false;
        this.circlecolor3['pasoactivocomplete'] = false;
        this.circlecolor4['pasoactive'] = false;
        this.circlecolor4['pasoactivoline'] = false;
        this.circlecolor4['pasoactivocomplete'] = false;
        this.circlecolor5['pasoactive'] = false;
        this.circlecolor5['pasoactivoline'] = false;
        this.circlecolor5['pasoactivocomplete'] = false;
        this.circlecolor5['pasoactivered'] = false;
        this.circlecolor5['pasoactivolinered'] = false;



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
            this.circlecolor1['pasoactive'] = false;
        this.circlecolor2['pasoactive'] = false;
        this.circlecolor2['pasoactivoline'] = false;
        this.circlecolor2['pasoactivocomplete'] = false;
        this.circlecolor3['pasoactive'] = false;
        this.circlecolor3['pasoactivoline'] = false;
        this.circlecolor3['pasoactivocomplete'] = false;
        this.circlecolor4['pasoactive'] = false;
        this.circlecolor4['pasoactivoline'] = false;
        this.circlecolor4['pasoactivocomplete'] = false;
        this.circlecolor5['pasoactive'] = false;
        this.circlecolor5['pasoactivoline'] = false;
        this.circlecolor5['pasoactivocomplete'] = false;
        this.circlecolor5['pasoactivered'] = false;
        this.circlecolor5['pasoactivolinered'] = false;


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
    this.circlecolor1['pasoactive'] = false;
        this.circlecolor2['pasoactive'] = false;
        this.circlecolor2['pasoactivoline'] = false;
        this.circlecolor2['pasoactivocomplete'] = false;
        this.circlecolor3['pasoactive'] = false;
        this.circlecolor3['pasoactivoline'] = false;
        this.circlecolor3['pasoactivocomplete'] = false;
        this.circlecolor4['pasoactive'] = false;
        this.circlecolor4['pasoactivoline'] = false;
        this.circlecolor4['pasoactivocomplete'] = false;
        this.circlecolor5['pasoactive'] = false;
        this.circlecolor5['pasoactivoline'] = false;
        this.circlecolor5['pasoactivocomplete'] = false;
        this.circlecolor5['pasoactivered'] = false;
        this.circlecolor5['pasoactivolinered'] = false;



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

    this.circlecolor1['pasoactive'] = false;
        this.circlecolor2['pasoactive'] = false;
        this.circlecolor2['pasoactivoline'] = false;
        this.circlecolor2['pasoactivocomplete'] = false;
        this.circlecolor3['pasoactive'] = false;
        this.circlecolor3['pasoactivoline'] = false;
        this.circlecolor3['pasoactivocomplete'] = false;
        this.circlecolor4['pasoactive'] = false;
        this.circlecolor4['pasoactivoline'] = false;
        this.circlecolor4['pasoactivocomplete'] = false;
        this.circlecolor5['pasoactive'] = false;
        this.circlecolor5['pasoactivoline'] = false;
        this.circlecolor5['pasoactivocomplete'] = false;
        this.circlecolor5['pasoactivered'] = false;
        this.circlecolor5['pasoactivolinered'] = false;


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
       width: '970px',
     });
      console.log(dialogRef);
    }
  buscarBeca(){
    this.serviceConvocatoria.buscarListadoBecas().subscribe(convocatoriaBeca=>{
      this.convocatoriaBeca = convocatoriaBeca;
    });}
  buscarPeriodo(){
    this.serviceConvocatoria.buscarListadoPeriodos().subscribe(convocatoriaPeriodo=>{
      this.convocatoriaPeriodo = convocatoriaPeriodo;
      Swal.close();
    });}

  formEstadoFinal(templateForm,idPostu:any,estadopostulacionactual:any,estadoseleccionado:any){
    this.aprobadolist = {
      idpostu:idPostu,
      estadopostu:estadopostulacionactual,
      estadosel:estadoseleccionado
    };
    if(estadoseleccionado == 'Rechazado'){
      let dialogRef = this.dialog.open( templateForm,{
         height: '240px',
         width: '386px',
       });
    }else{
      let dialogRef = this.dialog.open( templateForm,{
        height: '380px',
        width: '386px',
      });
    }

  }
  cambiarEstadoPostu(cantperiodos:any, observacion:any,idPostu:any,estadopostulacionactual:any,estadoseleccionado:any){
    Swal.fire({
      title: 'Cargando...',
      allowOutsideClick: false,
    });
    Swal.showLoading();
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
            Swal.fire({
              title: 'Exitoso',
              text: 'Actualizado exitosamente.',
              icon: 'success'
            });
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
            Swal.fire({
              title: 'Exitoso',
              text: 'Actualizado exitosamente.',
              icon: 'success'
            });
          },(err)=>{console.log('ERROR: ' + err.error.text);this.loadingcc = false;
        });
        }else if(estadoseleccionado == 'Entrevista'){
            Swal.fire({
              title: '¿Terminaste de revisar los documentos?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: "Si, he terminado de revisar.",
              cancelButtonText: "Aún no he terminado.",
              allowOutsideClick: false,
            }).then(result=>{
            Swal.fire({
              title: 'Cargando...',
              allowOutsideClick: false,
            });
            Swal.showLoading();
              if(result.value){
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
                  Swal.fire({
                    title: 'Exitoso',
                    text: 'Actualizado exitosamente.',
                    icon: 'success'
                  });            
                },(err)=>{console.log('ERROR: ' + err.error.text);this.loadingcc = false;
              });
              }else{
                this.loadingcc = false;
                Swal.close();
              }
            });
        }else if(estadoseleccionado == 'Aprobado'){
          Swal.fire({
            title: '¿Terminaste de revisar los documentos?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Si, he terminado de revisar.",
            cancelButtonText: "Aún no he terminado.",
            allowOutsideClick: false,
          }).then(result=>{
            if(result.value){
                Swal.fire({
                  title: 'Cargando...',
                  allowOutsideClick: false,
                });
                Swal.showLoading();
              this.updatePostu = {
                idpostu:this.aprobadolist.idpostu,
                estadopostu:this.aprobadolist.estadosel,
                tiempobene:cantperiodos,
                observacionbene:observacion
              };
              this.$convoBuscada.cupo = this.$convoBuscada.cupo -1;
              this.convoActualizado={
                idconvo:this.$convoBuscada.consecutivo_convocatoria,
                cupos:this.$convoBuscada.cupo
              };

              this.serviceviewconvocatoria.actualizarEstadoPostulacion(this.updatePostu).subscribe
              (res=>{ 
                let dialogRef = this.dialog.openDialogs[1];
                dialogRef.close();
                this.loadingcc = false;
                for (var i = 0; i < this.$postuByIdArray.length; i++) {
                  if(this.$postuByIdArray[i].consecutivo_postulacion == idPostu){
                    this.$postuByIdArray[i].estado_postulacion = this.updatePostu.estadopostu;
                  }
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
                Swal.fire({
                  title: 'Exitoso',
                  text: 'Actualizado exitosamente.',
                  icon: 'success'
                }); 
                
              },(err)=>{console.log('ERROR: ' + err.error.text);this.loadingcc = false;
            });
              //Actualizar Convocatoria

              this.serviceviewconvocatoria.actualizarCuposConvo(this.convoActualizado).subscribe
              (res=>{console.log(res);},(err)=>{
              });

            
            }else{
              this.loadingcc = false;
              Swal.close();
            }
          });
        } else if(estadoseleccionado == 'Rechazado'){
            Swal.fire({
              title: '¿Terminaste de revisar los documentos?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: "Si, he terminado de revisar.",
              cancelButtonText: "Aún no he terminado.",
              allowOutsideClick: false,
            }).then(result=>{
              if(result.value){
                Swal.fire({
                  title: 'Cargando...',
                  allowOutsideClick: false,
                });
                Swal.showLoading();
                  this.updatePostu = {
                    idpostu:this.aprobadolist.idpostu,
                    estadopostu:this.aprobadolist.estadosel,
                    tiempobene:cantperiodos,
                    observacionbene:observacion
                  };
                  this.serviceviewconvocatoria.actualizarEstadoPostulacion(this.updatePostu).subscribe
                  (res=>{  
                    let dialogRef = this.dialog.openDialogs[1];
                    dialogRef.close();                    
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
                  Swal.fire({
                    title: 'Exitoso',
                    text: 'Actualizado exitosamente.',
                    icon: 'success'
                  }); 
                  },(err)=>{console.log('ERROR: ' + err.error.text);this.loadingcc = false;
                });


              
              }else{
                Swal.close();
              }
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
            Swal.fire({
              title: 'Exitoso',
              text: 'Actualizado exitosamente.',
              icon: 'success'
            }); 
          },(err)=>{console.log('ERROR: ' + err.error.text);this.loadingcc = false;
        });
        }else if(estadoseleccionado == 'Visita'){
            Swal.fire({
              title: '¿Terminaste de realizar la entrevista?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: "Si, he terminado de realizarla.",
              cancelButtonText: "Aún no he terminado.",
              allowOutsideClick: false,
            }).then(result=>{
              if(result.value){
                Swal.fire({
                  title: 'Cargando...',
                  allowOutsideClick: false,
                });
                Swal.showLoading();
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
                Swal.fire({
                  title: 'Exitoso',
                  text: 'Actualizado exitosamente.',
                  icon: 'success'
                }); 
                },(err)=>{console.log('ERROR: ' + err.error.text);this.loadingcc = false;
              });
              }else{
                this.loadingcc = false;
                Swal.close();
              }
            });
        }else if(estadoseleccionado == 'Aprobado'){

          Swal.fire({
            title: '¿Terminaste de realizar la entrevista?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Si, he terminado de realizarla.",
            cancelButtonText: "Aún no he terminado.",
            allowOutsideClick: false,
          }).then(result=>{
            if(result.value){
                Swal.fire({
                  title: 'Cargando...',
                  allowOutsideClick: false,
                });
                Swal.showLoading();
              this.updatePostu = {
                idpostu:this.aprobadolist.idpostu,
                estadopostu:this.aprobadolist.estadosel,
                tiempobene:cantperiodos,
                observacionbene:observacion
              };
              this.$convoBuscada.cupo = this.$convoBuscada.cupo -1;
              this.convoActualizado={
                idconvo:this.$convoBuscada.consecutivo_convocatoria,
                cupos:this.$convoBuscada.cupo
              };

              this.serviceviewconvocatoria.actualizarEstadoPostulacion(this.updatePostu).subscribe
              (res=>{ 
                let dialogRef = this.dialog.openDialogs[1];
                dialogRef.close();                
                this.loadingcc = false;
                for (var i = 0; i < this.$postuByIdArray.length; i++) {
                  if(this.$postuByIdArray[i].consecutivo_postulacion == idPostu){
                    this.$postuByIdArray[i].estado_postulacion = this.updatePostu.estadopostu;
                  }
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
                Swal.fire({
                  title: 'Exitoso',
                  text: 'Actualizado exitosamente.',
                  icon: 'success'
                }); 
                
              },(err)=>{console.log('ERROR: ' + err.error.text);this.loadingcc = false;
            });
              //Actualizar Convocatoria

              this.serviceviewconvocatoria.actualizarCuposConvo(this.convoActualizado).subscribe
              (res=>{console.log(res);},(err)=>{
              });
            }else{
              this.loadingcc = false;
              Swal.close();
            }
          });
        }else if(estadoseleccionado == 'Rechazado'){

            Swal.fire({
              title: '¿Terminaste de realizar la entrevista?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: "Si, he terminado de realizarla.",
              cancelButtonText: "Aún no he terminado.",
              allowOutsideClick: false,
            }).then(result=>{
              if(result.value){
                Swal.fire({
                  title: 'Cargando...',
                  allowOutsideClick: false,
                });
                Swal.showLoading();
                this.updatePostu = {
                  idpostu:this.aprobadolist.idpostu,
                  estadopostu:this.aprobadolist.estadosel,
                  tiempobene:cantperiodos,
                  observacionbene:observacion
                };
                this.serviceviewconvocatoria.actualizarEstadoPostulacion(this.updatePostu).subscribe
                (res=>{  
                  let dialogRef = this.dialog.openDialogs[1];
                  dialogRef.close();                  
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
                  Swal.fire({
                  title: 'Exitoso',
                  text: 'Actualizado exitosamente.',
                  icon: 'success'
                }); 
                },(err)=>{console.log('ERROR: ' + err.error.text);this.loadingcc = false;
              });
              }else{
                this.loadingcc = false;
                Swal.close();
              }
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
            Swal.fire({
              title: 'Exitoso',
              text: 'Actualizado exitosamente.',
              icon: 'success'
            }); 
          },(err)=>{console.log('ERROR: ' + err.error.text);this.loadingcc = false;
        });
        }else if(estadoseleccionado == 'Aprobado'){

          Swal.fire({
            title: '¿Terminaste de realizar la visita domiciliaria?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Si, he terminado de realizarla.",
            cancelButtonText: "Aún no he terminado.",
            allowOutsideClick: false,
          }).then(result=>{
            if(result.value){
                Swal.fire({
                  title: 'Cargando...',
                  allowOutsideClick: false,
                });
                Swal.showLoading();
                this.updatePostu = {
                  idpostu:this.aprobadolist.idpostu,
                  estadopostu:this.aprobadolist.estadosel,
                  tiempobene:cantperiodos,
                  observacionbene:observacion
                };
                this.$convoBuscada.cupo = this.$convoBuscada.cupo -1;
                this.convoActualizado={
                  idconvo:this.$convoBuscada.consecutivo_convocatoria,
                  cupos:this.$convoBuscada.cupo
                };

                this.serviceviewconvocatoria.actualizarEstadoPostulacion(this.updatePostu).subscribe
                (res=>{ 
                let dialogRef = this.dialog.openDialogs[1];
                dialogRef.close();                  
                  this.loadingcc = false;
                  for (var i = 0; i < this.$postuByIdArray.length; i++) {
                    if(this.$postuByIdArray[i].consecutivo_postulacion == idPostu){
                      this.$postuByIdArray[i].estado_postulacion = this.updatePostu.estadopostu;
                    }
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
                  Swal.fire({
                    title: 'Exitoso',
                    text: 'Actualizado exitosamente.',
                    icon: 'success'
                  }); 
                  
                },(err)=>{console.log('ERROR: ' + err.error.text);this.loadingcc = false;
              });
                //Actualizar Convocatoria

                this.serviceviewconvocatoria.actualizarCuposConvo(this.convoActualizado).subscribe
                (res=>{console.log(res);},(err)=>{
                });
            }else{
              this.loadingcc = false;
              Swal.close();
            }
          });
        }else if(estadoseleccionado == 'Rechazado'){
            Swal.fire({
              title: '¿Terminaste de realizar la visita domiciliaria?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: "Si, he terminado de realizarla.",
              cancelButtonText: "Aún no he terminado.",
              allowOutsideClick: false,
            }).then(result=>{
              if(result.value){
                Swal.fire({
                  title: 'Cargando...',
                  allowOutsideClick: false,
                });
                Swal.showLoading();
                  this.updatePostu = {
                    idpostu:this.aprobadolist.idpostu,
                    estadopostu:this.aprobadolist.estadosel,
                    tiempobene:cantperiodos,
                    observacionbene:observacion
                  };
                          this.serviceviewconvocatoria.actualizarEstadoPostulacion(this.updatePostu).subscribe
                          (res=>{  
                            let dialogRef = this.dialog.openDialogs[1];
                            dialogRef.close();                            
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
                            Swal.fire({
                            title: 'Exitoso',
                            text: 'Actualizado exitosamente.',
                            icon: 'success'
                          }); 
                          },(err)=>{console.log('ERROR: ' + err.error.text);this.loadingcc = false;
                        });

              }else{
                this.loadingcc = false;
                Swal.close();
              }
            });
        }
      }else if(estadopostulacionactual == 'Aprobado'){
          if(estadoseleccionado == 'Visita'){
                        this.updatePostu = {
              idpostu:idPostu,
              estadopostu: estadoseleccionado
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
              Swal.fire({
              title: 'Exitoso',
              text: 'Actualizado exitosamente.',
              icon: 'success'
            }); 
            },(err)=>{console.log('ERROR: ' + err.error.text);this.loadingcc = false;
          });
            //Actualizar Convocatoria

            this.serviceviewconvocatoria.actualizarCuposConvo(this.convoActualizado).subscribe
            (res=>{},(err)=>{
              console.log('ERROR: ' + err.error.text);
            });
          }else if(estadoseleccionado == 'Rechazado'){
              this.updatePostu = {
                idpostu:this.aprobadolist.idpostu,
                estadopostu:this.aprobadolist.estadosel,
                tiempobene:cantperiodos,
                observacionbene:observacion
              };
            this.$convoBuscada.cupo = this.$convoBuscada.cupo +1;
            this.convoActualizado={
              idconvo:this.$convoBuscada.consecutivo_convocatoria,
              cupos:this.$convoBuscada.cupo
            };

            this.serviceviewconvocatoria.actualizarEstadoPostulacion(this.updatePostu).subscribe
            (res =>{ 
                let dialogRef = this.dialog.openDialogs[1];
                dialogRef.close();              
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
              Swal.fire({
              title: 'Exitoso',
              text: 'Actualizado exitosamente.',
              icon: 'success'
            }); 
            },(err) => {
              console.log('ERROR: ' + err.error.text); this.loadingcc = false;
            });
          }
       }else if(estadopostulacionactual == 'Rechazado'){
          if(estadoseleccionado == 'Aprobado'){
                //     // Actualizar el estado postulacion
              this.updatePostu = {
                idpostu:this.aprobadolist.idpostu,
                estadopostu:this.aprobadolist.estadosel,
                tiempobene:cantperiodos,
                observacionbene:observacion
              };
              this.$convoBuscada.cupo = this.$convoBuscada.cupo -1;
              this.convoActualizado={
                idconvo:this.$convoBuscada.consecutivo_convocatoria,
                cupos:this.$convoBuscada.cupo
              };

              this.serviceviewconvocatoria.actualizarEstadoPostulacion(this.updatePostu).subscribe
              (res=>{ 
                let dialogRef = this.dialog.openDialogs[1];
                dialogRef.close();                
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
                Swal.fire({
              title: 'Exitoso',
              text: 'Actualizado exitosamente.',
              icon: 'success'
            }); 
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
              Swal.fire({
              title: 'Exitoso',
              text: 'Actualizado exitosamente.',
              icon: 'success'
            }); 
            },(err)=>{console.log('ERROR: ' + err.error.text);this.loadingcc = false;
          });
          }
        }
      
    }
      exportAsXLSX2():void {
    this.excelService.exportToExcel(this.postulacionesest,'ReportePostulacionesEstudiante'); }

  downloadPDF(docsel:any,nombrefile:any){
    var obj = document.createElement('a'); 
    obj.type = 'application/pdf';
    obj.href = 'data:application/pdf;base64,' + docsel;
    obj.download = nombrefile+ ".pdf";
    obj.click();
  }

  exportAsXLSX():void {
    this.excelService.exportToExcel(this.$postuByIdArray,'ReporteTickets');
    }
    applyExportarFiltrado() {
      this.excelService.exportToExcel(this.dataSource.filteredData, "PostulacionesFiltrados");
    /*const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();*/
    }
  applyFilter(event){
    this.dataSource.filter = event.trim().toLowerCase();
  }
  }