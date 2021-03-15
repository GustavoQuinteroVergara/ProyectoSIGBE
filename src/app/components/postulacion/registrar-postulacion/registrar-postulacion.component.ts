import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';  
import {ListconvoactivasService} from './listconvoactivas.service';
import {ServRegPostuService} from './serv-reg-postu.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-registrar-postulacion',
  templateUrl: './registrar-postulacion.component.html',
  styleUrls: ['./registrar-postulacion.component.css']
})
export class RegistrarPostulacionComponent  {

  convoActivas: any;
  $nombreusuario= JSON.parse(localStorage.getItem('currentUser'));
  postulacionRegistrar:any;
  success:any;
  myForm: FormGroup;
  varsel:any;
  convosel={
    d10 :false,
    factservicio :false,
    cartapeticion :false,
    carnetestudiante :false,
    cedulapadre :false,
    cedulamadre :false,
    promedioacumulado :false,
    tabulado :false,
    constanciaweb :false,
    certificadovencidad :false,
    documentoestudiante :false,
    documentoacudiente :false,
    formatosolicitudbeneficio :false,
    diagnosticomedico  :false,
    recibopagomatricula :false,
    certificadoingresos :false
  };
  listDocsupload={
    d10 :'',
    factservicio :'',
    cartapeticion :'',
    carnetestudiante :'',
    cedulapadre :'',
    cedulamadre :'',
    promedioacumulado :'',
    tabulado :'',
    constanciaweb :'',
    certificadovencidad :'',
    documentoestudiante :'',
    documentoacudiente :'',
    formatosolicitudbeneficio :'',
    diagnosticomedico  :'',
    recibopagomatricula :'',
    certificadoingresos :''
  };

  constructor(private listconvoactivas:ListconvoactivasService,
    public fb: FormBuilder,
    private registrarpostu:ServRegPostuService,
    public dialog: MatDialog) { 
  	this.buscarConvoActivas();
    this.myForm = this.fb.group({
      convo: ['', [Validators.required]],
      promedio: ['', [Validators.required]],
      semestre: ['', [Validators.required]],
      d10 :['', [Validators.required]],
      factservicio :['', [Validators.required]],
      cartapeticion :['', [Validators.required]],
      carnetestudiante :['', [Validators.required]],
      cedulapadre :['', [Validators.required]],
      cedulamadre :['', [Validators.required]],
      promedioacumulado :['', [Validators.required]],
      tabulado :['', [Validators.required]],
      constanciaweb :['', [Validators.required]],
      certificadovencidad :['', [Validators.required]],
      documentoestudiante :['', [Validators.required]],
      documentoacudiente :['', [Validators.required]],
      formatosolicitudbeneficio :['', [Validators.required]],
      diagnosticomedico  :['', [Validators.required]],
      recibopagomatricula :['', [Validators.required]],
      certificadoingresos :['', [Validators.required]],
    });

  }

  cambiarConvo(convosel:any){
    this.convosel = convosel;

    console.log(this.convosel);

  }

  buscarConvoActivas(){
    this.listconvoactivas.buscarConvoActivas().subscribe(convoActivas =>{ 
     this.convoActivas = convoActivas;
     console.log(convoActivas)});
  }

  seleccionarArchivo(event,variable:any) {
  var files = event.target.files;
  var file = files[0];                                                       
  this.varsel = variable;
    if(files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvent) {
    var binaryString = readerEvent.target.result;
    this.listDocsupload[this.varsel] = btoa(binaryString);
  }



  registrarPostulacion(promedio:any,semestre:any,usuario:any,convocatoria:any,templateRef,errorpostuexistente){
    this.postulacionRegistrar= {promedio:promedio,
                                semestre:semestre,
                                estado_postulacion:1,
                                usuario:usuario,
                                convocatoria:convocatoria,
                                d10 :"0|-|" +this.listDocsupload['d10'],
                                factservicio :"0|-|" +this.listDocsupload['factservicio'],
                                cartapeticion :"0|-|" +this.listDocsupload['cartapeticion'],
                                carnetestudiante :"0|-|" +this.listDocsupload['carnetestudiante'],
                                cedulapadre :"0|-|" +this.listDocsupload['cedulapadre'],
                                cedulamadre :"0|-|" +this.listDocsupload['cedulamadre'],
                                promedioacumulado :"0|-|" +this.listDocsupload['promedioacumulado'],
                                tabulado :"0|-|" +this.listDocsupload['tabulado'],
                                constanciaweb :"0|-|" +this.listDocsupload['constanciaweb'],
                                certificadovencidad :"0|-|" +this.listDocsupload['certificadovencidad'],
                                documentoestudiante :"0|-|" +this.listDocsupload['documentoestudiante'],
                                documentoacudiente :"0|-|" +this.listDocsupload['documentoacudiente'],
                                formatosolicitudbeneficio :"0|-|" +this.listDocsupload['formatosolicitudbeneficio'],
                                diagnosticomedico  :"0|-|" +this.listDocsupload['diagnosticomedico'],
                                recibopagomatricula :"0|-|" +this.listDocsupload['recibopagomatricula'],
                                certificadoingresos :"0|-|" +this.listDocsupload['certificadoingresos']
    };
    this.registrarpostu.buscarPostuByIdConvo(convocatoria.consecutivoconvo).subscribe(result=>{


        this.registrarpostu.registrarPostulacion(this.postulacionRegistrar).subscribe(res =>{
         this.success = true;
         let dialogRef = this.dialog.open( templateRef,{
            height: '263px',
            width: '350px',
          });
        },(errr)=>{
          console.log(errr.error);
           this.success = false;
           let dialogRef = this.dialog.open( templateRef,{
              height: '263px',
              width: '350px',
            });
          });

    },(err)=>{
        let dialogRef = this.dialog.open( errorpostuexistente,{
          height: '263px',
          width: '350px',
        });
        // console.log('ERROR: ' + err.error.text);
      });
    


  }




}