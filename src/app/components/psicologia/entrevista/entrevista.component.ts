import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
import {DocumentoService} from '../../../services/documento.service';
import {VisitadomiciliariaService} from '../../../services/visitadomiciliaria.service';
import {ServicesViewConvocatoriaService} from '../../convocatoria/view-convocatoria/services-view-convocatoria.service';
import { MatDialog } from '@angular/material/dialog';
import {ControlContainer, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import  {ServicioentrevistaService } from '../entrevista/servicioentrevista.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-entrevista',
  templateUrl: './entrevista.component.html',
  styleUrls: ['./entrevista.component.css']
})
export class EntrevistaComponent implements OnInit {


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

  updatePostu:any;
  loadingcc = false;
  $postuByIdArray:any;
  $convoBuscada:any;
  convoActualizado:any;

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
  hipoteca='';
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
 empresa='';
 cargoempresa='';
 antiguedad='';
 c2='';
 telefonoempresa='';
 telefonotrabajo='';
 valoringresos='';
 colegio:any;
 ano:any;
 c3:any;
 pais:any;
 bachilericfes='';
ano2='';
valormatricula='';
valorpension='';
nombrepadre='';
nombremadre="";
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
nombreconyuge='';
edadconyuge:"";
direccionconyuge:"";
ciudadconyuge:"";
ocupacionconyuge:"";
ingresosconyuge:"";
hermanonombre='';
edadhermano:"";
direccionhermano:"";
ciudadhermano:"";
ocupacionhermano:"";
ingresoshermano:"";
hermanonombre2='';
edadhermano2:"";
direccionhermano2:"";
ciudadhermano2:"";
ocupacionhermano2:"";
ingresoshermano2:"";
hermanonombre3='';
edadhermano3:"";
direccionhermano3:"";
ciudadhermano3:"";
ocupacionhermano3:"";
ingresoshermano3:"";
parentesco="";
edadparentesco:"";
direccionparentesco:"";
ciudadparentesco:"";
ocupacionparentesco:"";
ingresosparentesco:"";
parentesco2="";
edadparentesco2:"";
direccionparentesco2:"";
ciudadparentesco2:"";
ocupacionparentesco2:"";
ingresosparentesco2:"";
otro='';
edadotro:"";
direccionotro:"";
ciudadotro:"";
ocupacionotro:"";
ingresosotro:"";
otro1='';
edadotro1:"";
direccionotro1:"";
ciudadotro1:"";
ocupacionotro1:"";
ingresosotro1:"";
amortizacion='';
arriendo='';
ingresofamiliar:"";
empesajefe='';
sueldojefe='';
ocupacionjefe='';
direccionempresajefe='';
c4='';
telefonoempresajefe='';
observaciones='';
entrevista:any;
direcciontrabajo='';
vivienda:any;
anterior="";
trab1:any;
Prestamos:any;
Ayudas:any;
anterior2="";
otras:any;
familia2:any;
trab2:any;
Prestamos2:any;
Ayudas2:any;
otras2:any;
familia3:any;
trab3:any;
Prestamos3:any;
Ayudas3:any;
anterior3='';
otras3:any;
familia4:any;
trab4:any;
Prestamos4:any;
Ayudas4:any;
anterior4='';
otras4:any;
familia5:any;
trab5:any;
Prestamos5:any;
Ayudas5:any;
anterior5='';
otras5:any;
idPostuSel:any;
idConvo:any;



  constructor(private registraruser:ServicioentrevistaService,
        private rutaActiva: ActivatedRoute,
        private router:Router,
        public dialog: MatDialog,
        private serviceviewconvocatoria:ServicesViewConvocatoriaService,
    private documentosService:DocumentoService,
    private visitadomiciliariaService:VisitadomiciliariaService,) {
    dialog.closeAll();
    this.buscardepartamento();
    this.idPostuSel = this.rutaActiva.snapshot.params.idPostu;
    this.idConvo = this.rutaActiva.snapshot.params.idConvo;
    this.getPostu(this.idPostuSel);
    this.firstFormGroup = new FormGroup({
      nombreestudiante: new FormControl(),
      cedula: new FormControl(),
      numerohijos:new FormControl(),
      lugarnacimiento: new FormControl(),
      
    planestudio : new FormControl(),
    codigoest : new FormControl(),
   });
   this.secondFormGroup=new FormGroup({
    barrioest: new FormControl(),
    direccionest:new FormControl(),
    celular2: new FormControl(),
    direccioncali: new FormControl(),
    barriocali:new FormControl(),
    telefonocali:new FormControl(),
    c1:new FormControl(),
    

    
   });
   this.thirdFormGroup= new FormGroup({
      familia1: new FormControl(),
      trab1:new FormControl(),
      Ayudas:new FormControl(),
      otras:new FormControl(),
      Prestamos:new FormControl(),
      familia2: new FormControl(),
      trab2:new FormControl(),
      Ayudas2:new FormControl(),
      otras2:new FormControl(),
      Prestamos2:new FormControl(),
      familia3: new FormControl(),
      trab3:new FormControl(),
      Ayudas3:new FormControl(),
      otras3:new FormControl(),
      Prestamos3:new FormControl(),
      familia4: new FormControl(),
      trab4:new FormControl(),
      Ayudas4:new FormControl(),
      otras4:new FormControl(),
      Prestamos4:new FormControl(),
      familia5: new FormControl(),
      trab5:new FormControl(),
      Ayudas5:new FormControl(),
      otras5:new FormControl(),
      Prestamos5:new FormControl(),
      cargoempresa: new FormControl(),
      empresa: new FormControl(),
      antiguedad: new FormControl(),
      telefonotrabajo: new FormControl(),
      valoringresos:new FormControl(),
      c2: new FormControl(),
      direcciontrabajo: new FormControl()
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
    ciudadparentesco: new FormControl(),
    ingresosparentesco: new FormControl(),
    parentesco2: new FormControl(),
    edadparentesco2: new FormControl(),
    direccionparentesco2:new FormControl(),
    ocupacionparentesco2:new FormControl(),
    ciudadparentesco2: new FormControl(),
    ingresosparentesco2: new FormControl(),
    otro: new FormControl(),
    edadotro:new FormControl(),
    direccionotro:new FormControl(),
    ciudadotro:new FormControl(),
    ocupacionotro:new FormControl(),
    ingresosotro: new FormControl(),
    otro1: new FormControl(),
    edadotro1:new FormControl(),
    direccionotro1:new FormControl(),
    ocupacionotro1:new FormControl(),
    ciudadotro1:new FormControl(),
    ingresosotro1: new FormControl(),
    bachilericfes: new FormControl()
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
mostracontedidocheck(){

console.log(this.amortizacion);
console.log(this.familia1);


console.log(this.anterior);
console.log(this.anterior2);
console.log(this.anterior3);

}

registrarEntrevista(){
      Swal.fire({
        title: 'Cargando...',
        allowOutsideClick: false,
      });
      Swal.showLoading();
  /* Establecemos valores de necesidad */
  if(this.familia1==true){
    this.anterior= this.anterior +"," +"Familia";
  
  }
  
  if(this.trab1==true){
  this.anterior= this.anterior + "," + "TRAB.RENTASPROPIAS";
  }
  
  if(this.Ayudas == true){
    this.anterior= this.anterior + "," + "Ayudas";
  }
  if(this.Prestamos == true){
    this.anterior= this.anterior + "," + "Presatamos";
  }
  if(this.otras == true){
    this.anterior= this.anterior + "," + "Otras";
  }
  if(this.familia2==true){
    this.anterior2= this.anterior2 +"," +"Familia";
  
  }
  if(this.trab2==true){
  this.anterior2= this.anterior2 + "," + "TRAB.RENTASPROPIAS";
  }
  
  if(this.Ayudas2 == true){
    this.anterior2= this.anterior2 + "," + "Ayudas";
  }
  if(this.Prestamos2 == true){
    this.anterior2= this.anterior2+ "," + "Presatamos";
  }
  if(this.otras2 == true){
    this.anterior2= this.anterior2 + "," + "Otras";
  }
  if(this.familia3==true){
    this.anterior3= this.anterior3 +"," +"Familia";
  
  }
  if(this.trab3==true){
  this.anterior3= this.anterior3 + "," + "TRAB.RENTASPROPIAS";
  }
  
  if(this.Ayudas3 == true){
    this.anterior3= this.anterior3 + "," + "Ayudas";
  }
  if(this.Prestamos3 == true){
    this.anterior3= this.anterior3+ "," + "Presatamos";
  }
  if(this.otras3 == true){
    this.anterior3= this.anterior3 + "," + "Otras";
  }
  if(this.familia4==true){
    this.anterior4= this.anterior4 +"," +"Familia";
  
  }
  if(this.trab4==true){
  this.anterior4= this.anterior4 + "," + "TRAB.RENTASPROPIAS";
  }
  
  if(this.Ayudas4 == true){
    this.anterior4= this.anterior4 + "," + "Ayudas";
  }
  if(this.Prestamos4 == true){
    this.anterior4= this.anterior4+ "," + "Presatamos";
  }
  if(this.otras4 == true){
    this.anterior4= this.anterior4 + "," + "Otras";
  }
  if(this.familia5==true){
    this.anterior5= this.anterior5 +"," +"Familia";
  
  }
  if(this.trab5==true){
  this.anterior5= this.anterior5 + "," + "TRAB.RENTASPROPIAS";
  }
  
  if(this.Ayudas5 == true){
    this.anterior5= this.anterior5 + "," + "Ayudas";
  }
  if(this.Prestamos5 == true){
    this.anterior5= this.anterior5+ "," + "Presatamos";
  }
  if(this.otras5 == true){
    this.anterior5= this.anterior5 + "," + "Otras";
  }

  this.entrevista={
    
idpostulaciongeneral:this.idPostuSel,    
lugarnacimiento: this.lugarnacimiento,
expedicioncedula: this.fechaexp,
estadocivil: this.estadocivil,
numerohijos: this.numerohijos ,
municipioprocedencia: this.c1,
direccion: this.direccionest,
barrio: this.barrioest,
telefono: this.telefonocali,
direccioncali: this.direccioncali,  
barriocali: this.barriocali,
telefonocali: this.telefonocali,
residencia: this.reside,
trabaja: this.trabaja ,
cargotrabajador: this.cargoempresa ,
nombreempresa: this.empresa,
antiguedad:  this.antiguedad,
ciudadempresa: this.c2,
direccionempresa: this.direcciontrabajo,
valortotalingreso: this.valoringresos,
observacion: this.observaciones,
tipoparentesco: 1,
nombrepariente: this.nombrepadre,
edad: this.edadpadre,
direccionpariente: this.direccionpadre,
ciudad: this.ciudadpadre,
ocupacion: this.ocupacionpadre,
ingresos: this.ingresopadre ,
tipoparentesco2: 2,
nombrepariente2: this.nombremadre,
edad2: this.edadmadre,
direccionpariente2: this.direccionmadre,
ciudad2: this.ciudadmadre,
ocupacion2: this.ocupacionmadre,
ingresos2: this.ingresosmadre ,
tipoparentesco3: 3,
nombrepariente3: this.nombreconyuge,
edad3: this.edadconyuge,
direccionpariente3: this.direccionconyuge,
ciudad3: this.ciudadconyuge,
ocupacion3: this.ocupacionconyuge,
ingresos3: this.ingresosconyuge ,
tiponecesidad: 1,
tipoparentesco4: 4,
nombrepariente4: this.hermanonombre,
edad4: this.edadhermano,
direccionpariente4: this.direccionhermano,
ciudad4: this.ciudadhermano,
ocupacion4: this.ocupacionhermano,
ingresos4: this.ingresoshermano,
tipoparentesco5: 4,
nombrepariente5: this.hermanonombre2,
edad5: this.edadhermano2,
direccionpariente5: this.direccionhermano2,
ciudad5: this.ciudadhermano2,
ocupacion5: this.ocupacionhermano2,
ingresos5: this.ingresoshermano2,
tipoparentesco6: 4,
nombrepariente6: this.hermanonombre3,
edad6: this.edadhermano3,
direccionpariente6: this.direccionhermano3,
ciudad6: this.ciudadhermano3,
ocupacion6: this.ocupacionhermano3,
ingresos6: this.ingresoshermano3,
tipoparentesco7: 5,
nombrepariente7: this.otro,
edad7: this.edadotro,
direccionpariente7: this.direccionotro,
ciudad7: this.ciudadotro,
ocupacion7: this.ocupacionotro,
ingresos7: this.ingresosotro,
tipoparentesco8: 5,
nombrepariente8: this.otro1,
edad8: this.edadotro1,
direccionpariente8: this.direccionotro1,
ciudad8: this.ciudadotro1,
ocupacion8: this.ocupacionotro1,
ingresos8: this.ingresosotro1,
tipoparentesco9: 6,
nombrepariente9: this.parentesco,
edad9: this.edadparentesco,
direccionpariente9: this.direccionparentesco,
ciudad9: this.ciudadparentesco,
ocupacion9: this.ocupacionparentesco,
ingresos9: this.ingresosparentesco,
tipoparentesco10: 6,
nombrepariente10: this.parentesco2,
edad10: this.edadparentesco2,
direccionpariente10: this.direccionparentesco2,
ciudad10: this.ciudadparentesco2,
ocupacion10: this.ocupacionparentesco2,
ingresos10: this.ingresosparentesco2,
nombre: this.anterior,
tiponecesidad2:2,
nombre2:this.anterior2,
tiponecesidad3:4,
nombre3:this.anterior3,
tiponecesidad4:3,
nombre4:this.anterior4,
tiponecesidad5:5,
nombre5:this.anterior5,
colegio: this.colegio,
municipio: this.c3,
añogrado: this.ano,
pais: this.pais,
bachillericfes: this.bachilericfes,
añoicfes: this.ano2,
caractercolegio: this.caractercolegio,
valormatricula:this.valormatricula,
valorpension: this.valorpension,
casapropia: this.casa,
hipoteca: this.hipoteca,
valormensualamortizacion: this.amortizacion,
valormensualarriendo:this.arriendo,
jefefamilia: this.jefe,
niveleducativojefe: this.niveleducativojefe,
ingresomensualfamiliar: this.ingresofamiliar,
posicionjefe: this.posicionsocioeconomica,
empresajefe: this.empesajefe,
ocupacionjefe: this.ocupacionjefe,
ingresojefe: this.sueldojefe,
direccionempresajefe: this.direccionempresajefe,
ciudadjefe: this.c4,
telefonojefe: this.telefonoempresajefe
      
     
      };  
      console.log(this.entrevista);
      this.registraruser.registrarentrevista(this.entrevista)
      .subscribe(res=>{
        Swal.fire({
          title: 'Exitoso',
          text: 'Registrado exitosamente.',
          icon: 'success'
        }); 
         this.router.navigate(['/viewConvocatoria/' + this.idConvo]);
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
      console.log(this.postuseltable);
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


  cambiarEstadoPostu(idPostu:any,estadopostulacionactual:any,estadoseleccionado:any){
      Swal.fire({
        title: 'Cargando...',
        allowOutsideClick: false,
      });
      Swal.showLoading();
    this.loadingcc = true;
      if(estadopostulacionactual == 'Entrevista'){
        if(estadoseleccionado == 'Revision'){
          this.updatePostu = {
            idpostu:idPostu,
            estadopostu: estadoseleccionado
          };
          this.serviceviewconvocatoria.actualizarEstadoPostulacion(this.updatePostu).subscribe
          (res=>{  
            this.loadingcc = false;
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
        }
      }

      
    }

}
