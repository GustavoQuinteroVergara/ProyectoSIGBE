import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import  {EntrevistasService } from '../entrevista/entrevistas.service';

@Component({
  selector: 'app-entrevista',
  templateUrl: './entrevista.component.html',
  styleUrls: ['./entrevista.component.css']
})
export class EntrevistaComponent implements OnInit {
  departamentos:any;
  firstFormGroup: FormGroup;
  isLinear = false;
  estadocivil:any;
  secondFormGroup: FormGroup;
  iddepartamento:any;
  ciud:any;
  carreras:any;
  departamento:any;
  reside:any;
  thirdFormGroup:any;
  trabaja:any;
  fourFormGroup:any;
  caractercolegio:any;
  fuenteingreso:boolean=false;
  madreestado:boolean=false;
  conyugeestado:boolean=false;
  hermanoestado:boolean=false;
  hermanoestado2:boolean=false;
  hermanoestado3:boolean=false;
  parentescoestado1:boolean=false;
  parentescoestado2:boolean=false;
  otrosestado:boolean=false;
  otrosestado1:boolean=false;
  fiveFormGroup:any;
  casa:any;
  fuenteingres:any;
  hipoteca:any;
  jefe:any;
  niveleducativojefe:any;
  posicionsocioeconomica:any;
  sixFormGroup:any;
  si:boolean=false;
  departamentos2:any;
  ciud2:any;
  departamento2:any;
  iddepartamento2:any;
  departamentos3:any;
  ciud3:any;
  departamento3:any;
  iddepartamento3:any;
  departamentos4:any;
  ciud4:any;
  departamento4:any;
  iddepartamento4:any;

  cualfuente='';

  constructor(private registraruser:EntrevistasService) {this.buscardepartamento();}

  ngOnInit(): void {
  }
  buscardepartamento(){
    this.registraruser.buscardepartamento()
    .subscribe(res=>{
      console.log(res);
      this.departamentos=res;
      this.departamentos2=res;
      this.departamentos3=res;
      this.departamentos4=res;
    });
  }
  

  departamentoselec(event:any){
    this.departamento=   JSON.stringify(event); 
   this.iddepartamento={
    iddepartamento:this.departamento
  };
  console.log(this.iddepartamento);
  
  this.registraruser.buscarCiudad(this.iddepartamento)
  .subscribe(res=>{
    this.ciud = res;
  });
    
  } 
  departamentoselec2(event:any){
    this.departamento2=   JSON.stringify(event); 
   this.iddepartamento2={
    iddepartamento:this.departamento2
  };
  console.log(this.iddepartamento2);
  
  this.registraruser.buscarCiudad(this.iddepartamento2)
  .subscribe(res=>{
    this.ciud2 = res;
  });
    

  } 

  departamentoselec3(event:any){
    this.departamento3=   JSON.stringify(event); 
   this.iddepartamento3={
    iddepartamento:this.departamento3
  };
  console.log(this.iddepartamento2);
  
  this.registraruser.buscarCiudad(this.iddepartamento3)
  .subscribe(res=>{
    this.ciud3 = res;
  });
    

  } 
  departamentoselec4(event:any){
    this.departamento4=   JSON.stringify(event); 
   this.iddepartamento4={
    iddepartamento:this.departamento4
  };
  console.log(this.iddepartamento4);
  
  this.registraruser.buscarCiudad(this.iddepartamento4)
  .subscribe(res=>{
    this.ciud4 = res;
  });
    

  }





cambiarestado(){
  this.fuenteingreso=!this.fuenteingreso;
}

}
