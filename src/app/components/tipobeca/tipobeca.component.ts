import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {TipobecaService} from './tipobeca.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-tipobeca',
  templateUrl: './tipobeca.component.html',
  styleUrls: ['./tipobeca.component.css']
})
export class TipobecaComponent implements OnInit {
  registroTBeca:any[]=[];
  tipoBecaRegistrar:any;
  success:any;
  public formularioTipoBeca: FormGroup;
  constructor(private serviceTipoBeca : TipobecaService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.formularioTipoBeca = new FormGroup({
      descripcionTipoBeca: new FormControl('',Validators.required),
    });
  }
  public hasError = (controlName: string, errorName: string) =>{
    return this.formularioTipoBeca.controls[controlName].hasError(errorName);
  }
  registrarTBeca(descripcion:any,templateRef){
    this.tipoBecaRegistrar= {descripcion:descripcion};
    this.serviceTipoBeca.registrarTipoBeca(this.tipoBecaRegistrar).subscribe(res =>{

      Swal.fire({
        title: 'Exitoso',
        text: 'Registrado exitosamente.',
        icon: 'success'
      }); 
    },(err)=>{
      Swal.fire({
        title: 'ERROR',
        text: 'Error al registrar, ERROR: ' + err.error.text,
        icon: 'error'
      }); 
    });
    
  }
  
}


