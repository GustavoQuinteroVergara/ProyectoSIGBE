import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../../environment';
@Injectable({
  providedIn: 'root'
})
export class ServiciolistarconvoService {


  url=environment.URL_LOCAL+'/app/componentes/convocatorias/list_convocatorias.php';

  constructor(private http: HttpClient) { }

  buscarConvocatorias(){
   return this.http.get(`${this.url}`);
  }
}
