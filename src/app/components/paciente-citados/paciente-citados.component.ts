import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
//
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
//
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-paciente-citados',
  templateUrl: './paciente-citados.component.html',
  styleUrls: ['./paciente-citados.component.css'],
})
export class PacienteCitadosComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'id',
    'hora',
    'historia',
    'paciente',
    'actions',
  ];
  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.getSelectPacienteCitados();
  }

  getSelectPacienteCitados() {
    this.dataService.getPacientesCitados().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getActaMedico(id: number) {
    this.dataService.getIdcita(id);
    this.router.navigateByUrl('actomedico');
  }
}
