import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import {PeriodoServiceService} from '../../../services/periodo-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-crearperiodo',
  templateUrl: './crearperiodo.component.html',
  styleUrls: ['./crearperiodo.component.css']
})
export class CrearperiodoComponent{

  periodoArray:any;


  constructor(private periodoService:PeriodoServiceService) { }

  registrarPeriodo(descripcion:any,fechaini:any,fechafin:any){
    this.periodoArray = {
      descripcion:descripcion,
      fechainicial:fechaini,
      fechafin:fechafin
    };

    this.periodoService.crearPeriodo(this.periodoArray).subscribe(result=>{
      Swal.fire({
        title: 'Exitoso',
        text: 'Registrado exitosamente.',
        icon: 'success'
      }); 
    },(err)=>{
      Swal.fire({
        title: 'ERROR',
        text: 'Error al registrar el periodo.' + err.error.text,
        icon: 'error'
      }); 
    });

    
  }

}
