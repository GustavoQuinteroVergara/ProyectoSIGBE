import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class PeriodoServiceService {

	url="http://localhost/sigbeweb";

	constructor(private http: HttpClient) { }

	crearPeriodo(periodoArray:any){
		return this.http.post(`${this.url}/app/componentes/periodosacademicos/create_periodosacademicos.php`,{data: periodoArray})
		.pipe(map((res)=>{
			return periodoArray;
		}));
	}

	ultimoPeriodoRegistrado(){
		return this.http.get(`${this.url}/app/componentes/periodosacademicos/listLastPeriodo.php`);
	}

	getsPeriodos(){
		return this.http.get(`${this.url}/app/componentes/periodosacademicos/getsPeriodos.php`);
	}
	ticketsByPeriodo(idperiodo:any){
		return this.http.get(`${this.url}/app/componentes/Tickets/ticketsByPeriodo.php?idperiodo=${idperiodo}`);
	}
}
