import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrarvisitaService {
  urlCreate ='http://localhost/SIGBEWEB/app/componentes/visitadomiciliaria/createVisita.php';
  constructor(private http: HttpClient) { }

  registrarVisitaDomiciliaria(registroVisita:Array<any>){
    return this.http.post(`${this.urlCreate}`,{data: registroVisita}).
    pipe(map((res)=>{
      return  registroVisita
    }));
  }
}
