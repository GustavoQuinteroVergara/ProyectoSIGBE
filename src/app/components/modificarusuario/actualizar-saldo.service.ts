import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActualizarSaldoService {
  urlUpdate='http://localhost/SIGBEWEB/app/componentes/usuarios/modificar_user.php'; // disponer url de su servidor que tiene las páginas PHP
  constructor(private http: HttpClient) { }
  registrarSaldos(registroSaldo:Array<any>){
    return this.http.post(`${this.urlUpdate}`,{data: registroSaldo}).
    pipe(map((res)=>{
      return  registroSaldo
    }));
  }
}
  
  
 
 
  
