import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//
import { AuthService } from './service/auth.service';
import { StorageService } from '../core/services/storage.service';
///
import { Session } from '../core/models/session.models';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  formLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      name: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  SubmitLogin() {
    this.authService
      .Login(this.formLogin.value)
      .subscribe((data) => this.correctLogin(data));
  }

  private correctLogin(data: Session) {
    this.storageService.setSession(data);
  }
}
