import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../../../../environment';
@Injectable({
  providedIn: 'root'
})
export class ServicioentrevistaService {


  url2=environment.URL_LOCAL+'/app/componentes/ubicacion/buscardepartamentos.php';
  url3=environment.URL_LOCAL+'/app/componentes/ubicacion/buscarciudades.php';
  url4= environment.URL_LOCAL+'/app/componentes/ubicacion/carreras.php';
  urlCreate=environment.URL_LOCAL+'/app/componentes/informaciongeneral/createinformaciongeneral.php';

  constructor(private http: HttpClient) { }


  buscardepartamento(){
    return this.http.get(`${this.url2}`);
   }
   buscarCiudad(arreglodepar:any){
    return this.http.post(`${this.url3}`,{data: arreglodepar});
    
    
    }
    registrarentrevista(registroVisita:Array<any>){
      return this.http.post(`${this.urlCreate}`,{data: registroVisita}).
      pipe(map((res)=>{
        return  registroVisita
      }));
    }

}
