import { Routes } from '@angular/router';
import { FormularioRespaldo } from './features/formulario/pages/formulario-respaldo/formulario-respaldo';

export const routes: Routes = [
  { path: '', component: FormularioRespaldo },
  { path: '**', redirectTo: '' }
];
