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
export const ROUTES: Routes = [
    
    {path:'registroConvocatoria', component: RegistrarConvocatoriaComponent, canActivate:[ValidacionRutasGuard]
    ,data: { 
        expectedRole: '2'
      }},
    {path:'viewConvocatoria/:idConvo', component: ViewConvocatoriaComponent, canActivate:[ValidacionRutasGuard]
    ,data: { 
        expectedRole: '2'
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
        expectedRole: '2'
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
      {path:'habilitarUser', component:HabilitaruserComponent},
    {path:'bienvenida', component:HomeComponent},
    {path:'',component: LoginComponent},
    {path:'**',component: LoginComponent}

]


