import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../../../../environment';
@Injectable({
  providedIn: 'root'
})
export class ServiceListarPostuEstService {

	urlPostuEst=environment.URL_LOCAL;

  constructor(private http: HttpClient) { }

	buscarPostuByIdenti(identiEst:any){
		return this.http.get(`${this.urlPostuEst}/app/componentes/postulacion/listpostubyest.php?idest=${identiEst}`);
	}
}
