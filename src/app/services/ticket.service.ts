import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../../environment';
@Injectable({
	providedIn: 'root'
})
export class TicketService {

	url=environment.URL_LOCAL;

	constructor(private http: HttpClient) { }

	registrarTicket(ticketArray:any){
		return this.http.post(`${this.url}/app/componentes/Tickets/crearTicket.php`,{data: ticketArray})
		.pipe(map((res)=>{
			return ticketArray;
		}));
	}

	buscarTicketbyFechaUser(iduser:any,tipoticket:any){
		return this.http.get(`${this.url}/app/componentes/Tickets/ticketbyfechauser.php?idUser=${iduser}&tipoticket=${tipoticket}`);
	}

	listTicketByest(iduser:any){
		return this.http.get(`${this.url}/app/componentes/Tickets/ticketbyest.php?identificacion=${iduser}`);
	}
}
