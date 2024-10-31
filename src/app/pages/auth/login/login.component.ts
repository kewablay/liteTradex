import { Component, Inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../../services/auth-service/auth-service.service';
import { NOTYF } from '../../../utils/notyf.token';
import { Notyf } from 'notyf';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ProgressSpinnerModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
})
export class LoginComponent {
  loginLoading: boolean = false;
  loginForm: FormGroup;

  constructor(
    private authService: AuthServiceService,
    private fb: FormBuilder,
    private router: Router,
    @Inject(NOTYF) private notyf: Notyf,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() { 
    if (this.loginForm.valid) {
      this.loginLoading = true;
      const { email, password } = this.loginForm.value;
      this.authService
        .login(email, password)
        .then(() => {
          this.loginLoading = false;
          this.notyf.success('Login successful');
          this.router.navigate(['dashboard/home']);
        })
        .catch((error) => {
          this.loginLoading = false;
          this.notyf.error(error.message);
          console.log("login error: ", error.message);
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
