import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegistrarConvocatoriaComponent } from './components/convocatoria/registrar-convocatoria/registrar-convocatoria.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrarConvocatoriaComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
