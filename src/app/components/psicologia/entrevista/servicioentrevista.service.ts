import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ServicioentrevistaService {


  url2='http://localhost/SIGBEWEB/app/componentes/ubicacion/buscardepartamentos.php';
  url3='http://localhost/SIGBEWEB/app/componentes/ubicacion/buscarciudades.php';
  url4= 'http://localhost/SIGBEWEB/app/componentes/ubicacion/carreras.php';

  constructor(private http: HttpClient) { }


  buscardepartamento(){
    return this.http.get(`${this.url2}`);
   }
   buscarCiudad(arreglodepar:any){
    return this.http.post(`${this.url3}`,{data: arreglodepar});
    
    
    }


}
