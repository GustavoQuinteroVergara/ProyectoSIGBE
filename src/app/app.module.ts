import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NavbarComponent } from './components/template/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MatTableModule } from '@angular/material/table';
import { CrearusuarioComponent } from './components/crearusuario/crearusuario.component';
import { RegistrarConvocatoriaComponent } from './components/convocatoria/registrar-convocatoria/registrar-convocatoria.component'
import { HttpClientModule } from '@angular/common/http';
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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {NgxMatDatetimePickerModule,NgxMatNativeDateModule,NgxMatTimepickerModule} from '@angular-material-components/datetime-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewConvocatoriaComponent } from './components/convocatoria/view-convocatoria/view-convocatoria.component';
import { ListarpostuestComponent } from './components/postulacion/listarpostuest/listarpostuest.component';
import { CrearusuariologinComponent } from './components/crearusuariologin/crearusuariologin.component';
import { CrearperiodoComponent } from './components/periodoacademico/crearperiodo/crearperiodo.component';
import { TipobecaComponent } from './components/tipobeca/tipobeca.component';
import { CrearTicketComponent } from './components/crear-ticket/crear-ticket.component';
import { Globals } from './global';
import { BecaComponent } from './components/beca/beca.component';
import { ListarticketsComponent } from './components/listartickets/listartickets.component';
import { HomeComponent } from './components/home/home.component';
import { HabilitaruserComponent } from './components/habilitaruser/habilitaruser.component';
import { RegistrarSaldoComponent } from './components/registrar-saldo/registrar-saldo.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { QRCodeModule } from 'angularx-qrcode';
import { CuposticketsComponent } from './components/cupostickets/cupostickets.component';
import { DatePipe } from '@angular/common';
import { VisitadomiciliariaComponent } from './components/psicologia/visitadomiciliaria/visitadomiciliaria.component';
import { ListicketestComponent } from './components/listicketest/listicketest.component';


@NgModule({
  declarations: [
  AppComponent,
  NavbarComponent,
  LoginComponent,
  CrearusuarioComponent,
  ModificarusuarioComponent,
  RegistrarConvocatoriaComponent,
  ListarconvocatoriaComponent,
  RegistrarPostulacionComponent,
  ViewConvocatoriaComponent,
  ListarpostuestComponent,
  /*registrarlogin,*/
  CrearusuariologinComponent,
  TipobecaComponent,
  BecaComponent,
  CrearperiodoComponent,
  TipobecaComponent,
  CrearTicketComponent,
  ListarticketsComponent,
  HomeComponent,
  HabilitaruserComponent,
  RegistrarSaldoComponent,
  ConfiguracionComponent,
  CuposticketsComponent,
  VisitadomiciliariaComponent,
  ListicketestComponent
  ],
  imports: [
  BrowserModule,
  QRCodeModule,
  // Angular material
  MatAutocompleteModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatSidenavModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatTableModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatInputModule,
  NgxMatTimepickerModule,
  FormsModule,
  ReactiveFormsModule,
  MatButtonModule,
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,

  RouterModule.forRoot(ROUTES, { useHash: true }),
  HttpClientModule,
  BrowserAnimationsModule
  ],
  providers: [
  MatDatepickerModule,
  MatNativeDateModule,
  Globals,
  DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
