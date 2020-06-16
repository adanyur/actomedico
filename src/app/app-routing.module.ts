import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { PacienteCitadosComponent } from './components/paciente-citados/paciente-citados.component';
import { ActoMedicoComponent } from './components/acto-medico/acto-medico.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'pacientes', component: PacienteCitadosComponent },
  { path: 'acto-medico', component: ActoMedicoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
