import { Routes } from '@angular/router';

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
    path: '',
    loadComponent: () =>
      import('./layouts/dashboard-layout/dashboard-layout.component').then(
        (m) => m.DashboardLayoutComponent
      ),
    children: [
      // USER pages
      {
        path: '',
        loadComponent: () =>
          import('./pages/user/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'add-funds',
        loadComponent: () =>
          import('./pages/user/add-funds/add-funds.component').then(
            (m) => m.AddFundsComponent
          ),
      },
      {
        path: 'withdraw',
        loadComponent: () =>
          import('./pages/user/withdraw/withdraw.component').then(
            (m) => m.WithdrawComponent
          ),
      },
      {
        path: 'wallet-exchange',
        loadComponent: () =>
          import('./pages/user/wallet-exchange/wallet-exchange.component').then(
            (m) => m.WalletExchangeComponent
          ),
      },

      // ADMIN pages
      {
        path: 'admin',
        children: [
          {
            path: 'user-management',
            loadComponent: () =>
              import(
                './pages/admin/user-management/user-management.component'
              ).then((m) => m.UserManagementComponent),
          },
          {
            path: 'user-detail',
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
];
