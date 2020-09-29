import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceListarPostuEstService {

	urlPostuEst="http://localhost/sigbeweb/app/componentes/postulacion/listpostubyest.php?";

  constructor(private http: HttpClient) { }

  buscarPostuByIdenti(identiEst:any){
  	return this.http.get(`${this.urlPostuEst}idest=${identiEst}`);
  }
}
