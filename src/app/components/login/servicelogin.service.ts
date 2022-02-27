import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../../../environment';
@Injectable({
  providedIn: 'root'
})
export class ServiceloginService {

  url=environment.URL_LOCAL; // disponer url de su servidor que tiene las páginas PHP

  constructor(private http: HttpClient) { }

	buscarUser(email:any){
	   return this.http.get(`${this.url}/app/componentes/usuarios/list_useremail.php?email=${email}`);
	 }

}
