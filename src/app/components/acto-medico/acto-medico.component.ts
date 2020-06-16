import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
//
import { DataService } from '../../core/services/data.service';
//
import { Paciente } from '../../core/models/paciente.models';

@Component({
  selector: 'app-acto-medico',
  templateUrl: './acto-medico.component.html',
  styleUrls: ['./acto-medico.component.css'],
})
export class ActoMedicoComponent implements OnInit {
  formActaMedica: FormGroup;
  pacientes: Paciente;

  constructor(private fb: FormBuilder, private dataService: DataService) {}

  ngOnInit(): void {
    this.formActaMedica = this.fb.group({});
  }

  getDatoPaciente() {
    this.dataService.datoPaciente().subscribe((data: Paciente) => {
      // (this.pacientes = data['data']),
      // console.log(this.pacientes['data'].paciente);
      console.log(data['data'].paciente);
    });
  }
}
