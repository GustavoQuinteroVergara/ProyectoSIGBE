import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TipobecaService {
  urlCreateTBeca ='http://localhost/SIGBEWEB/app/componentes/tipobecas/create_tipobecas.php';
  constructor(private http: HttpClient) { }

  registrarTipoBeca(registroTBeca:Array<any>){
    return this.http.post(`${this.urlCreateTBeca}`,{data: registroTBeca}).
    pipe(map((res)=>{
      return  registroTBeca
    }));
  }
}
