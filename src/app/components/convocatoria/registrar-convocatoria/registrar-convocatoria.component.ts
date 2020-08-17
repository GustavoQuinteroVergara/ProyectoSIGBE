import { Component } from '@angular/core';
import {RegistrarConvoServiceService} from './registrar-convo-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
@Component({
  selector: 'app-registrar-convocatoria',
  templateUrl: './registrar-convocatoria.component.html',
  styleUrls: ['./registrar-convocatoria.component.css']
})
export class RegistrarConvocatoriaComponent {
  convocatoriaBeca: any;
  registroConvo:any[]=[];
  convocatoriaPeriodo: any;
  convocatoriaRegistrar:any;
  success:any;
  public disabled = false;
  public showSpinners = true;
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

  public options = [
    { value: true, label: 'True' },
    { value: false, label: 'False' }
  ];

  public listColors = ['primary', 'accent', 'warn'];

  public stepHours = [1, 2, 3, 4, 5];
  public stepMinutes = [1, 5, 10, 15, 20, 25];
  public stepSeconds = [1, 5, 10, 15, 20, 25];

constructor(private serviceConvocatoria:RegistrarConvoServiceService) { 
  this.buscarBeca();
  this.buscarPeriodo();
}
/*registroConvocatoria(){
    this.registroConvo =[
      {
        fechainicio:fechainicial,
        fechafin:fechafinal,
        becaArray:beca,
        cuposArray:cupos,
        periodoacademico:periodo,
        horainicio:horainicial,
        horafin:horafinal,
        estadoconvocatoriaArray:estadoconvocatoria
      }
    ];
    console.log(this.registroConvo);
    /*this.serviceConvocatoria.registrarConvocatoria(this.registroConvo).subscribe(result=>{
      console.log(result);
    })
    
}*/
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

registrarConvocatoria(fechainicial:any,fechafinal:any,becas:any,cupos:any,periodo:any,estadoconvocatoria:any){
  this.convocatoriaRegistrar= {fechainicio:fechainicial,
    fechafin:fechafinal,
    becas:becas,
    cupo:cupos,
    periodo:periodo,
    estadoconvocatoria:estadoconvocatoria};
  this.serviceConvocatoria.registrarConvocatoria(this.convocatoriaRegistrar).subscribe(res =>{
    console.log(res);


    },(err)=>{
    

       console.log('ERROR: ' + err.error.text);
    });
  console.log(this.convocatoriaRegistrar);
   
   }

}
