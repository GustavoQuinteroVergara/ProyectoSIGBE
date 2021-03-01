import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class InicioService {

  url = 'http://localhost/SIGBEWEB/app/componentes/postulacion/listarpostuactivas.php';

  constructor(private http:HttpClient) { }
buscarPostuEnespera(){
  return this.http.get(`${this.url}`);
}

}
