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
    const URL = `http://127.0.0.1:8000/api`;
    return this.http.post(`${URL}/login`, data);
  }
}