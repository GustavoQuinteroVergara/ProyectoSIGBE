import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RegistrarSaldoService {
  urlBuscarUser='http://localhost/sigbeweb/app/componentes/usuarios/buscar_user.php?';
  urlUpdate='http://localhost/SIGBEWEB/app/componentes/usuarios/updateSaldo.php'; // disponer url de su servidor que tiene las páginas PHP
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
