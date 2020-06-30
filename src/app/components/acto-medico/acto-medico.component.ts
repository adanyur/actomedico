import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
//
import { DataService } from '../../core/services/data.service';
//
import { Paciente } from '../../core/models/paciente.models';
import { Ant } from '../../core/models/ant.models';
import { CieSelect } from '../../core/models/cie-select.models';
import swal from 'sweetalert2';

@Component({
  selector: 'app-acto-medico',
  templateUrl: './acto-medico.component.html',
  styleUrls: ['./acto-medico.component.css'],
})
export class ActoMedicoComponent implements OnInit {
  formActaMedica: FormGroup;
  pacientes: any;
  idcita: any;
  antPersonales = [];
  antFamiliares = [];
  selectCies = [];
  cieSelect: CieSelect;
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
      anFamiliares: [null, Validators.required],
      inpcie: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.formActaMedica
      .get('inpcie')
      .valueChanges.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((data: string) => this.getCie(data.toUpperCase()));
    this.getDatoPaciente();
    this.getAntecedentes();
  }

  getDatoPaciente(): void {
    this.dataService.datoPaciente().subscribe((paciente) => {
      this.pacientes = paciente;
      this.idcita = paciente;
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
    if (
      this.selectCies.find((resutl) => resutl.codigo === data.codigo) !==
      undefined
    ) {
      swal.fire('Seleccionar otro cie', '', 'error');
      return;
    }

    this.cieSelect = {
      codigo: data.codigo,
      descripcion: data.descripcion,
      tdiag: 1,
    };

    this.selectCies.push(this.cieSelect);
  }

  deleteCie(data: any) {
    this.selectCies.splice(this.selectCies.indexOf(data), 1);
  }

  updateCie(data: any, codigo: any) {
    let indice = this.selectCies.indexOf(codigo);
    this.selectCies[indice].tdiag = data.target.value;
  }

  postRegistroActoMedico() {
    this.dataService
      .ActoMedico(
        this.formActaMedica.value,
        this.idcita[0].ci_idcita,
        this.selectCies
      )
      .subscribe((data) => console.log(data));
  }
}
