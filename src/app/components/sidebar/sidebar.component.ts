import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, AvatarModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.sass',
})
export class SidebarComponent {
  isAdmin = false;

  userTabs = [
    {
      name: 'Dashboard',
      icon: 'assets/icons/dashboard.svg',
      route: '',
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
      route: 'user-management',
    },
    {
      name: 'Manage Withdrawal',
      icon: 'assets/icons/withdraw.svg',
      route: 'manage-withdrawal',
    },
  ];
}
