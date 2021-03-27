import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class InicioService {

  url = 'http://localhost/SIGBEWEB/';

  constructor(private http:HttpClient) { }
buscarPostuEnespera(){
  return this.http.get(`${this.url}app/componentes/postulacion/listarpostuactivas.php`);
}
infoColores(){
  return this.http.get(`${this.url}app/componentes/usuarios/consultashomebienestar.php`);
}
graficaInfo(){
  return this.http.get(`${this.url}app/componentes/postulacion/postulacionesbyzona.php`);
}

}
