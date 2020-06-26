import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { from } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
//
import { DataService } from '../../core/services/data.service';
//
import { Paciente } from '../../core/models/paciente.models';
import { Ant } from '../../core/models/ant.models';

@Component({
  selector: 'app-acto-medico',
  templateUrl: './acto-medico.component.html',
  styleUrls: ['./acto-medico.component.css'],
})
export class ActoMedicoComponent implements OnInit {
  formActaMedica: FormGroup;
  inpcie: FormControl;
  pacientes: any;
  idcita: any;
  antPersonales = [];
  antFamiliares = [];
  antAlergias = [];
  selectCies = [];
  cies: any;
  page: number = 1;

  constructor(private fb: FormBuilder, private dataService: DataService) {
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
    });
  }

  ngOnInit(): void {
    this.inpcie = new FormControl();
    this.inpcie.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((data: string) => {
        this.getCie(data.toUpperCase());
      });
    this.getDatoPaciente();
    this.getAntecedentes();
  }

  getDatoPaciente(): void {
    this.dataService.datoPaciente().subscribe((paciente) => {
      this.pacientes = paciente;
    });
  }

  getAntecedentes(): void {
    this.dataService.listadoAntecedentes().subscribe((ant) => {
      this.personales(ant);
      this.familiares(ant);
    });
  }
  /********************************************/

  personales(data: any) {
    from(data)
      .pipe(
        filter(
          (person: Ant) =>
            person.an_destipo === 'PERSONALES' ||
            person.an_destipo === 'ALERGIAS'
        )
      )
      .subscribe((data: Ant) => this.antPersonales.push(data));
  }

  familiares(data: any) {
    from(data)
      .pipe(filter((person: Ant) => person.an_destipo === 'FAMILIARES'))
      .subscribe((data: Ant) => this.antFamiliares.push(data));
  }

  /********************************************/
  getCie(data: string): void {
    this.dataService.searchCie(data).subscribe((data) => {
      this.cies = data;
    });
  }

  addCie(data: any): void {
    this.selectCies.push(data);
  }

  deleteCie(data: any) {
    this.selectCies.splice(this.selectCies.indexOf(data), 1);
  }

  postRegistroActoMedico() {
    console.log(this.selectCies);
  }
}
