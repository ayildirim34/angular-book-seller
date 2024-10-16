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
  selector: 'app-register',
  standalone: true,
  imports: [HttpClientModule, FontAwesomeModule, FormsModule, RouterModule, CommonModule],
  providers: [AuthenticationService], 
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  faUser = faUserCircle;
  errorMessage: string = "";

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    if (this.authenticationService.currentUserValue?.id) {
      this.router.navigate(['/profile']);
      return;
    }
  }

  register() {
    this.authenticationService.register(this.user).subscribe({
      next: (data) => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        if (err?.status === 409) {
          this.errorMessage = 'Username already exists.';
        } else {
          this.errorMessage = 'Unexpected error occurred. Error is: ' + err?.errorMessage;
          console.log(err);
        }
      },
      complete: () => {
      }
    });
  }

}