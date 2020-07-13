import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//
import { environment } from '../../../environments/environment';
import { Auth } from '../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  Login(data: Auth): Observable<any> {
    const URL = `${environment.apiURL}/login`;
    return this.http.post(URL, data);
  }
}
