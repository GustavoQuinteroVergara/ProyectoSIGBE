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
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {RegistrarConvoServiceService} from '../registrar-convocatoria/registrar-convo-service.service';
import {Router } from '@angular/router';
import {ExporterService} from '../../../services/exporter.service';
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import Swal from 'sweetalert2';
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
  visitarListar:any;
  nuevoarreglo:any;
  dataSource: MatTableDataSource<any>;
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
    displayedColumns: string[] = ['estudiante.nombreestudiante', 
    'codigoestudiante', 'estrato', 
    'promedio','fechapostulacion',
    'semestre','carrera','estado_postulacion','Acciones'];
    success:any;
    convocatoriaBeca: any;
    activeForm=false;
    convocatoriaPeriodo: any;
    activeButton=false;
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
    doc.text("26     03      2021",158,50,align);
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
    switch (visitaAListar.cubrearriendo) {
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
    switch (visitaAListar.serviciopublico) {
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
    doc.text("ALEJANDRO OSPINA ESCOBAR",47,55);
    doc.text("1763834",25,60);
    doc.text("2711",90,60);
    doc.text("PALMIRA - VALLE DEL CAUCA",50,66);
    doc.text("03/25/1997",135,66);
    doc.text("1113678888",48,71);
    doc.text("03/25/1997",140,71);
    doc.setFont("helvetica","bold");
    doc.text("X",56,76);
    doc.text("X",79,76);
    doc.text("X",98,76);
    doc.text("X",129,77);
    doc.text("X",158,77);

    //SITUACION ECONOMICA 
    doc.setFont("helvetica","normal");
    doc.text("10",30,81);

    doc.text("PALMIRA",55,99);
    doc.text("CALLE LUNA CALLE SOL",130,99);
    doc.text("PARAISO",25,103);
    doc.text("12323254",130,103);
    doc.text("CALLE SOL CALLE LUNA",43,107);
    doc.text("PORVENIR",130,107);

    doc.text("5465451",45,111);

    //RESIDE CON
    doc.setFont("helvetica","bold");
    doc.text("X",80,128);
    doc.text("X",80,132);
    doc.text("X",80,136);
    doc.text("X",80,140);
    doc.text("X",80,144);

    doc.text("X",176,128);
    doc.text("X",176,132);
    doc.text("X",176,136);
    doc.text("X",176,140);

    //FUENTES DE INGRESO
    doc.setFontSize(20);
    doc.text("X",65,173);
    doc.text("X",65,181);
    doc.text("X",65,189);
    doc.text("X",65,199);
    doc.text("X",65,207);

    doc.text("X",105,173);
    doc.text("X",105,181);
    doc.text("X",105,189);
    doc.text("X",105,199);
    doc.text("X",105,207);

    doc.text("X",143,173);
    doc.text("X",143,181);
    doc.text("X",143,189);
    doc.text("X",143,199);
    doc.text("X",143,207);

    doc.text("X",180,173);
    doc.text("X",180,181);
    doc.text("X",180,189);
    doc.text("X",180,199);
    doc.text("X",180,207);

    doc.setFontSize(10);
    //TRABAJA?
    doc.text("X",44,216);
    doc.text("X",74,216);

    //INFO Trabajo
    doc.setFont("helvetica","normal");
    doc.text("GERENTE GENERAL",64,220);
    doc.text("EMPRESA TAPITA S.A",64,225);
    doc.text("2 AÑOS",40,229);
    doc.text("PALMIRA",25,233);
    doc.text("CALLE LUNA CALLE SOL",82,233);
    doc.text("22222222",170,233);

    //VALOR TOTAL DE INGRESOS
    doc.text("1500000",50,245);





    // FIN PAGINA 1

    // PAGINA 2
    doc.addPage();
    doc.addImage(img2,'jpg',0,0,width,height);

    //bachillerato
    doc.text("INSTITUCIÓN EDUCATIVA SAGRADA FAMILIA",35,64);
    doc.text("2014",140,64);

    doc.text("PALMIRA VALLE DEL CAUCA",40,69);
    doc.text("COLOMBIA",140,68);

    doc.text("192",48,73);
    doc.text("2016",140,73);


    doc.setFont("helvetica","bold");
    doc.text("X",38,81);
    doc.text("X",129,81);


    doc.setFont("helvetica","normal");
    //valor matricula
    doc.text("150000",55,98);
    doc.text("2900000",140,98);

    //INFO FAMILIA TABLA 1
    doc.text("X",40,130);
    doc.text("X",40,140);
    doc.text("X",40,150);
    doc.text("X",40,160);
    doc.text("X",40,170);
    doc.text("X",40,180);

    doc.text("X",65,130);
    doc.text("X",65,140);
    doc.text("X",65,150);
    doc.text("X",65,160);
    doc.text("X",65,170);
    doc.text("X",65,180);

    doc.text("X",95,130);
    doc.text("X",95,140);
    doc.text("X",95,150);
    doc.text("X",95,160);
    doc.text("X",95,170);
    doc.text("X",95,180);

    doc.text("X",135,130);
    doc.text("X",135,140);
    doc.text("X",135,150);
    doc.text("X",135,160);
    doc.text("X",135,170);
    doc.text("X",135,180);


    doc.text("X",175,130);
    doc.text("X",175,140);
    doc.text("X",175,150);
    doc.text("X",175,160);
    doc.text("X",175,170);
    doc.text("X",175,180);

    //INFO TABLA 2
    doc.text("X",40,205);
    doc.text("X",40,215);
    doc.text("X",40,225);
    doc.text("X",40,235);
    doc.text("X",40,245);
    doc.text("X",40,255);

    doc.text("X",80,205);
    doc.text("X",80,215);
    doc.text("X",80,225);
    doc.text("X",80,235);
    doc.text("X",80,245);
    doc.text("X",80,255);

    doc.text("X",120,205);
    doc.text("X",120,215);
    doc.text("X",120,225);
    doc.text("X",120,235);
    doc.text("X",120,245);
    doc.text("X",120,255);

    doc.text("X",153,205);
    doc.text("X",153,215);
    doc.text("X",153,225);
    doc.text("X",153,235);
    doc.text("X",153,245);
    doc.text("X",153,255);

    doc.text("X",185,205);
    doc.text("X",185,215);
    doc.text("X",185,225);
    doc.text("X",185,235);
    doc.text("X",185,245);
    doc.text("X",185,255);

    // FIN PAGINA 2


    //PAGINA 3
    doc.addPage();
    doc.addImage(img3,'jpg',0,0,width,height);
    doc.setFontSize(10);
    doc.setFont("helvetica","bold");

    doc.text("X",19,59);
    doc.text("X",66,59);
    doc.text("X",113,59);
    doc.text("X",150,60);

    //amortizacion
    doc.setFont("helvetica","normal");
    doc.text("11111111",71,67);
    doc.text("22222222",177,67);

    doc.text("X",55,87);
    doc.text("X",55,92);
    doc.text("X",55,96);
    doc.text("X",55,100);
    doc.text("X",55,104);
    doc.text("X",55,109);

    doc.text("X",159,87);
    doc.text("X",159,92);
    doc.text("X",159,96);
    doc.text("X",159,100);
    doc.text("X",159,104);
    doc.text("X",159,109);

    doc.text("333333333",145,116);

    doc.text("X",7,136);
    doc.text("X",7,141);
    doc.text("X",7,145);
    doc.text("X",7,149);
    doc.text("X",7,153);
    doc.text("X",7,157);
    doc.text("X",7,161);
    doc.text("X",7,166);
    doc.text("X",7,170);
    doc.text("X",7,174);

    doc.text("EMPRESA TAPITA S.A",30,187);
    doc.text("123545465",160,187);
    doc.text("GENERENTE DE PROYECTOS",40,191);
    doc.text("CALLE LUNA CALLE SOL",50,195);
    doc.text("PALMIRA VALLE",30,199);
    doc.text("221121212",145,199);


    //observaciones
    var splitText = doc.splitTextToSize("asdfasdfadsffdsafdsafdsafdsafsadfdsafdsafdsafdsafdsaaffdsdsafafdsfdsafsadfdsafdsafdsadsafdsafdsafdsafdsafdsafdsafdsafdsafdsafdsafdsafdsafdsadsafdsafdsaf",180);
    doc.text(splitText,10,215);


    doc.text("25/03/2021",145,265);

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
       width: '1024px',
    });
  }

  verEntrevistaModal(entrevistaPostu){
    let dialogRef = this.dialog.open( entrevistaPostu,{
       height: '500px',
       width: '1024px',
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
      //console.log('ERROR: ' + err.error.text);
      
    }); }
  verPostuSel(idpostu:any, estado_postu:any, postu:any ,templatePostu){
    this.postuseltable = postu;
    this.observacion = this.postuseltable.coments;
    this.getDocumntosPostu(idpostu);
    this.getVisitaPostu(idpostu);
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



  

