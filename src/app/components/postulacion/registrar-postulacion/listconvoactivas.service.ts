import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListconvoactivasService {


  url='http://localhost/sigbeweb/app/componentes/convocatorias/list_convoactivas.php'; // disponer url de su servidor que tiene las páginas PHP



  constructor(private http: HttpClient) { }

  buscarConvoActivas(){
    return this.http.get(`${this.url}`);
  }
}
