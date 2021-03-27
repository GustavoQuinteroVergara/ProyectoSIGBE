import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceloginService {

  url='http://localhost/sigbeweb/app/componentes/usuarios/list_useremail.php?'; // disponer url de su servidor que tiene las páginas PHP

  constructor(private http: HttpClient) { }

  buscarUser(email:any){
    return this.http.get(`${this.url}email=${email}`);
  }

}
