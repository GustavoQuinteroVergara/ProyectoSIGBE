import { Component } from '@angular/core';
import {TipobecaService} from './tipobeca.service';
@Component({
  selector: 'app-tipobeca',
  templateUrl: './tipobeca.component.html',
  styleUrls: ['./tipobeca.component.css']
})
export class TipobecaComponent  {
  registroTBeca:any[]=[];
  tipoBecaRegistrar:any;
  constructor(private serviceTipoBeca : TipobecaService) { }

  registrarTBeca(descripcion:any){
    this.tipoBecaRegistrar= {descripcion:descripcion};
    this.serviceTipoBeca.registrarTipoBeca(this.tipoBecaRegistrar).subscribe(res =>{
      console.log(res);
  
  
      },(err)=>{
      
  
         console.log('ERROR: ' + err.error.text);
      });
    console.log(this.tipoBecaRegistrar);
     
     }
  
  }
  

