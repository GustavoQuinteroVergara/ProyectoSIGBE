import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../../environment';
@Injectable({
  providedIn: 'root'
})
export class ServicesticketsService {

	url= environment.URL_LOCAL;

  constructor(private http: HttpClient ) { }

	buscartickets(){
		return this.http.get(`${this.url}/app/componentes/tickets/list_tickets.php`);
	}
	ticketsByTipo(tipoTicket:any){
		return this.http.get(`${this.url}/app/componentes/tickets/ticketsByTipo.php?tipo=${tipoTicket}`);
	}
	ticketsByEstado(estadoticket:any){
		return this.http.get(`${this.url}/app/componentes/tickets/ticketsByEstado.php?estado=${estadoticket}`);
	}
	ticketsByIdenti(identi:any){
		return this.http.get(`${this.url}/app/componentes/tickets/ticketsByIdenti.php?identi=${identi}`);
	}
	ticketsByFechas(fechaini:any,fechafin:any){
		return this.http.get(`${this.url}/app/componentes/tickets/ticketsByFechas.php?fechaini=${fechaini}&fechafin=${fechafin}`);
	}

}
