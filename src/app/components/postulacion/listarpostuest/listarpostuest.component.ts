import { Component, OnInit } from '@angular/core';
import {ServiceListarPostuEstService} from './service-listar-postu-est.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-listarpostuest',
  templateUrl: './listarpostuest.component.html',
  styleUrls: ['./listarpostuest.component.css']
})
export class ListarpostuestComponent {
	userToken= JSON.parse(localStorage.getItem('currentUser'));
	postusBuscadas:any;

  constructor(private serviceListarPostuEst:ServiceListarPostuEstService,public dialog: MatDialog) { 
	this.buscarPostusEst();
  }

  abrirPostu(templateRef){
  	    let dialogRef = this.dialog.open( templateRef,{
         height: '500px',
         width: '500px',
       });
  }

  buscarPostusEst(){
	  this.serviceListarPostuEst.buscarPostuByIdenti(this.userToken.identi).subscribe(result =>{ 
	  	this.postusBuscadas = result;
	  });
  }

}
