import { Injectable } from '@angular/core';
//
import { Session } from '../models/session.models';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private localStorageService: any;
  constructor() {
    this.localStorageService = localStorage;
  }

  setSession(data: Session): void {
    this.localStorageService.setItem('usuario', JSON.stringify(data));
  }

  getSessionData(): Session {
    let session = JSON.parse(this.localStorageService.getItem('usuario'));
    return session ? session : null;
  }

  removeSession() {
    this.localStorageService.removeItem('usuario');
  }
}
