import { Component, OnInit } from '@angular/core';
import {RegistrarConvoServiceService} from './registrar-convo-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-registrar-convocatoria',
  templateUrl: './registrar-convocatoria.component.html',
  styleUrls: ['./registrar-convocatoria.component.css']
})
export class RegistrarConvocatoriaComponent implements OnInit {
  convocatoriaBeca: any;
  registroConvo:any[]=[];
  convocatoriaPeriodo: any;
  convocatoriaRegistrar:any;
  success:any;
  isChecked=false;
  //Documentos beca alimenticia
  documentoest=false;
  documentoacu=false;
  pagomatricula=false;
  facturaserv=false;
  tab=false;
  certingresos=false;
  formsolicitud=false;
  carta=false;
  vecindad=false;
  //documentos apoyo socioeconomico
  constancia=false;
  promacumulado=false;
  //documentos monitoria
  diagnosticomed=false;
  formatod10=false;
  //bono estudiantil
  documentopadre=false;
  documentomadre=false;
  carnet=false;

  public formularioConvocatoria: FormGroup;
  
  public disabled = false;
  public showSpinners = false;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  opcion=false;
  fotocopia=false;
  asuntocorreo:any;
  contenidocorreo:any;
  
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';

  public formGroup = new FormGroup({
    date: new FormControl(null, [Validators.required]),
    date2: new FormControl(null, [Validators.required])
  })
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

  constructor(private serviceConvocatoria:RegistrarConvoServiceService,public dialog: MatDialog) { 
    this.buscarBeca();
    this.buscarPeriodo();
  }
  ngOnInit(): void {
    this.formularioConvocatoria = new FormGroup({
      beca: new FormControl('',Validators.required),
      estadoConvocatoria: new FormControl('',Validators.required),
      fechaInicial: new FormControl('',Validators.required),
      cupos: new FormControl('',Validators.required),
    });
  }
  public hasError = (controlName: string, errorName: string) =>{
    return this.formularioConvocatoria.controls[controlName].hasError(errorName);
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

  registrarConvocatoria(fechainicial:any,fechafinal:any,becas:any,cupos:any,estadoconvocatoria:any,
    asuntocorreo:any,contenidocorreo:any,
    d10:any,factserv:any,cartapeti:any,carnetest:any,cedulapadre:any,cedulamadre:any,
    promedio:any,tabulado:any,constanciaweb:any,certificadovencidad:any,documentoidenti:boolean,
    documentoacudiente:any,formatosolicitud:any,diagnostico:any,recibomatricula:any,
    certificadoingresos:any,templateRef){

    if(this.opcion){
      this.convocatoriaRegistrar= {fechainicio:fechainicial,
        fechafin:fechafinal,
        becas:becas,
        cupo:cupos,
        periodo:this.convocatoriaPeriodo[0].consecutivo_periodo,
        estadoconvocatoria:estadoconvocatoria,
        enviarCorreo:false,
        asuntocorreo:asuntocorreo,
        contenidocorreo:contenidocorreo,
        d10:this.formatod10,
        factserv:this.facturaserv,
        cartapeti:this.carta,
        carnetest:this.carnet,
        cedulapadre:this.documentopadre,
        cedulamadre:this.documentomadre,
        promedio:this.promacumulado,
        tabulado:this.tab,
        constanciaweb:this.constancia,
        certificadovencidad:this.vecindad,
        documentoidenti:this.documentoest,
        documentoacudiente:this.documentoacu,
        formatosolicitud:this.formsolicitud,
        diagnostico:this.diagnosticomed,
        recibomatricula:this.pagomatricula,
        certificadoingresos:this.certingresos        
      };
    }else{
      this.convocatoriaRegistrar= {fechainicio:fechainicial,
        fechafin:fechafinal,
        becas:becas,
        cupo:cupos,
        periodo:this.convocatoriaPeriodo[0].consecutivo_periodo,
        estadoconvocatoria:estadoconvocatoria,
        enviarCorreo:false,
        asuntocorreo:'',
        contenidocorreo:'',
        d10:this.formatod10,
        factserv:this.facturaserv,
        cartapeti:this.carta,
        carnetest:this.carnet,
        cedulapadre:this.documentopadre,
        cedulamadre:this.documentomadre,
        promedio:this.promacumulado,
        tabulado:this.tab,
        constanciaweb:this.constancia,
        certificadovencidad:this.vecindad,
        documentoidenti:this.documentoest,
        documentoacudiente:this.documentoacu,
        formatosolicitud:this.formsolicitud,
        diagnostico:this.diagnosticomed,
        recibomatricula:this.pagomatricula,
        certificadoingresos:this.certingresos        
      };
    }
    this.serviceConvocatoria.registrarConvocatoria(this.convocatoriaRegistrar).subscribe(res =>{
      this.success = true;
      let dialogRef = this.dialog.open( templateRef,{
       height: '200px',
       width: '200px',
     });
      console.log(res);
    },(err)=>{
      this.success = false;
      let dialogRef = this.dialog.open( templateRef,{
       height: '200px',
       width: '200px',
     });
      console.log(err);
    });

    console.log(this.convocatoriaRegistrar);

  }

  setAll(completed: boolean){
    if(this.opcion){
      this.opcion = false;
    }else{
      this.opcion = true;
    }
    

  }
  
  setAllDocumentoEstudiante(completed:boolean){
    if(this.documentoest){
      this.documentoest=false;
    }else{
     this.documentoest=true;     
    }
  }

  documentoAcudiente(completed:boolean){
    if(this.documentoacu){
      this.documentoacu=false;
    }else{
      this.documentoacu=true;     
    }
  }
  pagoMat(completed:boolean){
    if(this.pagomatricula){
      this.pagomatricula=false;
    }else{
      this.pagomatricula=true;     
    }
  }
  reciboPublico(completed:boolean){
    if(this.facturaserv){
      this.facturaserv=false;
    }else{
      this.facturaserv=true;     
    }
  }
  documentoTabulado(completed:boolean){
    if(this.tab){
      this.tab=false;
    }else{
      this.tab=true;     
    }
  }
  ingresosRetenciones(completed:boolean){
    if(this.certingresos){
      this.certingresos=false;
    }else{
      this.certingresos=true;     
    }
  }
  soliSubsidio(completed:boolean){
    if(this.formsolicitud){
      this.formsolicitud=false;
    }else{
      this.formsolicitud=true;     
    }
  }
  soliBecaAlimentacion(completed:boolean){
    if(this.carta){
      this.carta=false;
    }else{
      this.carta=true;     
    }
  }
  declaracionVecindad(completed:boolean){
    if(this.vecindad){
      this.vecindad=false;
    }else{
      this.vecindad=true;     
    }
  }
  constaciaWeb(completed:boolean){
    if(this.constancia){
      this.constancia=false;
    }else{
      this.constancia=true;     
    }
  }
  promAcumulado(completed:boolean){
    if(this.promacumulado){
      this.promacumulado=false;
    }else{
      this.promacumulado=true;     
    }
  }
  diagnosticoMedico(completed:boolean){
    if(this.diagnosticomed){
      this.diagnosticomed=false;
    }else{
      this.diagnosticomed=true;     
    }
  }
  documentoD10(completed:boolean){
    if(this.formatod10){
      this.formatod10=false;
    }else{
      this.formatod10=true;     
    }
  }
  documentoPadre(completed:boolean){
    if(this.documentopadre){
      this.documentopadre=false;
    }else{
      this.documentopadre=true;     
    }
  }
  documentoMadre(completed:boolean){
    if(  this.documentomadre){
      this.documentomadre=false;
    }else{
      this.documentomadre=true;     
    }
  }
  carnetEstudiantil(completed:boolean){
    if(this.carnet){
      this.carnet=false;
    }else{
      this.carnet=true;     
    }
  }



  checkValue(event: any){
    console.log(event);
 }
}
