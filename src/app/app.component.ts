import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PrimeNGConfig } from 'primeng/api';
import { UserService } from './services/user-service/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  title = 'liteTradex';

  constructor(
    private primengConfig: PrimeNGConfig,
    private cookieService: CookieService,
    private userService: UserService, 
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.userService.setUserRole(this.cookieService.get('USER_ROLE'));
  }
}
