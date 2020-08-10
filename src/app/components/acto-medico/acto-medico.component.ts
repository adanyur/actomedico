import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from, combineLatest, Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from 'rxjs/operators';
//
import { DataService } from '../../core/services/data.service';
//
import { Paciente, Ant, Cie, CieSelect } from '../../core/models';
//
import swal from 'sweetalert2';

@Component({
  selector: 'app-acto-medico',
  templateUrl: './acto-medico.component.html',
  styleUrls: ['./acto-medico.component.css'],
})
export class ActoMedicoComponent implements OnInit {
  pacientes$: Observable<Paciente[]>;
  cies$: Observable<Cie[]>;
  formActaMedica: FormGroup;
  cieSelect: CieSelect;
  antPersonales = [];
  antFamiliares = [];
  selectCies = [];
  page: number = 1;
  idcita: any;

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

  get formActaMedicaControl() {
    return this.formActaMedica.controls;
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
    this.pacientes$ = this.dataService.datoPaciente(id);
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
            person.tipo === 'PERSONALES' || person.tipo === 'ALERGIAS'
        )
      )
      .subscribe((data: Ant) => this.antPersonales.push(data));
  }

  AntFamiliares(data: any) {
    from(data)
      .pipe(filter((fam: Ant) => fam.tipo === 'FAMILIARES'))
      .subscribe((data: Ant) => this.antFamiliares.push(data));
  }

  getCie(data: string): void {
    this.cies$ = this.dataService.searchCie(data);
  }

  /**Seleccion de cie 10**/
  addCie(data: any): void {
    if (
      this.selectCies.find((resutl) => resutl.codigo === data.codigo) !==
      undefined
    ) {
      swal.fire({ title: '<h4>Ya selecciono el cie</h4>', icon: 'info' });
      return;
    }
    this.selectCies.push(new CieSelect(data));
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
    const peso$ = this.formActaMedica.get('peso').valueChanges;
    const talla$ = this.formActaMedica.get('talla').valueChanges;
    combineLatest(peso$, talla$)
      .pipe(map(([peso, talla]) => peso / (talla * talla)))
      .subscribe((data) => {
        this.formActaMedica.controls.mcorporal.setValue(data);
      });
  }

  /**Envio de datos**/
  postRegistroActoMedico(): void {
    this.dataService
      .ActoMedico(
        this.formActaMedica.value,
        // this.idcita[0].ci_idcita,
        561458,
        this.selectCies
      )
      .subscribe((data) => {
        this.router.navigateByUrl('pacientes'),
          swal.fire({
            title: '<h4>Se registro el Parte diario</h4>',
            icon: 'success',
          });
      });
  }
}
