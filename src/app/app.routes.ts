import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard/auth.guard';
import { roleGuard } from './guards/role-guard/role.guard';
import { adminGuard } from './guards/admin-guard/admin.guard';

export const routes: Routes = [
  // AUTH routes
  {
    path: 'auth',
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent
      ),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/auth/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./pages/auth/signup/signup.component').then(
            (m) => m.SignupComponent
          ),
      },
    ],
  },

  //   DASHBOARD routes
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layouts/dashboard-layout/dashboard-layout.component').then(
        (m) => m.DashboardLayoutComponent
      ),
    children: [
      // USER pages
      {
        path: 'home',
        canActivate: [roleGuard],
        loadComponent: () =>
          import('./pages/user/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'add-funds',
        canActivate: [roleGuard],
        loadComponent: () =>
          import('./pages/user/add-funds/add-funds.component').then(
            (m) => m.AddFundsComponent
          ),
      },
      {
        path: 'withdraw',
        canActivate: [roleGuard],
        loadComponent: () =>
          import('./pages/user/withdraw/withdraw.component').then(
            (m) => m.WithdrawComponent
          ),
      },
      {
        path: 'wallet-exchange',
        canActivate: [roleGuard],
        loadComponent: () =>
          import('./pages/user/wallet-exchange/wallet-exchange.component').then(
            (m) => m.WalletExchangeComponent
          ),
      },

      // ADMIN pages
      {
        path: 'admin',
        canActivate: [adminGuard],
        children: [
          {
            path: 'user-management',
            loadComponent: () =>
              import(
                './pages/admin/user-management/user-management.component'
              ).then((m) => m.UserManagementComponent),
          },
          {
            path: 'user-detail/:id',
            loadComponent: () =>
              import('./pages/admin/user-detail/user-detail.component').then(
                (m) => m.UserDetailComponent
              ),
          },
          {
            path: 'manage-withdrawal',
            loadComponent: () =>
              import(
                './pages/admin/manage-withdrawal/manage-withdrawal.component'
              ).then((m) => m.ManageWithdrawalComponent),
          },
        ],
      },
    ],
  },

  // DEFAULT routes
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
];
