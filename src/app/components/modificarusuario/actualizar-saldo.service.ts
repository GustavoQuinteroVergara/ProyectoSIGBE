import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../../../environment';
@Injectable({
  providedIn: 'root'
})
export class ActualizarSaldoService {
  urlUpdate=environment.URL_LOCAL; // disponer url de su servidor que tiene las páginas PHP
  constructor(private http: HttpClient) { }
	  registrarSaldos(registroSaldo:Array<any>){
	    return this.http.post(`${this.urlUpdate}/app/componentes/usuarios/modificar_user.php`,{data: registroSaldo}).
	    pipe(map((res)=>{
	      return  registroSaldo
	    }));
	  }
	  actualizarEstadoDatos(registroSaldo:Array<any>){
	    return this.http.post(`${this.urlUpdate}/app/componentes/usuarios/actualizarEstadoDatos.php`,{data: registroSaldo}).
	    pipe(map((res)=>{
	      return  registroSaldo
	    }));
	  }
}
  
  
 
 
  
