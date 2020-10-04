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
  public formularioConvocatoria: FormGroup;
  
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

registrarConvocatoria(fechainicial:any,fechafinal:any,becas:any,cupos:any,estadoconvocatoria:any,templateRef){
  this.convocatoriaRegistrar= {fechainicio:fechainicial,
    fechafin:fechafinal,
    becas:becas,
    cupo:cupos,
    periodo:this.convocatoriaPeriodo[0].consecutivo_periodo,
    estadoconvocatoria:estadoconvocatoria};
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
    });
  console.log(this.convocatoriaRegistrar);
   
   }

}
