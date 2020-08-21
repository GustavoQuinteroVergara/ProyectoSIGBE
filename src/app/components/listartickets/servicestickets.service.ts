import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesticketsService {

url= 'http://localhost/sigbeweb/app/componentes/tickets/list_tickets.php?'

  constructor(private http: HttpClient ) { }

buscartickets(identificacion:any){
  return this.http.get(`${this.url}identificacion=${identificacion}`);
}


}
