import { Routes } from '@angular/router';
import { HomeComponent } from './layouts/pages/home/home.component';
import {
  DashboardComponent,
  PageNotFoundErrorComponent,
  UnexpectedErrorComponent,
} from '@layouts';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
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
  {
    path: 'user',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/user/profile/profile.component').then(
            m => m.ProfileComponent
          ),
      },
      {
        path: 'reservations',
        loadComponent: () =>
          import('./features/user/reservations/reservations.component').then(
            m => m.ReservationsComponent
          ),
      },
      {
        path: 'my-borrowings/currently-borrowed',
        loadComponent: () =>
          import(
            './features/user/currently-borrowed/currently-borrowed.component'
          ).then(m => m.CurrentlyBorrowedComponent),
      },
      {
        path: 'my-borrowings/borrowing-history',
        loadComponent: () =>
          import(
            './features/user/borrowing-history/borrowing-history.component'
          ).then(m => m.BorrowingHistoryComponent),
      },
      {
        path: 'my-borrowings/overdue-books',
        loadComponent: () =>
          import(
            './features/user/overdue-books-fines/overdue-books-fines.component'
          ).then(m => m.OverdueBooksFinesComponent),
      },
      {
        path: 'my-library/wishlist',
        loadComponent: () =>
          import('./features/user/wishlist/wishlist.component').then(
            m => m.WishlistComponent
          ),
      },
      {
        path: 'my-library/favorites',
        loadComponent: () =>
          import('./features/user/favorites/favorites.component').then(
            m => m.FavoritesComponent
          ),
      },
      {
        path: 'chat',
        loadComponent: () =>
          import('./features/user/chat/chat.component').then(
            m => m.ChatComponent
          ),
      },
      {
        path: 'settings/change-password',
        loadComponent: () =>
          import(
            './features/user/settings/change-password/change-password.component'
          ).then(m => m.ChangePasswordComponent),
      },
      {
        path: 'settings/notifications-preferences',
        loadComponent: () =>
          import(
            './features/user/settings/notifications-preferences/notifications-preferences.component'
          ).then(m => m.NotificationsPreferencesComponent),
      },
    ],
  },
  {
    path: 'books',
    loadComponent: () =>
      import('./layouts/pages/books/books.component').then(
        m => m.BooksComponent
      ),
  },
  {
    path: 'book-details',
    loadComponent: () =>
      import('./layouts/pages/book-details/book-details.component').then(
        m => m.BookDetailsComponent
      ),
  },
  {
    path: 'error/404',
    component: PageNotFoundErrorComponent,
  },
  {
    path: 'error/500',
    component: UnexpectedErrorComponent,
  },
  { path: '**', redirectTo: 'error/404' },
];
