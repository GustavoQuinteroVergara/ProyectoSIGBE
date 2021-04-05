import {Routes } from '@angular/router';
import {CrearusuarioComponent} from './components/crearusuario/crearusuario.component';
import {LoginComponent} from './components/login/login.component';
import {RegistrarConvocatoriaComponent} from './components/convocatoria/registrar-convocatoria/registrar-convocatoria.component';
import { ModificarusuarioComponent } from './components/modificarusuario/modificarusuario.component';
import {ListarconvocatoriaComponent} from './components/listarconvocatoria/listarconvocatoria.component';
import {RegistrarPostulacionComponent} from './components/postulacion/registrar-postulacion/registrar-postulacion.component';
import {ViewConvocatoriaComponent} from './components/convocatoria/view-convocatoria/view-convocatoria.component';
import {ListarpostuestComponent} from './components/postulacion/listarpostuest/listarpostuest.component';
import { CrearusuariologinComponent } from './components/crearusuariologin/crearusuariologin.component';
import { CrearperiodoComponent } from './components/periodoacademico/crearperiodo/crearperiodo.component';
import { TipobecaComponent } from './components/tipobeca/tipobeca.component';
import { CrearTicketComponent } from './components/crear-ticket/crear-ticket.component';
import { BecaComponent } from './components/beca/beca.component';
import { ListarticketsComponent } from './components/listartickets/listartickets.component';
import { HomeComponent } from './components/home/home.component';
import {ValidacionRutasGuard} from './guard/validacion-rutas.guard';
import {HabilitaruserComponent} from './components/habilitaruser/habilitaruser.component';
import { RegistrarSaldoComponent } from './components/registrar-saldo/registrar-saldo.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { CuposticketsComponent } from './components/cupostickets/cupostickets.component';
import { ListicketestComponent } from './components/listicketest/listicketest.component';
import { CrearanuncioComponent } from './components/crearanuncio/crearanuncio.component';
import { ListarencuestasComponent } from './components/encuesta/listarencuestas/listarencuestas.component';
import { EstadisticasComponent } from './components/encuesta/estadisticas/estadisticas.component';
import { OlvdarcontrasenaComponent } from './components/olvdarcontrasena/olvdarcontrasena.component';
import {VisitadomiciliariaComponent} from './components/psicologia/visitadomiciliaria/visitadomiciliaria.component';
import {EntrevistaComponent} from './components/psicologia/entrevista/entrevista.component';


export const ROUTES: Routes = [

{path:'registroConvocatoria', component: RegistrarConvocatoriaComponent, canActivate:[ValidacionRutasGuard]
,data: { 
  expectedRole: '2'
}},
{path:'viewConvocatoria/:idConvo', component: ViewConvocatoriaComponent, canActivate:[ValidacionRutasGuard]
,data: { 
  expectedRole: '2|4'
}},
{path:'registrarPostulacion',component: RegistrarPostulacionComponent, canActivate:[ValidacionRutasGuard]
,data: { 
  expectedRole: '1'
}},
{path:'registrarPeriodo',component: CrearperiodoComponent, canActivate:[ValidacionRutasGuard]
,data: { 
  expectedRole: '2'
}},
{path:'comprarTicket',component: CrearTicketComponent, canActivate:[ValidacionRutasGuard]
,data: { 
  expectedRole: '1'
}},
{path:'crearAsignacion',component: CuposticketsComponent, canActivate:[ValidacionRutasGuard]
,data: { 
  expectedRole: '2'
}},
{path:'listarPostulacionesEst',component: ListarpostuestComponent, canActivate:[ValidacionRutasGuard]
,data: { 
  expectedRole: '1'
}},
{path:'modificarUsuario', component: ModificarusuarioComponent},
{path:'crearUsuario', component: CrearusuarioComponent, canActivate:[ValidacionRutasGuard]
,data: { 
  expectedRole: '2'
}},
{path:'listarConvocatoria',component: ListarconvocatoriaComponent, canActivate:[ValidacionRutasGuard]
,data: { 
  expectedRole: '2|4'
}},
{path:'crearusuariologin',component: CrearusuariologinComponent},
{path:'listarTickets',component: ListarticketsComponent, canActivate:[ValidacionRutasGuard]
,data: { 
  expectedRole: '2'
}},
{path:'crearTBeca',component:TipobecaComponent, canActivate:[ValidacionRutasGuard]
,data: { 
  expectedRole: '2'
}},
{path:'crearBeca', component:BecaComponent, canActivate:[ValidacionRutasGuard]
,data: { 
  expectedRole: '2'
}},
{path:'registrarSaldo',component:RegistrarSaldoComponent, canActivate:[ValidacionRutasGuard]
,data: { 
  expectedRole: '2'
}},
{path:'configuracion',component:ConfiguracionComponent, canActivate:[ValidacionRutasGuard]
,data: { 
  expectedRole: '2'
}},
{path:'visitadomiciliaria/:idPostu',component:VisitadomiciliariaComponent, canActivate:[ValidacionRutasGuard]
,data: { 
  expectedRole: '4'
}},
{path:'visitadomiciliariaconvo/:idPostu/:idConvo',component:VisitadomiciliariaComponent, canActivate:[ValidacionRutasGuard]
,data: { 
  expectedRole: '2|4'
}},
{path:'crearanuncio',component:CrearanuncioComponent, canActivate:[ValidacionRutasGuard]
,data: { 
  expectedRole: '2'
}},
{path:'estadisticasencuestas',component:EstadisticasComponent, canActivate:[ValidacionRutasGuard]
,data: { 
  expectedRole: '2'
}},
{path:'listarencuestas',component:ListarencuestasComponent, canActivate:[ValidacionRutasGuard]
,data: { 
  expectedRole: '2'
}},
{path:'entrevista/:idPostu/:idConvo',component:EntrevistaComponent, canActivate:[ValidacionRutasGuard]
,data: { 
  expectedRole: '2|4'
}},
{path:'listarTicketEst',component:ListicketestComponent, canActivate:[ValidacionRutasGuard]
,data: { 
  expectedRole: '1'
}},
{path:'habilitarUser', component:HabilitaruserComponent},

{path:'olvidarContrasena', component:OlvdarcontrasenaComponent},
{path:'bienvenida',component:HomeComponent, canActivate:[ValidacionRutasGuard]
,data: { 
  expectedRole: '1|2|3|4'
}},
// {path:'',component:LoginComponent, canActivate:[ValidacionRutasGuard]
// ,data: { 
//   expectedRole: '-'
// }},
// {path:'**',component:LoginComponent, canActivate:[ValidacionRutasGuard]
// ,data: { 
//   expectedRole: '-'
// }},
{path:'',component: LoginComponent},
{path:'**',component: LoginComponent}

]


