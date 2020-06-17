import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { map, filter } from 'rxjs/operators';
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
  pacientes: any;
  antPersonales: any;
  antFamiliares: any;
  antAlergias: any;

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.getDatoPaciente();
    // this.getAntecedentes('PERSONALES');
    // this.getAntecedentes('FAMILIARES');
    // this.getAntecedentes('ALERGIAS');
    // this.getCie();
  }

  ngOnInit(): void {
    this.formActaMedica = this.fb.group({
      motivo: [null, Validators.required],
      enfermedad: [null, Validators.required],
      examen: [null, Validators.required],
      arterial: [null, Validators.required],
      cardiaca: [null, Validators.required],
      respiratorio: [null, Validators.required],
      bucal: [null, Validators.required],
      axilar: [null, Validators.required],
      peso: [null, Validators.required],
      talla: [null, Validators.required],
      mcorporal: [null, Validators.required],
      cefalico: [null, Validators.required],
      anPersonales: [null, Validators.required],
      anEnergias: [null, Validators.required],
      anFamiliares: [null, Validators.required],
      cie: [null, Validators.required],
    });
  }

  getDatoPaciente() {
    this.dataService.datoPaciente().subscribe((data: Paciente) => {
      this.pacientes = Object.values(data);
    });
  }

  getAntecedentesPersonales(id: number) {
    this.dataService.listadoAntecedentes(id).subscribe((data) => {
      this.antPersonales = data[0].an_destipo === 'PERSONALES' ? data : null;
      console.log(data);
    });
  }

  getCie() {
    this.dataService.listadoCie().subscribe((data) => console.log(data));
  }

  postRegistroActoMedico() {
    console.log(this.formActaMedica.value);
  }
}
