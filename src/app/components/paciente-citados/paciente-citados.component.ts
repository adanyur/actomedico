import { Component, OnInit, ɵConsole } from '@angular/core';
import { from } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DataService } from 'src/app/core/services/data.service';
import { Ant } from 'src/app/core/models/ant.models';

@Component({
  selector: 'app-paciente-citados',
  templateUrl: './paciente-citados.component.html',
  styleUrls: ['./paciente-citados.component.css'],
})
export class PacienteCitadosComponent implements OnInit {
  constructor(private dataService: DataService) {
    const source = from([
      {
        an_destipo: 'PERSONALES',
        an_codigo: 1,
        an_descripcion: 'TUBERCULOSIS',
      },
      {
        an_destipo: 'PERSONALES',
        an_codigo: 2,
        an_descripcion: 'ENF. TRANSMISION SEXUAL',
      },
      {
        an_destipo: 'PERSONALES',
        an_codigo: 3,
        an_descripcion: 'VIH-SIDA',
      },
      {
        an_destipo: 'PERSONALES',
        an_codigo: 4,
        an_descripcion: 'HEPATITIS',
      },
      {
        an_destipo: 'PERSONALES',
        an_codigo: 5,
        an_descripcion: 'DIABETES',
      },
      {
        an_destipo: 'PERSONALES',
        an_codigo: 6,
        an_descripcion: 'HTA',
      },
      {
        an_destipo: 'PERSONALES',
        an_codigo: 7,
        an_descripcion: 'SOBREPESO',
      },
      {
        an_destipo: 'PERSONALES',
        an_codigo: 8,
        an_descripcion: 'INFARTO CARDIACO',
      },
      {
        an_destipo: 'PERSONALES',
        an_codigo: 9,
        an_descripcion: 'DISLIPIDEMIA (COLESTEROL)',
      },
      {
        an_destipo: 'FAMILIARES',
        an_codigo: 1,
        an_descripcion: 'TUBERCULOSIS',
      },
      {
        an_destipo: 'FAMILIARES',
        an_codigo: 2,
        an_descripcion: 'VIH-SIDA',
      },
      {
        an_destipo: 'FAMILIARES',
        an_codigo: 3,
        an_descripcion: 'ITS',
      },
      {
        an_destipo: 'FAMILIARES',
        an_codigo: 4,
        an_descripcion: 'HEPATITIS',
      },
      {
        an_destipo: 'FAMILIARES',
        an_codigo: 5,
        an_descripcion: 'DBM',
      },
      {
        an_destipo: 'FAMILIARES',
        an_codigo: 6,
        an_descripcion: 'HTA',
      },
      {
        an_destipo: 'FAMILIARES',
        an_codigo: 7,
        an_descripcion: 'INFARTO',
      },
      {
        an_destipo: 'FAMILIARES',
        an_codigo: 8,
        an_descripcion: 'CANCER',
      },
      {
        an_destipo: 'FAMILIARES',
        an_codigo: 9,
        an_descripcion: 'DEPRESION',
      },
      {
        an_destipo: 'ALERGIAS',
        an_codigo: 1,
        an_descripcion: 'ALERGIA A MEDICAMENTO',
      },
      {
        an_destipo: 'ALERGIAS',
        an_codigo: 2,
        an_descripcion: 'ALERGIA A ALIMENTO',
      },
    ]);
    const example = source.pipe(
      filter((person) => person.an_destipo === 'PERSONALES')
    );
    // example.subscribe((data) => console.log(data));
  }

  ants: Ant;

  ngOnInit(): void {}
}
