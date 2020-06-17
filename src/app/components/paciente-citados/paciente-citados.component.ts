import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-paciente-citados',
  templateUrl: './paciente-citados.component.html',
  styleUrls: ['./paciente-citados.component.css'],
})
export class PacienteCitadosComponent implements OnInit {
  paciente: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getListadoPacientes();
  }

  getListadoPacientes() {
    this.dataService.pacienteCitados().subscribe((data: any) => {
      (this.paciente = data), console.log(data);
    });
  }
}
