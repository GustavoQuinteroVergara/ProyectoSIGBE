import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute, Params } from '@angular/router';
import {DocumentoService} from '../../../services/documento.service';
import {VisitadomiciliariaService} from '../../../services/visitadomiciliaria.service';
import {ServicesViewConvocatoriaService} from '../../convocatoria/view-convocatoria/services-view-convocatoria.service';
import { MatDialog } from '@angular/material/dialog';
import {RegistrarvisitaService} from './registrarvisita.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-visitadomiciliaria',
  templateUrl: './visitadomiciliaria.component.html',
  styleUrls: ['./visitadomiciliaria.component.css']
})
export class VisitadomiciliariaComponent implements OnInit {

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
  estadopostusel:any;
  postuseltable:any;
  visitaPostuFound:any;
  documentosFoundpostu:any;
  entrevistaPostuFound:any;
  visitavalidate=false;
  entrevistvalidate=false;
  $nombreusuario= JSON.parse(localStorage.getItem('currentUser'));


  isLinear = false;
  hidden: string = 'false';
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  visitaDomiciliaria:any;
  success:any;
  postulacionid:any;
  estamento:any;
  codigo:any;
  cedula:any;
  telefono:any;
  celular:any;
  direccion:any;
  barrio:any;
  comuna:any;
  nombreatencion:any;
  parentesco:any;
  obligacion:any;
  cualobligacion='';
  estratodane:any;
  pagoarriendo='';
  valorarriendo='';
  checkboxarriendo=[{selected:false, label:'Cocina'},{selected:false,label:'Alimentación'}];
  checkboxservicios=[{selected:false, label:'Agua'},
                     {selected:false,label:'Energía'},
                     {selected:false,label:'Alcantarillado'},
                     {selected:false,label:'Teléfono'},  
                     {selected:false,label:'Gas Domiciliario'}                                                             
                    ];
  cubrearriendo='-';
  otroarriendo='';
  fuenteingreso:any;
  cualfuente='';
  tipocasa:any;
  aspectocasa:any;
  cualaspecto='';
  serviciopublico:any;
  cuartosolicitante:any;
  cantidadpersonas='';
  idPostuSel:any;
  idConvo:any;
  descripcionfinal:any;
  constructor(private _formBuilder: FormBuilder,
    private rutaActiva: ActivatedRoute,
    private serviceVisita:RegistrarvisitaService,
    private router:Router,
    private serviceviewconvocatoria:ServicesViewConvocatoriaService,
    private documentosService:DocumentoService,
    private visitadomiciliariaService:VisitadomiciliariaService,
    public dialog: MatDialog) {
    dialog.closeAll();
    this.idPostuSel = this.rutaActiva.snapshot.params.idPostu;
    this.idConvo = this.rutaActiva.snapshot.params.idConvo;
    this.getPostu(this.idPostuSel);

  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
        postulacionid: new FormControl(this.idPostuSel, Validators.required),
        apellido: new FormControl('', Validators.required),
        codigo: new FormControl('', Validators.required),
        cedula: new FormControl('', Validators.required),
        telefono: new FormControl('', Validators.required),
        celular: new FormControl('', Validators.required),
        direccion: new FormControl('', Validators.required),
        barrio: new FormControl('', Validators.required),
        comuna: new FormControl('', Validators.required),
    });
    this.secondFormGroup = this._formBuilder.group({
      nombreatencion: new FormControl('', [Validators.required]),
        parentesco: new FormControl('', [Validators.required]),
        //cualobligacion: new FormControl(''),
        //valorarriendo: new FormControl('', [Validators.required]),
        //otroarriendo: new FormControl('', [Validators.required]),
        //cualfuente: new FormControl('', [Validators.required]),
    });
    this.thirdFormGroup = this._formBuilder.group({
      //cualaspecto: new FormControl('', [Validators.required]),
      //cantidadpersonas: new FormControl('', [Validators.required]),
      descripcionfinal: new FormControl('', [Validators.required])
    });
  }


  onChange(e){
    if(this.checkboxarriendo[0].selected){
      this.cubrearriendo = 'Cuarto';
      if(this.checkboxarriendo[1].selected){
        this.cubrearriendo = this.cubrearriendo + ',Alimentación';
      }
    }else if(this.checkboxarriendo[1].selected){
      this.cubrearriendo = 'Alimentación';
    }else{
      this.cubrearriendo = '';
    }
  }
  onChangeServicios(e){

    if(this.checkboxservicios[0].selected){
      this.serviciopublico = 'Agua';
      if(this.checkboxservicios[1].selected){
        this.serviciopublico = this.serviciopublico + ',Energía';
      }
      if(this.checkboxservicios[2].selected){
        this.serviciopublico = this.serviciopublico + ',Alcantarillado';
      }
      if(this.checkboxservicios[3].selected){
        this.serviciopublico = this.serviciopublico + ',Teléfono';
      }
      if(this.checkboxservicios[4].selected){
        this.serviciopublico = this.serviciopublico + ',Gas Domiciliario';
      }      
    }else if(this.checkboxservicios[1].selected){
      this.serviciopublico = 'Energía';
      if(this.checkboxservicios[2].selected){
        this.serviciopublico = this.serviciopublico + ',Alcantarillado';
      }
      if(this.checkboxservicios[3].selected){
        this.serviciopublico = this.serviciopublico + ',Teléfono';
      }
      if(this.checkboxservicios[4].selected){
        this.serviciopublico = this.serviciopublico + ',Gas Domiciliario';
      }       
    }else if(this.checkboxservicios[2].selected){
      this.serviciopublico = 'Alcantarillado';
      if(this.checkboxservicios[3].selected){
        this.serviciopublico = this.serviciopublico + ',Teléfono';
      }
      if(this.checkboxservicios[4].selected){
        this.serviciopublico = this.serviciopublico + ',Gas Domiciliario';
      } 
    }else if(this.checkboxservicios[3].selected){
      this.serviciopublico = 'Teléfono';
      if(this.checkboxservicios[4].selected){
        this.serviciopublico = this.serviciopublico + ',Gas Domiciliario';
      } 
    }else if(this.checkboxservicios[4].selected){
      this.serviciopublico = 'Gas Domiciliario';
    }else{
      this.serviciopublico = '';
    }
  }  

  registroVisita(templateRef){

    this.visitaDomiciliaria={
      postulacionid:this.idPostuSel,
      estamento:this.estamento,
      codigo:this.codigo,
      cedula:this.cedula,
      telefono:this.telefono,
      celular:this.celular,
      direccion:this.direccion,
      barrio:this.barrio,
      comuna:this.comuna,
      nombreatencion:this.nombreatencion,
      parentesco:this.parentesco,
      obligacion:this.obligacion,
      cualobligacion:this.cualobligacion,
      estratodane:this.estratodane,
      pagoarriendo:this.pagoarriendo,
      valorarriendo:this.valorarriendo,
      cubrearriendo:this.cubrearriendo,
      otroarriendo:this.otroarriendo,
      fuenteingreso:this.fuenteingreso,
      cualfuente:this.cualfuente,
      tipocasa:this.tipocasa,
      aspectocasa:this.aspectocasa,
      cualaspecto:this.cualaspecto,
      serviciopublico:this.serviciopublico,
      cuartosolicitante:this.cuartosolicitante,
      cantidadpersonas:this.cantidadpersonas,
      descripcionfinal:this.descripcionfinal
    };
    this.serviceVisita.registrarVisitaDomiciliaria(this.visitaDomiciliaria)
    .subscribe(res=>{
      Swal.fire({
        title: 'Exitoso',
        text: 'Registrado exitosamente.',
        icon: 'success'
      }); 
      setTimeout(() =>{
           this.router.navigate(['/viewConvocatoria/' + this.idConvo]);
          },1000);        
      
    },(err)=>{
      Swal.fire({
        title: 'ERROR',
        text: 'Error al Registrar, ERROR: ' + err.error.text,
        icon: 'error'
      }); 
    });
  
  }



//MODAL

  minimizar(){
    this.dialog.closeAll();
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
      this.entrevistvalidate =true;
      Swal.close();
    },(err)=>{
      console.log(err.error.text);
      this.entrevistvalidate=false;
    });
  }

    getPostu(idpostu:any){
      Swal.fire({
        title: 'Cargando',
        allowOutsideClick: false
      }); 
      Swal.showLoading();
    this.serviceviewconvocatoria.getPostuById(idpostu).subscribe(result=>{
      this.postuseltable = result;
      this.getDocumntosPostu(this.idPostuSel);
      this.getVisitaPostu(this.idPostuSel);
      this.getEntrevistaPostu(this.idPostuSel);
      Swal.close();
    });
  }
 verPostuSel(templatePostu){
    switch (this.postuseltable.estado_postulacion) {
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



}

