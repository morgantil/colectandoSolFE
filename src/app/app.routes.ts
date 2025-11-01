import { Routes } from '@angular/router';
import { FormularioRespaldo } from './features/formulario/pages/formulario-respaldo/formulario-respaldo';
import { DescargarInfo } from './features/formulario/pages/descargar-info/descargar-info';

export const routes: Routes = [
  { path: '', component: FormularioRespaldo },
  { path: 'descargar-respaldo', component: DescargarInfo },
  { path: '**', redirectTo: '' }
];
