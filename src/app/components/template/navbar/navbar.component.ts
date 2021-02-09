import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { Observable, interval, Subscription } from 'rxjs';
import {CuposasignacionService} from '../../../services/cuposasignacion.service';
import {formatDate } from '@angular/common';
@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
	$nombreusuario= JSON.parse(localStorage.getItem('currentUser'));
	showFiller = false;
	cuposTickets:number=0;
	fechaActual= formatDate(new Date(), 'yyyy-MM-dd', 'en');
	asignacionBuscada:any = '-';
	private updateSubscription: Subscription;
	constructor(private router:Router, private serviceCuposasign:CuposasignacionService) {
	}

	ngOnInit(): void {
		
		this.updateSubscription = interval(1000).subscribe(
			(val) => { this.buscarAsignacionPorFecha(); });
	}

	cerrarSesion(){
		localStorage.removeItem('currentUser');
		// 	  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
			//     this.router.navigate(['']);
			// }); 
			this.router.navigate(['/']);

		}

		buscarAsignacionPorFecha(){
			this.serviceCuposasign.buscarAsignacionByFecha(this.fechaActual).subscribe(res=>{
				this.asignacionBuscada=res;
			})
		}


	}
