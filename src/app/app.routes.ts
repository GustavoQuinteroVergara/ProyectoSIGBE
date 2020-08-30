import {Routes } from '@angular/router';
import {CrearusuarioComponent} from './components/crearusuario/crearusuario.component';
import {LoginComponent} from './components/login/login.component';
import {RegistrarConvocatoriaComponent} from './components/convocatoria/registrar-convocatoria/registrar-convocatoria.component';
import { ModificarusuarioComponent } from './components/modificarusuario/modificarusuario.component';
import {ListarconvocatoriaComponent} from './components/listarconvocatoria/listarconvocatoria.component';
import {RegistrarPostulacionComponent} from './components/postulacion/registrar-postulacion/registrar-postulacion.component';
import {ViewConvocatoriaComponent} from './components/convocatoria/view-convocatoria/view-convocatoria.component';
import {ListarpostuestComponent} from './components/postulacion/listarpostuest/listarpostuest.component';
import { CrearperiodoComponent } from './components/periodoacademico/crearperiodo/crearperiodo.component';
import { TipobecaComponent } from './components/tipobeca/tipobeca.component';
import { BecaComponent } from './components/beca/beca.component';

export const ROUTES: Routes = [
    
    {path:'registroConvocatoria', component: RegistrarConvocatoriaComponent},
    {path:'viewConvocatoria/:idConvo', component: ViewConvocatoriaComponent},
    {path:'registrarPostulacion',component: RegistrarPostulacionComponent},
    {path:'registrarPeriodo',component: CrearperiodoComponent},
    {path:'listarPostulacionesEst',component: ListarpostuestComponent},
    {path:'modificarUsuario', component: ModificarusuarioComponent},
    {path:'crearUsuario', component: CrearusuarioComponent},
    {path:'listarConvocatoria',component: ListarconvocatoriaComponent},
    {path:'crearTBeca',component:TipobecaComponent},
    {path:'crearBeca', component:BecaComponent},
    {path:'',component: LoginComponent},
    {path:'**',component: LoginComponent}

]


