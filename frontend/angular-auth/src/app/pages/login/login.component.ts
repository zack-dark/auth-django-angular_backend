import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {authInterceptor} from '../../interceptors/auth.interceptor';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useValue: authInterceptor,
      multi: true
    }
  ],

})
export class LoginComponent {
  form! : FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ){}


  ngOnInit(): void{
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  submit() {
    this.authService.login(this.form.getRawValue()).subscribe(
      (res: any) => {
        this.authService.accessToken = res.token;
        this.router.navigate(['/'])
      }
    );
  }
}
