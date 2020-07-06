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

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    this.session = this.storageService.getSessionData();
    this.header = new HttpHeaders({
      Accept: 'application/json',
      //Authorization: `Bearer ${this.token['data'].token}`,
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiODAyYWM1MGFmNjZmNGUzNTdlMjZiNzNmZGQ1NjFlZGJiMjZjMjU1YWU5ZGM1MmY1MDExZDRjZTI1MTgzNjcwM2JkNDEzNzlkNDJkNmZiOGUiLCJpYXQiOjE1OTMxODQ2NjgsIm5iZiI6MTU5MzE4NDY2OCwiZXhwIjoxNjI0NzIwNjY4LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.pdfrzlZ_8slc42MCgRVLr2bhKk9XIGKn3dpGcOSe1Cizfg_OVq71jXTtM3hf568a4UJh5LvCYuuqW4szdS7PXM-XmQWIcHHVJexDpNkmvwwmlykcP8evotLQPT8OMz5sorZW_yjYwKtDTV611ViXYueUMvTrBWa6rz0Y91IW_kmrohpI42OtYxsuYOP9DzVLP9_mP9jteeSf6O7ULnnIXU0Fcs1UGh_raPlyrrPEgnw8T5dcTlMty-REu0DDBWj3KK2EG02LbNf-xtj5EkFnpYgW58-4yn3NsvRQxd8rcMlRXqcGpBS5e8TOm-nWlF1G7NC3ZQpwhF_mHaCALfFyPvEuuyQxvH1pVGCUgYmOjTl3bjCMKcV_NdQAg8u-p4NskFCBvCdmkTvH0Vfsfu0RgobwT69ZUMq9galaTBwA6YK7E1kWKhrIVwATaXeKCJQAlOLFiXrJhjVb3IGpCDGJRCd8spewRo4AS9n1CttZ7ynGZCrT7iiXnIL5RdA0yLUAS3iIRqvCr9KfBu1M_Y7Zoqs8rFfQvi_YM5kXvPSDo08_ViBisfA9gWBANepF1_NxAQlYqVRW2QPkuwnJbCr6Z0vJodFozR9efrf7NQGtBnABO9YriVnZaGRoxWoV_Y6PaKJfbWXsvEApsBOP36DWF7e7HJ80Q1czX6CGYe6utpY`,
    });
  }

  datoPaciente(): Observable<Paciente> {
    const URL = ` http://192.168.10.139:8001/api`;
    return this.http.get<Paciente>(`${URL}/citas/557946`, {
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
      dx1: cie[0].codigo,
      desx1: cie[0].descripcion.toUpperCase(),
      tdx1: cie[0].tdiag,
      dx2: cie[1].codigo,
      desx2: cie[1].descripcion.toUpperCase(),
      tdx2: cie[1].tdiag,
      dx3: cie[2].codigo,
      desx3: cie[2].descripcion.toUpperCase(),
      tdx3: cie[2].tdiag,
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
