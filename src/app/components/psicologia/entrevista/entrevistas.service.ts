import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EntrevistasService {
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
