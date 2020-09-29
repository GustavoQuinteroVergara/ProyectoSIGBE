import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';

import {PeriodoServiceService} from '../../../services/periodo-service.service';
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
      console.log(result);
    },(err)=>{
      console.log(err.error);
    });

    
  }

}
