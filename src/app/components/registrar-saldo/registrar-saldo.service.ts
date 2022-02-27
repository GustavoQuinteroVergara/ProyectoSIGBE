import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../../../environment';
@Injectable({
  providedIn: 'root'
})
export class RegistrarSaldoService {
  urlBuscarUser=environment.URL_LOCAL+'/app/componentes/usuarios/buscar_user.php?';
  urlUpdate=environment.URL_LOCAL+'/app/componentes/usuarios/updateSaldo.php'; // disponer url de su servidor que tiene las páginas PHP
  constructor(private http: HttpClient) { }
  buscarUser(codigoestudiante:any){
    return this.http.get(`${this.urlBuscarUser}codigoestudiante=${codigoestudiante}`);
  }
  registrarSaldos(registroSaldo:Array<any>){
    return this.http.post(`${this.urlUpdate}`,{data: registroSaldo}).
    pipe(map((res)=>{
      return  registroSaldo
    }));
  }
  
}
