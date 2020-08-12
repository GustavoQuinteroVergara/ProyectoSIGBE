import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NavbarComponent } from './components/template/navbar/navbar.component';
/*SE AÑADE PARA LAS RUTAS*/
import {RouterModule} from '@angular/router';
import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { CrearusuarioComponent } from './components/crearusuario/crearusuario.component';
import {RegistrarConvocatoriaComponent} from './components/convocatoria/registrar-convocatoria/registrar-convocatoria.component'
import {HttpClientModule} from '@angular/common/http';
import { ModificarusuarioComponent } from './components/modificarusuario/modificarusuario.component';
import { ListarconvocatoriaComponent } from './components/listarconvocatoria/listarconvocatoria.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    CrearusuarioComponent,
    ModificarusuarioComponent,
    RegistrarConvocatoriaComponent,
    ListarconvocatoriaComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES,{useHash: true}),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
