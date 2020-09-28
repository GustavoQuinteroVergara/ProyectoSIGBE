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


  constructor(private listconvoactivas:ListconvoactivasService,public fb: FormBuilder,private registrarpostu:ServRegPostuService,public dialog: MatDialog) { 
  	this.buscarConvoActivas();
     this.myForm = this.fb.group({
      convo: ['', [Validators.required]],
      promedio: ['', [Validators.required,Validators.minLength(1),Validators.maxLength(4)]],
      semestre: ['', [Validators.required]],
      estrato: ['', [Validators.required,Validators.minLength(1),Validators.maxLength(1)]],
      identificacion: ['', [Validators.required]],
    });

  }

    buscarConvoActivas(){
    this.listconvoactivas.buscarConvoActivas().subscribe(convoActivas =>{ 
     this.convoActivas = convoActivas;});
  }

  registrarPostulacion(promedio:any,semestre:any,estrato:any,usuario:any,convocatoria:any,templateRef){
    this.postulacionRegistrar= {promedio:promedio,
                                semestre:semestre,
                                estrato:estrato,
                                estado_postulacion:1,
                                usuario:usuario,
                                convocatoria:convocatoria};
    this.registrarpostu.registrarPostulacion(this.postulacionRegistrar).subscribe(res =>{
     this.success = true;
     let dialogRef = this.dialog.open( templateRef,{
        height: '200px',
        width: '200px',
      });


    },(err)=>{
     this.success = false;
     let dialogRef = this.dialog.open( templateRef,{
        height: '200px',
        width: '200px',
      });

      // console.log('ERROR: ' + err.error.text);
    });

  }



}