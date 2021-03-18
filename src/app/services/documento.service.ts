import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {
	url="http://localhost/sigbeweb";

  constructor(private http: HttpClient) { }

  	listDocumentosSelect(){
		return this.http.get(`${this.url}/app/componentes/documento/listdocumentos.php`);
	}
	nuevoDocumento(nuevoDoc:any){
		return this.http.post(`${this.url}/app/componentes/documento/createdocumento.php`,nuevoDoc)
		.pipe(map((res)=>{
			return nuevoDoc;
		}));
	}
	getDocumentsConvo(idConvo:any){
		return this.http.get(`${this.url}/app/componentes/documento/documentosbyidconvo.php?idconvo=${idConvo}`);
	}
	getDocumentsPostu(idPostu:any){
		return this.http.get(`${this.url}/app/componentes/documento/documentosbyidpostu.php?idpostu=${idPostu}`);	
	}
}
