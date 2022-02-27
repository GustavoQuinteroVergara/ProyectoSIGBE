import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../../environment';

@Injectable({
  providedIn: 'root'
})
export class BecaService {
  urlList=environment.URL_LOCAL; 
  constructor(private http: HttpClient) { }
 
  buscarListadoBecas(){
    return this.http.get(`${this.urlList}/app/componentes/convocatorias/list_becaConvocatoria.php`);
  }
 buscarpostuCarreraBeca(idbeca:any){
    return this.http.get(`${this.urlList}/app/componentes/postulacion/cantpostubycarrerabeca.php?becasel=${idbeca}`);
  }
}
