import {Routes } from '@angular/router';
/*Estos nombres se traen de como aparece la clase en el .ts(Este caso registrar)*/

/*import {RegistrarConvocatoriaComponent} from './components/convocatoria/registrar-convocatoria/registrar-convocatoria.component'*/
import {CrearusuarioComponent} from './components/crearusuario/crearusuario.component';

import {RegistrarConvocatoriaComponent} from './components/convocatoria/registrar-convocatoria/registrar-convocatoria.component';


export const ROUTES: Routes = [
    /*en PATH : Se pone un nombre cualquiera para luego utilizarlo en el menu - 
    Component : el mismo nombre del import */
    {path:'registroConvocatoria', component: RegistrarConvocatoriaComponent}

    /*
    {path: '', pathMatch:'full', redirectTo:'home'},
    {path:'**',pathMatch:'full', redirectTo: 'home'}*/
    {path:'crearUsuario', component: CrearusuarioComponent}
]


