import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
//
import { StorageService } from './storage.service';
//
import { Session } from '../models/session.models';
import { Paciente } from '../models/paciente.models';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  header: HttpHeaders;
  token: Session;
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    this.token = this.storageService.getSessionData();
    this.header = new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${this.token['data'].token}`,
    });
  }

  datoPaciente(): Observable<Paciente> {
    const URL = ` http://192.168.10.139:8000/api`;
    return this.http.get<Paciente>(`${URL}/citas/557946`, {
      headers: this.header,
    });
  }

  listadoAntecedentes(id: number): Observable<any> {
    const URL = `http://192.168.10.139:8000/api`;
    return this.http.get(`${URL}/antecedentes/${id}`, { headers: this.header });
  }

  listadoCie() {
    const URL = `http://192.168.10.139:8000/api`;
    return this.http.get(`${URL}/cies`, { headers: this.header });
  }

  pacienteCitados() {
    const URL = `http://192.168.10.139:8000/api`;
    return this.http.get(`${URL}/citas?fecha=2020-06-16&medico=147`, {
      headers: this.header,
    });
  }
}
