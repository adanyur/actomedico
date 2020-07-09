import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from, combineLatest } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from 'rxjs/operators';
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
  pacientes: Paciente;
  cieSelect: CieSelect;
  antPersonales = [];
  antFamiliares = [];
  selectCies = [];
  page: number = 1;
  idcita: any;
  cies: any;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {
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
      inpcie: [null, Validators.required],
      destino: [null, Validators.required],
      anPersonales: [null, Validators.required],
      anFamiliares: [null, Validators.required],
      dpersonal: [null, Validators.required],
      dfamiliares: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getDatoPaciente(this.dataService.id);
    this.getAntecedentes();
    this.CalcularIMC();
    this.formActaMedica
      .get('inpcie')
      .valueChanges.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((data: string) => {
        this.getCie(data.toUpperCase());
      });
  }

  /**API**/
  getDatoPaciente(id: number): void {
    if (!id) {
      this.router.navigateByUrl('pacientes');
      return;
    }
    this.dataService.datoPaciente(id).subscribe((paciente: Paciente) => {
      this.pacientes = paciente;
      this.idcita = paciente;
    });
  }

  getAntecedentes(): void {
    this.dataService.listadoAntecedentes().subscribe((ant) => {
      this.AntPersonales(ant);
      this.AntFamiliares(ant);
    });
  }

  AntPersonales(data: any) {
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

  AntFamiliares(data: any) {
    from(data)
      .pipe(filter((fam: Ant) => fam.an_destipo === 'FAMILIARES'))
      .subscribe((data: Ant) => this.antFamiliares.push(data));
  }

  getCie(data: string): void {
    this.dataService.searchCie(data).subscribe((data) => {
      this.cies = data;
    });
  }

  /**Seleccion de cie 10**/
  addCie(data: any): void {
    if (
      this.selectCies.find((resutl) => resutl.codigo === data.codigo) !==
      undefined
    ) {
      swal.fire('Ya selecciono el cie', '', 'error');
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

  /*****/
  CalcularIMC() {
    let peso$ = this.formActaMedica.get('peso').valueChanges;
    let talla$ = this.formActaMedica.get('talla').valueChanges;
    combineLatest(peso$, talla$)
      .pipe(map(([peso, talla]) => peso / (talla * talla)))
      .subscribe((data) => {
        const IMC = data === NaN ? 0.0 : data === Infinity ? 0.0 : data;
        this.formActaMedica.controls.mcorporal.setValue(IMC);
      });
  }

  /**Envio de datos**/
  postRegistroActoMedico(): void {
    this.dataService
      .ActoMedico(
        this.formActaMedica.value,
        this.idcita[0].ci_idcita,
        this.selectCies
      )
      .subscribe((data) => swal.fire('Se registro', '', 'success'));
  }
}
