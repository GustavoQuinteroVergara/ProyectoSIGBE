import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
	providedIn: 'root'
})
export class TicketService {

	url="http://localhost/sigbeweb";

	constructor(private http: HttpClient) { }

	registrarTicket(ticketArray:any){
		return this.http.post(`${this.url}/app/componentes/Tickets/crearTicket.php`,{data: ticketArray})
		.pipe(map((res)=>{
			return ticketArray;
		}));
	}

	buscarTicketbyFechaUser(iduser:any){
		return this.http.get(`${this.url}/app/componentes/Tickets/ticketbyfechauser.php?idUser=${iduser}`);
	}
}
