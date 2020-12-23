import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
//
import { StorageService } from '../services/storage.service';
//
import {
  ListadoPaciente,
  Session,
  Paciente,
  Ant,
  ActoMedico,
  Cie,
} from '../models';
//
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  header: HttpHeaders;
  session: Session;
  id: number;
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    this.session = this.storageService.getSessionData();
    this.header = new HttpHeaders({
      Accept: 'application/json',
      //Authorization: `Bearer ${this.session['data'].token}`,
    });
  }

  getIdcita(id: number) {
    this.id = id;
  }

  getPacientesCitados(): Observable<ListadoPaciente[]> {
    const fecha = moment().format('YYYY-MM-DD');
    //const URL = `${environment.apiURL}/citas?fecha=${fecha}&medico=${this.session['data'].id}`;
    const URL = `${environment.apiURL}/citas?fecha=2020-07-08&medico=095`;
    return this.http.get<ListadoPaciente[]>(URL, { headers: this.header });
  }

  datoPaciente(id: number): Observable<Paciente[]> {
    const URL = `${environment.apiURL}/citas/${id}`;
    return this.http.get<Paciente[]>(URL, { headers: this.header });
  }

  listadoAntecedentes(): Observable<Ant[]> {
    const URL = `${environment.apiURL}/antecedentes`;
    return this.http.get<Ant[]>(URL, { headers: this.header });
  }

  searchCie(term: string): Observable<Cie[]> {
    if (!term.trim()) {
      return of([]);
    }
    const URL = `${environment.apiURL}/cies?search=${term}`;
    return this.http.get<Cie[]>(URL, { headers: this.header });
  }

  ActoMedico(data: any, id: number, cie: any) {
    const URL = `${environment.apiURL}/actomedicos`;
    const actoMedico = new ActoMedico(data, id, cie, this.session['data'].name);
    return this.http.post(URL, actoMedico, { headers: this.header });
  }
}
