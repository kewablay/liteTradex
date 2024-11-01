import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-service/auth-service.service';
import { CountryService } from '../../../services/country-service/country-service.service';
import { Notyf } from 'notyf';
import { NOTYF } from '../../../utils/notyf.token';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, ProgressSpinnerModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.sass',
})
export class SignupComponent {
  signUpForm: FormGroup;
  signUpLoading: boolean = false;

  countries: any[] = [];

  // Custom validator to check if passwords match
  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private countryService: CountryService,
    private router: Router,
    @Inject(NOTYF) private notyf: Notyf
  ) {
    this.signUpForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        country: ['', Validators.required],
        currency: [''],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  ngOnInit(): void {
    // Fetch countries from the CountryService
    this.countryService.getCountries().subscribe((countries) => {
      this.countries = countries;
    });
  }

  // set currency when the country is selected
  setCurrency() {
    const country = this.signUpForm.get('country')?.value;
    const currency = this.countries.find((c) => c.name === country)?.currency;
    this.signUpForm.get('currency')?.setValue(currency);
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.signUpLoading = true;

      const { email, username, password, country, currency } =
        this.signUpForm.value;

      this.authService
        .signUp(email, username, password, country, currency)
        .then(
          () => {
            this.signUpLoading = false;
            this.notyf.success('Account created successful.');
            this.router.navigate(['auth/login']);
          },
          (error: Error) => {
            this.signUpLoading = false;
            this.notyf.error(error.message);
            console.log('error from signup', error);
          }
        );
    } else {
      this.signUpForm.markAllAsTouched();
    }
  }
}
