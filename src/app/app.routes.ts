import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing/landing.page').then((m) => m.LandingPage),
    children: [
      {
        path: 'daily-pulse',
        loadComponent: () =>
          import('./pages/landing/daily-pulse/daily-pulse.page').then(
            (m) => m.DailyPulsePage
          ),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.page').then( m => m.SignupPage)
  },
];
