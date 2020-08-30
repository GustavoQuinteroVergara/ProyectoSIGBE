import {Routes } from '@angular/router';
/*Estos nombres se traen de como aparece la clase en el .ts(Este caso registrar)*/
import {CrearusuarioComponent} from './components/crearusuario/crearusuario.component';
import {LoginComponent} from './components/login/login.component';
import {RegistrarConvocatoriaComponent} from './components/convocatoria/registrar-convocatoria/registrar-convocatoria.component';
import { ModificarusuarioComponent } from './components/modificarusuario/modificarusuario.component';
import {ListarconvocatoriaComponent} from './components/listarconvocatoria/listarconvocatoria.component';
import {RegistrarPostulacionComponent} from './components/postulacion/registrar-postulacion/registrar-postulacion.component';
import {ViewConvocatoriaComponent} from './components/convocatoria/view-convocatoria/view-convocatoria.component';
import {ListarpostuestComponent} from './components/postulacion/listarpostuest/listarpostuest.component';
import { CrearusuariologinComponent } from './components/crearusuariologin/crearusuariologin.component';
export const ROUTES: Routes = [
    /*en PATH : Se pone un nombre cualquiera para luego utilizarlo en el menu - 
    Component : el mismo nombre del import */
    {path:'registroConvocatoria', component: RegistrarConvocatoriaComponent},
    {path:'viewConvocatoria/:idConvo', component: ViewConvocatoriaComponent},
    {path:'registrarPostulacion',component: RegistrarPostulacionComponent},
    {path:'listarPostulacionesEst',component: ListarpostuestComponent},
    {path:'modificarUsuario', component: ModificarusuarioComponent},
    {path:'crearUsuario', component: CrearusuarioComponent},
    {path:'listarConvocatoria',component: ListarconvocatoriaComponent},
    {path:'crearusuariologin',component: CrearusuariologinComponent},
    {path:'',component: LoginComponent},
    {path:'**',component: LoginComponent}

    /*
    {path: '', pathMatch:'full', redirectTo:'home'},
    {path:'**',pathMatch:'full', redirectTo: 'home'}*/
    
]


