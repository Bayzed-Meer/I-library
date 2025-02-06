import { Routes } from '@angular/router';
import { HomeComponent } from './layouts/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then(
        m => m.RegisterComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        m => m.LoginComponent
      ),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./features/auth/forgot-password/forgot-password.component').then(
        m => m.ForgotPasswordComponent
      ),
  },
  {
    path: 'otp-verification',
    loadComponent: () =>
      import(
        './features/auth/otp-verification/otp-verification.component'
      ).then(m => m.OtpVerificationComponent),
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./features/auth/reset-password/reset-password.component').then(
        m => m.ResetPasswordComponent
      ),
  },
  {
    path: 'account-activation',
    loadComponent: () =>
      import(
        './features/auth/account-activation/account-activation.component'
      ).then(m => m.AccountActivationComponent),
  },
];
