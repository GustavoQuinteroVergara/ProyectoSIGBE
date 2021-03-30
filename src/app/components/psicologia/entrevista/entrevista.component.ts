import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import  {ServicioentrevistaService } from '../entrevista/servicioentrevista.service';

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
  thirdFormGroup:FormGroup;
  trabaja:any;
  fourFormGroup:FormGroup;
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
  nombreestudiante:any;
  cualfuente='';
  codigoest:any;
  fechanacimiento:any;
  planestudio:any;
  lugarnacimiento:any;
  cedula:any;
  fechaexp:any;
  numerohijos:any;
  c1:any;
  direccion1:any;
  barrio1:any;
  celular:any;
  direccioncali:any;
  barriocali:any;
  telefonocali:any;
  codigo:any;
  direccionest:any;
 barrioest:any;
 celular2:any;
 familia1:any;
 cargoempresa:any;
 antiguedad:any;
 c2:"";
 telefonoempresa:"";
 telefonotrabajo:"";
 valoringresos:"";
 colegio:any;
 ano:any;
 c3:any;
 pais:any;
 bachilericfes:"";
ano2:any;
valormatricula:"";
valorpension:"";
nombrepadre:"";
nombremadre:"";
edadpadre:"";
direccionpadre:"";
ciudadpadre:"";
ingresopadre:"";
ocupacionpadre:"";
edadmadre:"";
direccionmadre:"";
ciudadmadre:"";
ocupacionmadre:"";
ingresosmadre:"";
nombreconyuge:"";
edadconyuge:"";
direccionconyuge:"";
ciudadconyuge:"";
ocupacionconyuge:"";
ingresosconyuge:"";
hermanonombre:"";
edadhermano:"";
direccionhermano:"";
ciudadhermano:"";
ocupacionhermano:"";
ingresoshermano:"";
hermanonombre2:"";
edadhermano2:"";
direccionhermano2:"";
ciudadhermano2:"";
ocupacionhermano2:"";
ingresoshermano2:"";
hermanonombre3:"";
edadhermano3:"";
direccionhermano3:"";
ciudadhermano3:"";
ocupacionhermano3:"";
ingresoshermano3:"";
parentesco:"";
edadparentesco:"";
direccionparentesco:"";
ciudadparentesco:"";
ocupacionparentesco:"";
ingresosparentesco:"";
parentesco2:"";
edadparentesco2:"";
direccionparentesco2:"";
ciudadparentesco2:"";
ocupacionparentesco2:"";
ingresosparentesco2:"";
otro:"";
edadotro:"";
direccionotro:"";
ciudadotro:"";
ocupacionotro:"";
ingresosotro:"";
otro1:"";
edadotro1:"";
direccionotro1:"";
ciudadotro1:"";
ocupacionotro1:"";
ingresosotro1:"";
amortizacion:"";
arriendo:"";
ingresofamiliar:"";
empesajefe:"";
sueldojefe:"";
ocupacionjefe:"";
direccionempresajefe:"";
c4:"";
telefonoempresajefe:"";
observaciones:"";



  constructor(private registraruser:ServicioentrevistaService) {this.buscardepartamento();
    this.firstFormGroup = new FormGroup({
      nombreestudiante: new FormControl(),
      cedula: new FormControl()
   });
   this.secondFormGroup=new FormGroup({
    barrioest: new FormControl(),
    celular2: new FormControl(),
    direccioncali: new FormControl(),
    barriocali:new FormControl(),
    telefonocali:new FormControl(),
    c2: new FormControl(),
    bachilericfes: new FormControl()

    
   });
   this.thirdFormGroup= new FormGroup({
      familia1: new FormControl(),
      cargoempresa: new FormControl(),
      empresa: new FormControl(),
      antiguedad: new FormControl(),
      telefonotrabajo: new FormControl(),
      valoringresos:new FormControl()
   });
   this.fourFormGroup = new FormGroup({
    colegio:new FormControl(),
    ano:new FormControl(),
    c3:new FormControl(),
    pais:new FormControl(),
    ano2:new FormControl(),
    valormatricula:new FormControl() ,
    valorpension:new FormControl(),
    nombrepadre: new FormControl(),
    nombremadre: new FormControl(),
    edadpadre: new FormControl,
    direccionpadre: new FormControl(),
    ciudadpadre: new FormControl(),
    ingresopadre: new FormControl(),
    ocupacionpadre: new FormControl(),
    edadmadre: new FormControl(),
    direccionmadre: new FormControl(),
    ciudadmadre: new FormControl(),
    ocupacionmadre:new FormControl(),
    ingresosmadre: new FormControl(),
    nombreconyuge:new FormControl(),
    edadconyuge: new FormControl(),
    direccionconyuge: new FormControl(),
    ciudadconyuge: new FormControl(),
    ocupacionconyuge: new FormControl(),
    ingresosconyuge: new FormControl(),
    hermanonombre: new FormControl(),
    edadhermano: new FormControl(),
    direccionhermano: new FormControl(),
    ciudadhermano: new FormControl(),
    ocupacionhermano: new FormControl(),
    ingresoshermano: new FormControl(),
    hermanonombre2: new FormControl(),
    edadhermano2: new FormControl(),
    direccionhermano2: new FormControl(),
    ciudadhermano2: new FormControl(),
    ocupacionhermano2: new FormControl(),
    ingresoshermano2: new FormControl(),
    hermanonombre3: new FormControl(),
    edadhermano3: new FormControl(),
    direccionhermano3: new FormControl(),
    ciudadhermano3: new FormControl(),
    ocupacionhermano3: new FormControl(),
    ingresoshermano3: new FormControl(),
    parentesco: new FormControl(),
    edadparentesco: new FormControl(),
    direccionparentesco:new FormControl(),
    ocupacionparentesco:new FormControl(),
    ingresosparentesco: new FormControl(),
    parentesco2: new FormControl(),
    edadparentesco2: new FormControl(),
    direccionparentesco2:new FormControl(),
    ocupacionparentesco2:new FormControl(),
    ingresosparentesco2: new FormControl(),
    otro: new FormControl(),
    edadotro:new FormControl(),
    direccionotro:new FormControl(),
    ciudadotro:new FormControl(),
    ingresosotro: new FormControl(),
    otro1: new FormControl(),
    edadotro1:new FormControl(),
    direccionotro1:new FormControl(),
    ciudadotro1:new FormControl(),
    ingresosotro1: new FormControl(),
   







   });
   this.fiveFormGroup = new FormGroup({
    amortizacion: new FormControl(),
    arriendo:new FormControl(),
    cualfuente:new FormControl(),
    ingresofamiliar:new FormControl()

   });

   this.sixFormGroup= new FormGroup({
    empesajefe: new FormControl(),
    sueldojefe: new FormControl(),
    ocupacionjefe:new FormControl(),
    direccionempresajefe:new FormControl(),
    c4:new FormControl(),
    telefonoempresajefe:new FormControl(),
    observaciones:new FormControl()
   });
  
  }

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
mostracontedidocheck(valor:any){
console.log(valor);
console.log(this.amortizacion);
}

}
