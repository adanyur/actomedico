import { Injectable } from '@angular/core';
//
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Session } from '../models/session.models';
import { Observable } from 'rxjs';
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
}
