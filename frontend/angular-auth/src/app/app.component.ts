import { Component } from '@angular/core';
import { RouterOutlet} from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { HTTP_INTERCEPTORS ,HttpClientModule, HttpClient} from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, HttpClientModule],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-auth';
}
