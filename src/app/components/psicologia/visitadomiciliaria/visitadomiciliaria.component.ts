import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {RegistrarvisitaService} from './registrarvisita.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-visitadomiciliaria',
  templateUrl: './visitadomiciliaria.component.html',
  styleUrls: ['./visitadomiciliaria.component.css']
})
export class VisitadomiciliariaComponent implements OnInit {
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
  cubrearriendo:any;
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
  descripcionfinal:any;
  constructor(private _formBuilder: FormBuilder,
    private rutaActiva: ActivatedRoute,
    private serviceVisita:RegistrarvisitaService,
    public dialog: MatDialog) {
    this.idPostuSel = this.rutaActiva.snapshot.params.idConvo;

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


  registroVisita(templateRef){
    this.visitaDomiciliaria={
      postulacionid:this.postulacionid,
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
    },(err)=>{
      Swal.fire({
        title: 'ERROR',
        text: 'Error al Registrar, ERROR: ' + err.error.text,
        icon: 'error'
      }); 
    });
  
  }
  /*
  radioChange(event) {
    this.hidden = event;
    if (event === "Otro") {
      this.secondFormGroup.setValidators([Validators.required]);
      this.secondFormGroup.updateValueAndValidity();
      this.cualobligacion=this.cualobligacion;
    } else {
      this.secondFormGroup.clearValidators();
      this.secondFormGroup.updateValueAndValidity();
      this.cualobligacion="";
    }
    console.log("Requerido", this.secondFormGroup.errors);
  }*/
}

