import { Component, OnInit } from '@angular/core';
import {RegistrarConvoServiceService} from './registrar-convo-service.service';
import {DocumentoService} from '../../../services/documento.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registrar-convocatoria',
  templateUrl: './registrar-convocatoria.component.html',
  styleUrls: ['./registrar-convocatoria.component.css']
})
export class RegistrarConvocatoriaComponent implements OnInit {
  convocatoriaBeca: any;
  registroConvo:any[]=[];
  convocatoriaPeriodo: any;
  convocatoriaRegistrar={};
  formNewDoc=false;
  documentoscheckbox:any;
  docssel=[];
  nomvacio=false;
  success:any;
  isChecked=false;
  //Documentos beca alimenticia
  public documentoest=false;
  public documentoacu=false;
  public pagomatricula=false;
  public facturaserv=false;
  public tab=false;
  public certingresos=false;
  public formsolicitud=false;
  public carta=false;
  public vecindad=false;
  //documentos apoyo socioeconomico
  public constancia=false;
  public promacumulado=false;
  //documentos monitoria
  public diagnosticomed=false;
  public formatod10=false;
  //bono estudiantil
  public documentopadre=false;
  public documentomadre=false;
  public carnet=false;

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

  constructor(private serviceConvocatoria:RegistrarConvoServiceService,
    public dialog: MatDialog,
    private router:Router,
    public documentoService:DocumentoService) { 
    this.buscarBeca();
    this.buscarPeriodo();
    this.buscarDocumentos();
    this.formularioConvocatoria = new FormGroup({
      beca: new FormControl('',Validators.required),
      estadoConvocatoria: new FormControl('',Validators.required),
      fechaInicial: new FormControl('',Validators.required),
      fechaFin: new FormControl('',Validators.required),
      cupos: new FormControl('',Validators.required),
    });
  }
  ngOnInit(): void {

  }
  activateDocNew(){
    if(this.formNewDoc){
      this.formNewDoc = false;
      return;
    }
    this.formNewDoc = true;
  }

  NewDoc(nomdoc:any,successdoc){
    this.nomvacio = false;
    if(nomdoc == ''){
      this.nomvacio = true;
      return;
    }
    this.documentoService.nuevoDocumento(nomdoc).subscribe(result=>{
      Swal.fire({
        title: 'Exitoso',
        text: 'Registrado exitosamente.',
        icon: 'success'
      });
      this.buscarDocumentos();
    },(errr)=>{
      console.log(errr);
    });
  }
  public hasError = (controlName: string, errorName: string) =>{
    return this.formularioConvocatoria.controls[controlName].hasError(errorName);
  }
  agregarDoc(event){
    console.log("LE DI AL CHECKBOX");
    var encontrado = false;
    var posencontrado = 0;
    for (var i = 0; i < this.docssel.length; i++) {
      if(this.docssel[i] == event){
        encontrado = true;
        posencontrado = i;
      }
    }
    if(!encontrado){
      this.docssel.push(event);
    }else{
      this.docssel.splice(posencontrado,1);
    }
    
    console.log(this.docssel);
  }
  buscarBeca(){
    this.serviceConvocatoria.buscarListadoBecas().subscribe(convocatoriaBeca=>{
      this.convocatoriaBeca = convocatoriaBeca;
    });
  }
  buscarDocumentos(){
    this.documentoService.listDocumentosSelect().subscribe(result=>{
      this.documentoscheckbox = result;
    });
  }
  buscarPeriodo(){
    this.serviceConvocatoria.buscarListadoPeriodos().subscribe(convocatoriaPeriodo=>{
      this.convocatoriaPeriodo = convocatoriaPeriodo;
    });
  }

  registrarConvocatoria(fechainicial:any,fechafinal:any,becas:any,cupos:any,estadoconvocatoria:any,
    asuntocorreo:any,contenidocorreo:any,templateRef){
      Swal.fire({
        title: 'Cargando...',
        allowOutsideClick: false,
      });
      Swal.showLoading();

    if(this.opcion){
      if(this.docssel.length == 0){
        this.convocatoriaRegistrar= {fechainicio:fechainicial,
          fechafin:fechafinal,
          becas:becas,
          cupo:cupos,
          periodo:this.convocatoriaPeriodo[0].consecutivo_periodo,
          estadoconvocatoria:estadoconvocatoria,
          enviarCorreo:true,
          asuntocorreo:asuntocorreo,
          contenidocorreo:contenidocorreo,
          documentossel : this.docssel   
        };
      }else{
        this.convocatoriaRegistrar= {fechainicio:fechainicial,
          fechafin:fechafinal,
          becas:becas,
          cupo:cupos,
          periodo:this.convocatoriaPeriodo[0].consecutivo_periodo,
          estadoconvocatoria:estadoconvocatoria,
          enviarCorreo:true,
          asuntocorreo:asuntocorreo,
          contenidocorreo:contenidocorreo, 
          documentossel : this.docssel
        };
      }
    }else{
      if(this.docssel.length == 0){
        this.convocatoriaRegistrar= {fechainicio:fechainicial,
          fechafin:fechafinal,
          becas:becas,
          cupo:cupos,
          periodo:this.convocatoriaPeriodo[0].consecutivo_periodo,
          estadoconvocatoria:estadoconvocatoria,
          enviarCorreo:false,
          asuntocorreo:'',
          contenidocorreo:'',
          documentossel : this.docssel   
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
          documentossel : this.docssel
        };
      }

    }
    this.serviceConvocatoria.buscarListadoConvocatorias(this.convocatoriaPeriodo[0].consecutivo_periodo,becas).subscribe(result=>{
      Swal.fire({
        title: 'ERROR',
        text: 'Ya existe esta beca para el periodo academico',
        icon: 'error'
      });
  },(err)=>{
    console.log(err.error.text);
    //console.log(this.convocatoriaRegistrar);
    this.serviceConvocatoria.registrarConvocatoria(this.convocatoriaRegistrar).subscribe(res =>{
      Swal.fire({
        title: 'Exitoso',
        text: 'Registrado exitosamente.',
        icon: 'success'
      });
      setTimeout(() =>{
        this.router.navigate(['/listarConvocatoria']);
      },1000);
      
    },(err)=>{
      console.log("Fallo: "+err.error.text);
      Swal.fire({
        title: 'ERROR',
        text: 'Error al registrar la convocatoria, ERROR: ' + err.error,
        icon: 'error'
      });
    });
  });
  }
}
