import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesViewConvocatoriaService {
	url="http://localhost/sigbeweb/app/componentes/postulacion/listarpostubyid.php?";
	urlConvoById="http://localhost/sigbeweb/app/componentes/convocatorias/list_convobyid.php?";

  constructor(private http: HttpClient) { }

  buscarPostulacionesByIdConvo(idconvo:any){
    return this.http.get(`${this.url}idconvo=${idconvo}`);
  }

  buscarConvoById(idconvo:any){
  	return this.http.get(`${this.urlConvoById}idconvo=${idconvo}`);	
  }
}
