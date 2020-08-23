import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
	  $nombreusuario= JSON.parse(localStorage.getItem('currentUser'));
showFiller = false;
  constructor(private router:Router) { }

  cerrarSesion(){
  localStorage.removeItem('currentUser');
  this.router.navigate(['/']);

  }


}
