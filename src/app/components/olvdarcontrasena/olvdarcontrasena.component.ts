import { Component, OnInit } from '@angular/core';

import {UsuarioService} from '../../services/usuario.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';
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

  olvidecontrasena(email:any){
      Swal.fire({
        title: 'Cargando...',
        allowOutsideClick: false,
      });
      Swal.showLoading();

  	this.email = {
  		email : email
  	}

  	this.usuarioService.olvideContrasena(this.email).subscribe(result=>{
        Swal.fire({
          title: 'Información',
          text: 'Si el correo suministrado se encuentra registrado, llegara un correo con una contraseña nueva, revisa en spam si no llega.',
          icon: 'info'
        });
  	},(err)=>{
        Swal.fire({
          title: 'ERROR',
          text: 'El correo ingresado no se encuentra registrado, por favor ingrese uno válido.',
          icon: 'error'
        });
  	});

  }

}
