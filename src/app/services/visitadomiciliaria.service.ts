import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VisitadomiciliariaService {

  url = "http://localhost/SIGBEWEB/app/componentes";
  constructor(private http: HttpClient) { }

  	listVisitaPostu(idPostu:any){
		return this.http.get(`${this.url}/visitadomiciliaria/listarVisitaByPostu.php?idpostu=${idPostu}`);
	}
}
