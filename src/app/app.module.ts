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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrarPostulacionComponent } from './components/postulacion/registrar-postulacion/registrar-postulacion.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { MatNativeDateModule } from '@angular/material/core';
// import { MatMomentDateModule } from '@angular/material-moment-adapter';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    CrearusuarioComponent,
    ModificarusuarioComponent,
    RegistrarConvocatoriaComponent,
    ListarconvocatoriaComponent,
    RegistrarPostulacionComponent
  ],
  imports: [
    BrowserModule,

    // Angular material

    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,

    MatNativeDateModule,
  // MatMomentDateModule,

    RouterModule.forRoot(ROUTES,{useHash: true}),
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
