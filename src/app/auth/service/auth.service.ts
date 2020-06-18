import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//
import { Auth } from '../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  Login(data: Auth): Observable<any> {
    const URL = ` http://192.168.10.139:8001/api`;
    return this.http.post(`${URL}/login`, data);
  }
}
