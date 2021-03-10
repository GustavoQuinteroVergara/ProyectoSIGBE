import { Component, OnInit } from '@angular/core';

import {UsuarioService} from '../../services/usuario.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-olvdarcontrasena',
  templateUrl: './olvdarcontrasena.component.html',
  styleUrls: ['./olvdarcontrasena.component.css']
})
export class OlvdarcontrasenaComponent implements OnInit {

	email:any;

  constructor(private usuarioService:UsuarioService,public dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  olvidecontrasena(email:any,errormensaje,mensajeconfirmacion){

  	this.email = {
  		email : email
  	}

  	this.usuarioService.olvideContrasena(this.email).subscribe(result=>{
        let dialogRef = this.dialog.open( mensajeconfirmacion,{
                height: '200px',
                width: '350px',
        });
  	},(err)=>{
      console.log(err);
         let dialogRef = this.dialog.open(errormensaje ,{
                height: '200px',
                width: '350px',
        });
  	});

  }

}
