import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../../environment';
@Injectable({
  providedIn: 'root'
})
export class InicioService {

  url = environment.URL_LOCAL;

  constructor(private http:HttpClient) { }
buscarPostuEntrevista(){
  return this.http.get(`${this.url}/app/componentes/postulacion/postubyentrevista.php`);
}
datosTicketsDinero(){
  return this.http.get(`${this.url}/app/componentes/tickets/dineroTicketssietedias.php`);
}

infoColores(){
  return this.http.get(`${this.url}/app/componentes/usuarios/consultashomebienestar.php`);
}
graficaInfo(){
  return this.http.get(`${this.url}/app/componentes/postulacion/postulacionesbyzona.php`);
}

}
