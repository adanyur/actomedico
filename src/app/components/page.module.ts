import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//
import { ReactiveFormsModule } from '@angular/forms';
//
import { PacienteCitadosComponent } from '../components/paciente-citados/paciente-citados.component';
import { ActoMedicoComponent } from '../components/acto-medico/acto-medico.component';

@NgModule({
  declarations: [PacienteCitadosComponent, ActoMedicoComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class PageModule {}
