import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceListarPostuEstService {

	urlPostuEst="http://localhost/sigbeweb/";

  constructor(private http: HttpClient) { }

	buscarPostuByIdenti(identiEst:any){
		return this.http.get(`${this.urlPostuEst}app/componentes/postulacion/listpostubyest.php?idest=${identiEst}`);
	}
}
