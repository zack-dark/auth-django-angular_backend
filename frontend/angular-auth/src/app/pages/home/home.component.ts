import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  message = '';

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  this.authService.user().subscribe({
    next: (res: any) => {
      this.message = `Hi ${res.first_name} ${res.last_name}`;
    },
    error: err => {
      console.log(err);
    }
  });
  }


}
