import { Component} from '@angular/core';
import { BecaService } from './beca.service';

@Component({
  selector: 'app-beca',
  templateUrl: './beca.component.html',
  styleUrls: ['./beca.component.css']
})
export class BecaComponent  {
  becaRegistrar:any;
  ListTBeca: any;
  constructor(private serviceBeca:BecaService) { 
    this.buscarTipoBeca();
  }
 
  buscarTipoBeca(){
    this.serviceBeca.buscarListadoTBecas().subscribe(ListTBeca=>{
      console.log(ListTBeca);
      this.ListTBeca = ListTBeca;
    });
  }
  registrarBeca(consecutivo_TipoBeca:any,descripcion:any){
    this.becaRegistrar= {tipobeca:consecutivo_TipoBeca,
      descripcion:descripcion
    };
    this.serviceBeca.registrarBecas(this.becaRegistrar).subscribe(res =>{
      console.log(res);
  
  
      },(err)=>{
      
  
         console.log('ERROR: ' + err.error.text);
      });
    console.log(this.becaRegistrar);
     
     }
  
  }
  
