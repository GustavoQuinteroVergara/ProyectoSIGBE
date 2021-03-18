import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {RegistrarvisitaService} from './registrarvisita.service';
@Component({
  selector: 'app-visitadomiciliaria',
  templateUrl: './visitadomiciliaria.component.html',
  styleUrls: ['./visitadomiciliaria.component.css']
})
export class VisitadomiciliariaComponent implements OnInit {
  isLinear = false;
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
  cualobligacion:any;
  estratodane:any;
  pagoarriendo:any;
  valorarriendo:any;
  cubrearriendo:any;
  otroarriendo:any;
  fuenteingreso:any;
  cualfuente:any;
  tipocasa:any;
  aspectocasa:any;
  cualaspecto:any;
  serviciopublico:any;
  cuartosolicitante:any;
  cantidadpersonas:any;
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
        cualobligacion: new FormControl('', [Validators.required]),
        valorarriendo: new FormControl('', [Validators.required]),
        otroarriendo: new FormControl('', [Validators.required]),
        cualfuente: new FormControl('', [Validators.required]),
    });
    this.thirdFormGroup = this._formBuilder.group({
      cualaspecto: new FormControl('', [Validators.required]),
      cantidadpersonas: new FormControl('', [Validators.required]),
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
      this.success = true;
      let dialogRef = this.dialog.open( templateRef,{
         height: '200px',
         width: '200px',
       })
    },(err)=>{
      console.log('ERROR: ' + err.error.text);
      this.success = false;
      let dialogRef = this.dialog.open( templateRef,{
         height: '200px',
         width: '200px',
       });
    });
    console.log(this.visitaDomiciliaria);
  
  }

}

