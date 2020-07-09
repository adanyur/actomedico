import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
//
import { StorageService } from './storage.service';
//
import { Session } from '../models/session.models';
import { Paciente } from '../models/paciente.models';
import { Ant } from '../models/ant.models';
import { ActoMedico } from '../models/acto-medico.models';
import { Cie } from '../models/cie.models';
//
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  header: HttpHeaders;
  session: Session;
  actoMedico: ActoMedico;
  usuario: string;
  id: number;
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    this.session = this.storageService.getSessionData();
    this.header = new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${this.session['data'].token}`,
    });
  }

  getIdcita(id: number) {
    this.id = id;
  }

  getPacientesCitados(): Observable<any> {
    const fecha = moment().format('YYYY-MM-DD');
    const URL = ` http://192.168.10.139:8001/api/citas?fecha=${fecha}&medico=${this.session['data'].id}`;
    return this.http.get<any>(URL, { headers: this.header });
  }

  datoPaciente(id: number): Observable<Paciente> {
    const URL = ` http://192.168.10.139:8001/api`;
    return this.http.get<Paciente>(`${URL}/citas/${id}`, {
      headers: this.header,
    });
  }

  listadoAntecedentes(): Observable<Ant[]> {
    const URL = `http://192.168.10.139:8001/api`;
    return this.http.get<Ant[]>(`${URL}/antecedentes`, {
      headers: this.header,
    });
  }

  searchCie(term: string): Observable<Cie[]> {
    if (!term.trim()) {
      return of([]);
    }
    const URL = `http://192.168.10.139:8001/api/cies?search=${term}`;
    return this.http
      .get<Cie[]>(URL, { headers: this.header })
      .pipe(catchError(this.handleError<Cie[]>('searchCie', [])));
  }

  ActoMedico(data: any, id: number, cie: any) {
    this.actoMedico = {
      idcita: id,
      motivo: data.motivo.toUpperCase(),
      problema: data.enfermedad.toUpperCase(),
      parterial: data.arterial.toUpperCase(),
      fcardiaca: data.cardiaca.toUpperCase(),
      frespiratoria: data.respiratorio.toUpperCase(),
      tbucal: data.bucal,
      taxiliar: data.axilar,
      peso: data.peso,
      talla: data.talla,
      icorporal: data.mcorporal,
      pcefalico: data.cefalico,
      examen: data.examen.toUpperCase(),
      destino: data.destino.toUpperCase(),
      dx1: cie[0] === undefined ? null : cie[0].codigo,
      desx1: cie[0] === undefined ? null : cie[0].descripcion.toUpperCase(),
      tdx1: cie[0] === undefined ? null : cie[0].tdiag,
      dx2: cie[1] === undefined ? null : cie[1].codigo,
      desx2: cie[1] === undefined ? null : cie[1].descripcion.toUpperCase(),
      tdx2: cie[1] === undefined ? null : cie[1].tdiag,
      dx3: cie[2] === undefined ? null : cie[2].codigo,
      desx3: cie[2] === undefined ? null : cie[2].descripcion.toUpperCase(),
      tdx3: cie[2] === undefined ? null : cie[2].tdiag,
      fecha: moment().format(),
      usuario: this.session['data'].name,
    };

    const URL = `http://192.168.10.139:8001/api/actomedicos`;
    return this.http.post(URL, this.actoMedico, { headers: this.header });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
