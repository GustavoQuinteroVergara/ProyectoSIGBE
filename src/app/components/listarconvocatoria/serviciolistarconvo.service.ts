import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiciolistarconvoService {


  url='http://localhost/sigbeweb/app/componentes/convocatorias/list_convocatorias.php';

  constructor(private http: HttpClient) { }

  buscarConvocatorias(){
   return this.http.get(`${this.url}`);
  }
}
