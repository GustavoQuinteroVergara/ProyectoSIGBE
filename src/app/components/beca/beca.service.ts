import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BecaService {
  urlCreateBeca=  'http://localhost/SIGBEWEB/app/componentes/becas/create_becas.php';
  urlListTBeca = 'http://localhost/SIGBEWEB/app/componentes/tipobecas/list_tipobecas.php';
  constructor(private http: HttpClient) { }

  
  registrarBecas(registroBeca:Array<any>){
    return this.http.post(`${this.urlCreateBeca}`,{data: registroBeca}).
    pipe(map((res)=>{
      return  registroBeca
    }));
  }
  buscarListadoTBecas(){
    return this.http.get(`${this.urlListTBeca}`);
  }
}
