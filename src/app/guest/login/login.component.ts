import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, FontAwesomeModule, FormsModule, RouterModule, CommonModule],
  providers: [AuthenticationService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  user : User = new User();
  faUser = faUserCircle;
  errorMesage : string = "";

  constructor (private authenticationService: AuthenticationService, private router:Router) {
  }

  ngOnInit(): void {
  if(this.authenticationService.currentUserValue?.id) {
    this.router.navigate(['/profile']);
    return;
  }
  }

  login() {
    this.authenticationService.login(this.user).subscribe({
    next: (data) => {
      this.router.navigate(['/profile']);
    },
    error : (err) => {
     this.errorMesage = 'Unexpected error occured. Error ist : '+ err?.errorMessage
      },
    complete : () => {

    }

    })
  }



}
