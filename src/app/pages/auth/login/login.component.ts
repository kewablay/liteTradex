import { Component, Inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-service/auth-service.service';
import { NOTYF } from '../../../utils/notyf.token';
import { Notyf } from 'notyf';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { UserService } from '../../../services/user-service/user.service';
import { CookieOptions, CookieService } from 'ngx-cookie-service';

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
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private cookieService: CookieService,
    @Inject(NOTYF) private notyf: Notyf
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
        .then((res) => {
          // Store user's auth token in cookies
          res.user?.getIdToken().then((token) => {
            console.log('token from login: ', token);
            if (token) {
              this.cookieService.set('AUTH_TOKEN', token, {
                path: '/',
                secure: true,
                httpOnly: true,
              } as CookieOptions);
            }
          });

          // Store user's role in cookie
          this.userService.getUserById(res.user.uid).then((user) => {
            if (user) {
              console.log('user from user service: ', user);
              this.cookieService.set('USER_ROLE', user['role'], {
                path: '/',
                secure: true,
                httpOnly: true,
              } as CookieOptions);
            }
            // Update user role in user service
            this.userService.setUserRole(user['role']);

            // Show Login successful
            this.loginLoading = false;
            this.notyf.success('Login successful');

            // Navigate to dashboard based on the users role
            if (user['role'] === 'ADMIN') {
              this.router.navigate(['dashboard/admin/user-management']);
            } else {
              this.router.navigate(['dashboard/home']);
            }
          });
        })
        .catch((error: Error) => {
          this.loginLoading = false;
          this.notyf.error(error.message);
          console.log('login error: ', error.message);
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
