import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/template/navbar/navbar.component';
/*SE AÑADE PARA LAS RUTAS*/
import {RouterModule} from '@angular/router';
import { ROUTES } from './app.routes';
import { CrearusuarioComponent } from './components/crearusuario/crearusuario.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CrearusuarioComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES,{useHash: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
