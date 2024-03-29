import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';  
import { MatSnackBar} from '@angular/material/snack-bar';
import {ListconvoactivasService} from './listconvoactivas.service';
import {DocumentoService} from '../../../services/documento.service';
import {ServRegPostuService} from './serv-reg-postu.service';
import {UsuariocarreraService} from '../../../services/usuariocarrera.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registrar-postulacion',
  templateUrl: './registrar-postulacion.component.html',
  styleUrls: ['./registrar-postulacion.component.css']
})
export class RegistrarPostulacionComponent  {

  convoActivas: any;
  $nombreusuario= JSON.parse(localStorage.getItem('currentUser'));
  postulacionRegistrar:any;
  carrerasest:any;
  documentosarchivos:any;
  success:any;
  myForm: FormGroup;
  varsel:any;
  convosel:any;
  docsconvosel:any;
  listDocsupload=[];

  constructor(private listconvoactivas:ListconvoactivasService,
    public fb: FormBuilder,
    private registrarpostu:ServRegPostuService,
    public dialog: MatDialog,
    public snackBack: MatSnackBar,
    public usuariocarreraService:UsuariocarreraService,
    public documentoService:DocumentoService) { 
  	this.buscarConvoActivas();
    this.getCarrerasEst();
    this.buscarDocumentos();
    this.myForm = this.fb.group({
      convo: ['', [Validators.required]],
      promedio: ['', [Validators.required]],
      semestre: ['', [Validators.required]],
      d10 :['', [Validators.required]],
      carrera :['', [Validators.required]],
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
    this.docsconvosel = null;
    this.listDocsupload = [];

    this.documentoService.getDocumentsConvo(this.convosel.consecutivoconvo).subscribe(result=>{
      this.docsconvosel = result;
      console.log(result);
    });

    console.log(this.convosel);
  }

  getCarrerasEst(){
    this.usuariocarreraService.carrerasEst(this.$nombreusuario.identi).subscribe(result=>{
      this.carrerasest = result;
    });
  }
  buscarDocumentos(){
    this.documentoService.listDocumentosSelect().subscribe(result=>{
      this.documentosarchivos = result;
    });
  }

  buscarConvoActivas(){
    this.listconvoactivas.buscarConvoActivas().subscribe(convoActivas =>{ 
     this.convoActivas = convoActivas;
   },(err)=>{
     console.log(err);
   });
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
    // this.listDocsupload[this.varsel] = btoa(binaryString);
    this.varsel =  this.varsel + '|-|' + btoa(binaryString) ;
    this.listDocsupload.push(this.varsel);
  }

  promedioMessage(promediosel:any){
    if(promediosel < 3.0){
      this.snackBack.open('El promedio seleccionado no es el recomendado.','Aceptar',{
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['redNoMatch']
      });
    }
  }



  registrarPostulacion(promedio:any,semestre:any,carrera:any,usuario:any,convocatoria:any,templateRef,errorpostuexistente){
            this.postulacionRegistrar= {promedio:promedio,
                                  semestre:semestre,
                                  carrera:carrera,
                                  estado_postulacion:1,
                                  usuario:usuario,
                                  convocatoria:convocatoria,
                                  listDocumentos:this.listDocsupload
            };



    this.registrarpostu.buscarPostuByIdConvo(convocatoria.consecutivoconvo,this.$nombreusuario.identi).subscribe(result=>{
      Swal.fire({
        title: 'ERROR',
        text: 'Error al registrarse,ya has registrado una postulación de esta convocatoria.',
        icon: 'error'
      }); 
    },(err)=>{
        this.registrarpostu.registrarPostulacion(this.postulacionRegistrar).subscribe(res =>{
          Swal.fire({
            title: 'Exitoso',
            text: 'Registrado exitosamente.',
            icon: 'success'
          }); 
        },(errr)=>{
            Swal.fire({
              title: 'ERROR',
              text: 'Error al registrarse.' + errr.error.text,
              icon: 'error'
            }); 
          });
      });
    


  }




}