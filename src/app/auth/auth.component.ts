import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//
import { AuthService } from './service/auth.service';
import { StorageService } from '../core/services/storage.service';
///
import { Auth } from './models/auth.models';
import { Session } from '../core/models';

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
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      name: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  SubmitLogin() {
    this.authService
      .Login(new Auth(this.formLogin.value))
      .subscribe((data) => this.correctLogin(data));
  }

  private correctLogin(data: Session) {
    this.storageService.setSession(data);
    this.router.navigate(['actomedico']);
  }
}
