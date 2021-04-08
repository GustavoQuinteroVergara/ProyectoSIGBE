import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BeneficiariosService {

	url="http://localhost/sigbeweb/";

  constructor(private http: HttpClient) { }


  getBeneficiariosIdConvo(idconvo:any){
  	return this.http.get(`${this.url}app/componentes/beneficiarios/listarBeneficiarios.php?idconvo=${idconvo}`);
  }
}
