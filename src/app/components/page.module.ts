import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
//
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
//
import { NgxPaginationModule } from 'ngx-pagination';
//
import { PacienteCitadosComponent } from '../components/paciente-citados/paciente-citados.component';
import { ActoMedicoComponent } from '../components/acto-medico/acto-medico.component';

@NgModule({
  declarations: [PacienteCitadosComponent, ActoMedicoComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
  ],
})
export class PageModule {}
