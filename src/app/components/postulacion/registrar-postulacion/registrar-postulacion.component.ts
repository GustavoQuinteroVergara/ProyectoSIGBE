import { Component, OnInit } from '@angular/core';

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



  constructor(private listconvoactivas:ListconvoactivasService,private registrarpostu:ServRegPostuService,public dialog: MatDialog) { 
  	this.buscarConvoActivas();
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