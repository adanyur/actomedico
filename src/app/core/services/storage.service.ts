import { Injectable } from '@angular/core';
//
import { Session } from '../models';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private localStorageService: any;
  constructor() {
    this.localStorageService = localStorage;
  }

  setSession(data: Session): void {
    this.localStorageService.setItem('session', JSON.stringify(data));
  }

  getSessionData(): Session {
    let session = JSON.parse(this.localStorageService.getItem('session'));
    return session ? session : null;
  }

  removeSession() {
    this.localStorageService.removeItem('usuario');
  }
}
