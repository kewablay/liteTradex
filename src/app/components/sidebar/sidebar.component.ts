import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { UserService } from '../../services/user-service/user.service';
import { AuthService } from '../../services/auth-service/auth-service.service';
import { Notyf } from 'notyf';
import { NOTYF } from '../../utils/notyf.token';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, AvatarModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.sass',
})
export class SidebarComponent {
  @Output() onTabChange = new EventEmitter<Event>();
  isAdmin!: boolean;

  handleTabChange(): void {
    this.onTabChange.emit();
  }

  userTabs = [
    {
      name: 'Dashboard',
      icon: 'assets/icons/dashboard.svg',
      route: 'home',
    },
    {
      name: 'Add funds',
      icon: 'assets/icons/add-funds.svg',
      route: 'add-funds',
    },
    {
      name: 'Wallet Exchange',
      icon: 'assets/icons/wallet-exchange.svg',
      route: 'wallet-exchange',
    },
    {
      name: 'Withdraw',
      icon: 'assets/icons/withdraw.svg',
      route: 'withdraw',
    },
  ];

  adminTabs = [
    {
      name: 'User Management',
      icon: 'assets/icons/user-management.svg',
      route: 'admin/user-management',
    },
    {
      name: 'Manage Withdrawal',
      icon: 'assets/icons/withdraw.svg',
      route: 'admin/manage-withdrawal',
    },
  ];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    @Inject(NOTYF) private notyf: Notyf
  ) {}

  ngOnInit() {
    this.userService.getUserRole().subscribe((role) => {
      this.isAdmin = role === 'ADMIN';
    });
  }

  handleLogout() {
    this.authService.logout();
    this.notyf.success('Logged out.');
  }
}
